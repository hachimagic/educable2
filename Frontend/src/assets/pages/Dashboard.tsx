import React from 'react';
import CourseSearch from './CourseSearch';
import CourseCategory from './CourseCategory';
import CourseCard from '../../components/CourseCard';
import SubjectList from '../../components/SubjectList';

function Dashboard() {
    const subjects = [
        { name: 'Science', subsubjects: ['Physics', 'Biology', 'Chemistry'] },
        { name: 'Mathematics', subsubjects: ['Physics', 'Biology', 'Chemistry'] },
        { name: 'English', subsubjects: ['Physics', 'Biology', 'Chemistry'] },
    ];

    const courses = [
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
        { name: 'Selected Course Name', details: 'Selected Course Details', subject: 'Subject Name', contributor: ['Contributor\'s Name'] },
    ];

    return (
        <main className="flex flex-col items-center px-20 pt-10 bg-white max-md:px-5 overflow-y-scroll md:overflow-y-hidden">
            <div className="flex flex-col items-start w-full max-w-[1080px] max-md:max-w-full">
                <header className="flex flex-wrap gap-9 items-start self-end text-black">
                    <h1 className="text-7xl basis-auto max-md:text-4xl">Our Courses</h1>
                    {/* <CourseSearch placeholder="Search for courses" /> */}
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8dae3912f659e22fdf3a4307c73950c220e2bdacedee6d915fbd7a8e5c1518af?placeholderIfAbsent=true&apiKey=f4eef143a7524c86898006b4e244fca7" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[46px]" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e15a694625084c0099b7fdab9931fcd844bb8ec495c1e6bb8016c9ce8587050d?placeholderIfAbsent=true&apiKey=f4eef143a7524c86898006b4e244fca7" alt="" className="object-contain shrink-0 mt-3 aspect-[0.7] w-[46px]" />
                </header>
                <nav className="flex gap-10 items-center mt-10 w-full text-4xl text-black whitespace-nowrap max-w-[992px] max-md:max-w-full">
                    {/* <CourseCategory name="Curriculum" isActive={true} />
                    <CourseCategory name="Elementary" isActive={false} />
                    <CourseCategory name="Secondary" isActive={false} /> */}
                </nav>
                <section className="flex gap-5 max-md:flex-col max-md:max-w-full">
                    <aside className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <SubjectList subjects={subjects} />
                    </aside>
                    <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
                            <div className='h-3/4 overflow-y-hidden'>
                                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-h-[67%] overflow-y-auto md:overflow-y-scroll" >
                                    {courses.map((course, index) => (
                                        <CourseCard key={index} {...course} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;
