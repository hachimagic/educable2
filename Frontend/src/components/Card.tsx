import { useState } from "react";

type Props = {
    question: string,
    choice: string[],
    choiceindex: string[],
    callback: Function,
    onToggleExplanation: () => void,  // Function to trigger the modal
}

function Card({ question, choice, choiceindex, callback, onToggleExplanation }: Props) {
    const [answer, setAnswer] = useState("");

    const handleChange = (e: any) => {
        const { value } = e.target;
        setAnswer(value);
    };

    return (
        <div>
            <div className="bg-white rounded-3xl shadow-black w-full h-[75vh] flex flex-col justify-between">
                <div className="flex flex-col">
                    <div className="self-start text-lg text-[#8A8A8A] pt-6 pl-10">{question}</div>
                    <div className="flex flex-col my-2 mx-10 text-[#8A8A8A]">
                        {choice.map((currentChoice, index) => (
                            <div className="flex items-center my-6" key={index}>
                                <input 
                                    id={`radio-${index}`} 
                                    type="radio" 
                                    value={choiceindex[index]} 
                                    name="radio" 
                                    className="w-4 h-4 bg-gray-100 border-gray-300" 
                                    onChange={handleChange}
                                />
                                <label htmlFor={`radio-${index}`} className="ms-2 text-sm font-medium ">
                                    {currentChoice}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-3 pb-0">
                    <hr className="mx-2 border-[#B9B9B9]" />
                    <div className="flex justify-between items-center">
                        <div className="flex p-2 gap-2">
                            <p>Stuck?</p>
                            <a 
                                href="#" 
                                className="text-[#1A9CFF] hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();  // Prevent default link behavior
                                    onToggleExplanation();  // Trigger the explanation modal
                                }}
                            >
                                View explanation
                            </a>
                        </div>
                        <div className="flex p-2 gap-6 drop-shadow-md text-xl text-white">
                            <button className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] rounded-xl hover:bg-[#1A9CFF] hover:bg-none">
                                <p className="px-3 py-1 m-auto">Parallelize</p>
                            </button>
                            <button className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] rounded-xl hover:bg-[#1A9CFF] hover:bg-none"
                                onClick={() => callback(answer)}>
                                <p className="px-3 m-auto">Submit</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
