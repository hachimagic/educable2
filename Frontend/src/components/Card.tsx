import React, { useState } from "react";

type Props = {
  question: string;
  choices: string[];
  choiceIndices: string[];
  callback: (selected: string) => void;
  onToggleExplanation: () => void;
  onNextQuestion: () => void;
  onParallelize: () => void; // Ensure this prop is included
};

function Card({
  question,
  choices,
  choiceIndices,
  callback,
  onToggleExplanation,
  onNextQuestion,
  onParallelize, // Destructure this prop from Props
}: Props) {
  const [answer, setAnswer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl w-full h-[75vh] flex flex-col justify-between p-6">
      <div>
        <div className="text-lg text-[#8A8A8A]">{question}</div>
        <div className="mt-4">
          {choices.map((currentChoice, index) => (
            <div className="flex items-center my-3" key={index}>
              <input
                id={`radio-${index}`}
                type="radio"
                value={choiceIndices[index]}
                name="radio"
                className="w-4 h-4 bg-gray-100 border-gray-300"
                onChange={handleChange}
              />
              <label htmlFor={`radio-${index}`} className="ml-2 text-sm font-medium">
                {currentChoice}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <hr className="border-[#B9B9B9]" />
        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center">
            <p className="text-sm">Stuck?</p>
            <a
              href="#"
              className="text-[#1A9CFF] hover:underline ml-1"
              onClick={(e) => {
                e.preventDefault();
                onToggleExplanation();
              }}
            >
              View explanation
            </a>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
              onClick={onParallelize} // Ensuring this button calls the correct prop
            >
              Parallelize
            </button>
            <button
              className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
              onClick={() => callback(answer)}
            >
              Submit
            </button>
            <button
              className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
              onClick={onNextQuestion}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;