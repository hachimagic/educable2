import React from 'react';

interface CourseProps {
    name: string;
    details: string;
    subject: string;
    contributor: string[];
}

const CourseCard: React.FC<CourseProps> = ({ name, details, subject, contributor }) => (
    <div className="max-w-lg h-auto w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="w-lg h-44 overflow-hidden bg-center">
            <img className="rounded-t-lg max-w-full" src="https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="px-4 py-2">
            <h1 className="text-lg font-bold text-gray-800">{name}</h1>
            <h2 className="text-sm text-gray-600">{details}</h2>
        </div>
        <div className="flex justify-between items-center px-4 py-2">
            <h3 className="text-sm font-bold text-gray-700">{subject}</h3>
            <h3 className="text-sm font-bold text-gray-700 text-right">{contributor.join(', ')}</h3>
        </div>
    </div>
);

export default CourseCard;