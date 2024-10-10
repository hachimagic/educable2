// current Quiz.tsx
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Quiz() {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nonAIChoices, setNonAIChoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [parallelQuestions, setParallelQuestions] = useState<string[]>([]);
  const [answerStatuses, setAnswerStatuses] = useState<string[]>([]);
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Manage AI Questions
  const [aiQuestions, setAIQuestions] = useState<any[]>([]);
  const [aiQuestionIndex, setAIQuestionIndex] = useState(0);

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
      questionRefs.current = new Array(nonAIChoices.length).fill(null);

      // Initialize answerStatuses based on the number of questions
      setAnswerStatuses(new Array(nonAIChoices.length).fill("pending"));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  }

  const onSubmit = (
    submittedAnswer: string,
    correctAnswer: string,
    index: number
  ) => {
    const status = submittedAnswer === correctAnswer ? "correct" : "incorrect";
    setAnswerStatuses((prevStatuses) => {
      const newStatuses = [...prevStatuses];
      newStatuses[index] = status;
      return newStatuses;
    });
    const explanation =
      status === "correct"
        ? `Correct! The correct answer is: ${correctAnswer}.`
        : `Wrong! The correct answer is: ${correctAnswer}.`;
    alert(`Question ${index + 1}: ${explanation}`);
  };

  const onParallelize = async (index: number) => {
    try {
      const subject = searchParams.get("subject") ?? "math";
      const subsubject = searchParams.get("subsubject") ?? "algebra";
      const id = searchParams.get("id") ?? "exercise_1";
      const requestBody = { topic: 'calculus', subject, subsubject, id, log: true };

      const response = await fetch('/api/generate-similar-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to generate question');
      }

      const responseBody = await response.json();
      setAIQuestions([...aiQuestions, responseBody]);
      setParallelQuestions((prev) => [
        ...prev,
        `Parallel Question ${index + 1}`,
      ]);
    } catch (error) {
      console.error('Error generating similar question:', error);
      setError('Could not generate new AI question');
    }
  }

  const scrollToQuestion = (index: number) => {
    const headerOffset = 100;
    const elementPosition =
      questionRefs.current[index]?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
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
                  <div
                    key={index}
                    className="mb-4"
                    ref={(el) => (questionRefs.current[index] = el)}
                  >
                    <Card
                      question={choice.question}
                      choices={Object.values(choice.choices)}
                      choiceIndices={Object.keys(choice.choices)}
                      explanation={choice.explanation}
                      callback={(submittedAnswer) =>
                        onSubmit(submittedAnswer, choice.answer, index)
                      }
                      onParallelize={() => onParallelize(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            {error && <div className="text-red-500">{error}</div>}
          </div>

          <Sidebar
            nonAIChoices={nonAIChoices}
            parallelQuestions={parallelQuestions}
            answerStatuses={answerStatuses}
            onScrollToQuestion={scrollToQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default Quiz;