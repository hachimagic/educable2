import React from 'react';
import MainSubject from './MainSubject';
function SubjectList({ subjects }) {
    return (
        <div className="px-7 pt-5 h-1/2 mx-auto max-h-100 w-full text-black whitespace-nowrap bg-zinc-300 max-md:h-full max-md:px-5 max-md:pb-24 max-md:mt-10">
            <div className='max-w-full'>
                <div className="font-bold text-4xl p-0 text-center">Subjects</div>
                {subjects.map((subject, index) => (
                    <MainSubject key={index} name={subject.name} subsubjects={subject.subsubjects} />
                ))}
            </div>
        </div>
    );
}

export default SubjectList;

// const subjects = [
//     { name: 'Science' },
//     { name: 'Mathematics' },
//     { name: 'English' },
// ];