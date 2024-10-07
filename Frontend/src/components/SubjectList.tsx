import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// URLs for the icons in the public folder
const ArrowUpIcon = '/icons/arrow-up-icon.svg';
const ArrowDownIcon = '/icons/arrow-down-icon.svg';

interface Subject {
  name: string;
  subsubjects: string[];
}

interface SubjectListProps {
  subjects: Subject[];
  onSubjectChange: (selectedSubject: string, subsubject?: string) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, onSubjectChange }) => {
  const navigate = useNavigate();
  const [openSubjects, setOpenSubjects] = useState<{ [key: string]: boolean }>({});

  const handleSubjectClick = (subject: string) => {
    setOpenSubjects((prevState) => ({
      ...prevState,
      [subject]: !prevState[subject],
    }));
    onSubjectChange(subject);
  };

  const handleSubsubjectClick = (subject: string, subsubject: string) => {
    onSubjectChange(subject, subsubject);
    navigate(`/subject/${subject}/${subsubject}`);
  };

  return (
    <div className="subject-list">
      {subjects.map((subject) => (
        <div key={subject.name} className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer p-3 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handleSubjectClick(subject.name)}
          >
            <h2 className="text-xl font-semibold">{subject.name}</h2>
            <img
              src={openSubjects[subject.name] ? ArrowUpIcon : ArrowDownIcon}
              alt="Toggle"
              className="w-4 h-4"
            />
          </div>
          {openSubjects[subject.name] && (
            <ul className="ml-4 mt-2">
              {subject.subsubjects.map((subsubject) => (
                <li
                  key={subsubject}
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleSubsubjectClick(subject.name, subsubject)}
                >
                  {subsubject}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubjectList;