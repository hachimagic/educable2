import React, { useState } from "react";
import SubSubject from "./SubSubject";

interface MainSubjectProps {
    name: string;
    subsubjects: string[];
}

const MainSubject: React.FC<MainSubjectProps> = ({ name, subsubjects }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openSubSubject = () => {
        setIsOpen(!isOpen);
    }

    const safeSubsubjects = subsubjects || [];

    return (
        <div>
            <div className="flex justify-between self-start w-full text-2xl cursor-pointer p-3 bg-gray-200 rounded-md hover:bg-gray-300 mt-2" onClick={openSubSubject}>
                {name}
                {isOpen ? (
                    <img src="https://path.to/arrow-up-icon.png" alt="open" className="w-4" />
                ) : (
                    <img src="https://path.to/arrow-down-icon.png" alt="close" className="w-4" />
                )}
            </div>
            {isOpen && (
                <div className="ml-4">
                    {safeSubsubjects.map((subsubject, index) => (
                        <SubSubject key={index} name={subsubject} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MainSubject;