import { useState } from "react";
import SubSubject from "./SubSubject";
function MainSubject({ name, subsubjects }) {
    const [isOpen, setIsOpen] = useState(false);

    const openSubSubject = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <div className="flex justify-between self-start w-full text-2xl">
                {name}
                {isOpen ? <img onClick={openSubSubject} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7157262e80422297c863ebde096c782d3214911fd4df952bc4b02e1eb11e6aba?placeholderIfAbsent=true&apiKey=f4eef143a7524c86898006b4e244fca7" alt="" className="object-contain shrink-0 w-7 aspect-[0.78] inline-block ml-2" /> : <img onClick={openSubSubject} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7157262e80422297c863ebde096c782d3214911fd4df952bc4b02e1eb11e6aba?placeholderIfAbsent=true&apiKey=f4eef143a7524c86898006b4e244fca7" alt="" className="object-contain shrink-0 w-7 aspect-[0.78] inline-block ml-2 rotate-180" />}

            </div>
            {isOpen ? subsubjects.map((subsubject, index) => (
                <SubSubject key={index} name={subsubject} />
            )) : null}
        </div>
    )
}

export default MainSubject;