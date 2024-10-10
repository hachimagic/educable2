import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from "../../components/Card";
import Header from "../../components/Header"; // Import the Header component

function Quiz() {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nonAIChoices, setNonAIChoices] = useState<any[]>([]);
  const [fetchedQuiz, setFetchedQuiz] = useState<any[]>([]);
  const [aiQuestions, setAIQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    try {
      const subject = searchParams.get('subject') ?? 'math';
      const subsubject = searchParams.get('subsubject') ?? 'algebra';
      const id = searchParams.get('id') ?? 'exercise_1';

      const response = await fetch(`/api/subjects/${subject}/${subsubject}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }

      const quizData = await response.json();
      const nonAIChoices = quizData.Choices.filter((choice: any) => !choice.ai);
      const aiChoices = quizData.Choices.filter((choice: any) => choice.ai);

      setNonAIChoices(nonAIChoices);
      setFetchedQuiz(nonAIChoices);
      setAIQuestions(aiChoices);
      setTitle(quizData.name);
      setDescription(quizData.description);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setError(error.message || 'An error occurred');
    }
  }

  const onSubmit = (submittedAnswer: string, correctAnswer: string, index: number) => {
    const explanation = submittedAnswer === correctAnswer
      ? `Correct! The correct answer is: ${correctAnswer}. Here's why: Lorem ipsum dolor sit amet...`
      : `Wrong! The correct answer is: ${correctAnswer}. Here's why: Lorem ipsum dolor sit amet...`;
    alert(`Question ${index + 1}: ${explanation}`);
  };

  return (
    <div className="flex flex-col mx-20 my-4 font-default">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10, backgroundColor: 'white' }}>
        <Header onRefresh={() => window.location.reload()} />
      </div>

      {/* Adding extra padding to avoid overlapping with the fixed header */}
      <div style={{ paddingTop: '100px' }}>
        <div className="flex mt-4 justify-between items-end">
          <div>
            <h1 className="text-[#0279D4] font-bold text-6xl">{title}</h1>
          </div>
        </div>

        <div className="mt-3 pl-6">
          <h2 className="text-2xl text-[#8A8A8A]">{description}</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[75vh]">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="mt-3 grid gap-4">
            {nonAIChoices.map((choice, index) => (
              <Card
                key={index}
                question={choice.question}
                choices={Object.values(choice.choices)}
                choiceIndices={Object.keys(choice.choices)}
                callback={(submittedAnswer) => onSubmit(submittedAnswer, choice.answer, index)}
                onToggleExplanation={() => {}}
                onParallelize={() => {}}
              />
            ))}
          </div>
        )}

        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default Quiz;