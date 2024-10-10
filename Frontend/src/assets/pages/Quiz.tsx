import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";

function Quiz() {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nonAIChoices, setNonAIChoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    try {
      const subject = searchParams.get("subject") ?? "math";
      const subsubject = searchParams.get("subsubject") ?? "algebra";
      const id = searchParams.get("id") ?? "exercise_1";

      const response = await fetch(
        `/api/subjects/${subject}/${subsubject}/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }

      const quizData = await response.json();
      const nonAIChoices = quizData.Choices.filter(
        (choice: any) => !choice.ai
      );

      setNonAIChoices(nonAIChoices);
      setTitle(quizData.name);
      setDescription(quizData.description);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError(error.message || "An error occurred");
    }
  }

  const onSubmit = (
    submittedAnswer: string,
    correctAnswer: string,
    index: number
  ) => {
    const explanation =
      submittedAnswer === correctAnswer
        ? `Correct! The correct answer is: ${correctAnswer}.`
        : `Wrong! The correct answer is: ${correctAnswer}.`;
    alert(`Question ${index + 1}: ${explanation}`);
  };

  return (
    <div className="flex flex-col mx-20 my-4 font-default">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <Header onRefresh={() => window.location.reload()} />
      </div>

      <div style={{ paddingTop: "100px" }}>
        <h1 className="text-[#0279D4] font-bold text-6xl">{title}</h1>
        <div className="mt-3 pl-6">
          <h2 className="text-2xl text-[#8A8A8A]">{description}</h2>
        </div>

        <div className="flex justify-between">
          <div className="w-3/4 pr-4">
            {loading ? (
              <div className="flex justify-center items-center h-[75vh]">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                {nonAIChoices.map((choice, index) => (
                  <div key={index} className="mb-4">
                    <Card
                      question={choice.question}
                      choices={Object.values(choice.choices)}
                      choiceIndices={Object.keys(choice.choices)}
                      explanation={choice.explanation} // Make sure to pass explanation here
                      callback={(submittedAnswer) =>
                        onSubmit(submittedAnswer, choice.answer, index)
                      }
                      onParallelize={() => {}}
                    />
                  </div>
                ))}
              </div>
            )}

            {error && <div className="text-red-500">{error}</div>}
          </div>

          <div
            className="w-1/4 pl-4 relative flex flex-col"
            style={{ position: "sticky", top: "100px", height: "100vh" }}
          >
            <div
              className="absolute left-0 top-0 h-full border-l border-gray-300"
            ></div>
            <h2 className="text-lg font-bold mb-2">Exercise Numbers</h2>
            <div className="flex flex-col gap-2">
              {nonAIChoices.map((_, index) => (
                <button
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-left text-black hover:bg-gray-100 transition-all duration-200"
                >
                  Exercise {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;