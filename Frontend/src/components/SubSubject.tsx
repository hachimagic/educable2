import React from 'react';

interface SubSubjectProps {
    name: string;
}

const SubSubject: React.FC<SubSubjectProps> = ({ name }) => {
    return (
        <div className="p-2 cursor-pointer text-blue-600 hover:underline">
            {name}
        </div>
    );
};

export default SubSubject;