import React, { useState } from "react";

type Props = {
  question: string;
  choices: string[];
  choiceIndices: string[];
  explanation: string;
  callback: (selected: string) => void;
  onParallelize: () => void;
};

function Card({
  question,
  choices,
  choiceIndices,
  explanation,
  callback,
  onParallelize,
}: Props) {
  const [answer, setAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl w-full h-[75vh] flex flex-col justify-between p-4">
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
              <label
                htmlFor={`radio-${index}`}
                className="ml-2 text-sm font-medium"
              >
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
                setShowExplanation(!showExplanation);
              }}
            >
              View explanation
            </a>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
              onClick={onParallelize}
            >
              Parallelize
            </button>
            <button
              className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
              onClick={() => callback(answer)}
            >
              Submit
            </button>
          </div>
        </div>
        {showExplanation && (
          <div className="mt-4 p-2 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-medium">Explanation:</h3> {/* Larger font for title */}
            <p className="text-base text-gray-800">{explanation}</p> {/* Larger font for explanation */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;