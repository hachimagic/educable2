import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubjectList from '../../components/SubjectList';
import CourseCard from '../../components/CourseCard';
import Header from '../../components/Header'; // Import the Header component

interface Course {
  name: string;
  details: string;
  subject: string;
  contributor: string[];
}

interface Subject {
  name: string;
  subsubjects: string[];
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  totalScore: number;
}

function Dashboard() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects');
        const data = await response.json();

        const parsedSubjects = data.map((subject: any) => ({
          name: subject.name,
          subsubjects: subject.courses.map((course: any) => course.name),
        }));

        setSubjects(parsedSubjects);
        const allCourses = parsedSubjects.flatMap((subject: any) =>
          subject.subsubjects.map((subsubject: any) => ({
            name: subsubject,
            details: `Details for ${subsubject}`,
            subject: subject.name,
            contributor: ['Contributor Name'],
          }))
        );
        setCourses(allCourses);
        setFilteredCourses(allCourses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectChange = (selectedSubject: string, subsubject?: string) => {
    if (subsubject) {
      const filtered = courses.filter(
        (course) => course.subject === selectedSubject && course.name === subsubject
      );
      setFilteredCourses(filtered);
    } else if (selectedSubject) {
      const filtered = courses.filter((course) => course.subject === selectedSubject);
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  };

  const fetchExercises = async (subject: string, subsubject: string) => {
    try {
      const response = await fetch(`/api/subjects/${subject}/${subsubject}`);
      if (!response.ok) throw new Error('Failed to fetch exercises list');
      const { exercises: exerciseNames } = await response.json();

      const exerciseData = exerciseNames.map((exercise: string) => ({
        id: exercise,
        name: exercise,
        description: "Exercise description",
        totalScore: 100
      }));

      setExercises(exerciseData);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setExercises([]);
    }
  };

  const handleCourseClick = async (course: Course) => {
    setSelectedCourse(course);
    await fetchExercises(course.subject, course.name);
  };

  const handleBackToCourseList = () => {
    setSelectedCourse(null);
    setExercises([]);
  };

  const handleExerciseClick = (exercise: Exercise) => {
    if (!exercise.id) {
      console.error("Exercise ID is missing", exercise);
      return;
    }

    if (!selectedCourse) {
      console.error("No course selected", selectedCourse);
      return;
    }

    const url = `/quiz?subject=${encodeURIComponent(selectedCourse.subject)}&subsubject=${encodeURIComponent(selectedCourse.name)}&id=${encodeURIComponent(exercise.id)}`;
    navigate(url);
  };

  // Function to refresh the page
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
        <main className="flex flex-col items-center px-20 py-10 bg-[#F7F7F7] h-screen overflow-hidden font-default">
          <Header onRefresh={handleRefresh} />
          <section className="flex-1 flex gap-10 mt-10 w-full max-w-[1080px] h-full overflow-hidden">
        <aside className="flex-shrink-0 w-[33%] overflow-y-auto max-h-full">
          <SubjectList subjects={subjects} onSubjectChange={handleSubjectChange} />
        </aside>

        <div className="flex-grow h-full overflow-y-auto bg-white rounded-md p-4 shadow-md">
          {!selectedCourse ? (
            <div className="flex flex-col gap-5">
              {loading ? (
                <p className="text-2xl text-center w-full">Loading...</p>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                  {filteredCourses.map((course) => (
                    <div
                      key={`${course.subject}-${course.name}`}
                      onClick={() => handleCourseClick(course)}
                      className="cursor-pointer"
                    >
                      <CourseCard {...course} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-2xl text-center w-full">No courses available for this subject</p>
              )}
            </div>
          ) : (
            <div className="p-4">
              <button onClick={handleBackToCourseList} className="text-blue-600 hover:underline mb-4">Back to Courses</button>
              <h2 className="text-3xl font-bold text-[#0279D4]">{selectedCourse.name}</h2>
              <h3 className="mt-4 font-semibold text-lg">Exercises:</h3>
              {exercises.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 mt-2">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="p-4 bg-gray-100 rounded shadow cursor-pointer"
                      onClick={() => handleExerciseClick(exercise)}
                    >
                      <h4 className="text-xl font-bold">{exercise.name}</h4>
                      <p className="text-gray-700">{exercise.description}</p>
                      <p className="text-gray-500 mt-1">Total Score: {exercise.totalScore}</p>
                      <p className="text-xs text-gray-400">ID: {exercise.id}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xl mt-2">No exercises available for this course</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;