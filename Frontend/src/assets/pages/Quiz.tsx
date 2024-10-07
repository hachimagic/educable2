import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from "../../components/Card";

function Quiz() {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [choiceIndices, setChoiceIndices] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nonAIQuestionIndex, setNonAIQuestionIndex] = useState(0);
  const [aiQuestionIndex, setAIQuestionIndex] = useState(0);
  const [fetchedQuiz, setFetchedQuiz] = useState<any[]>([]);
  const [aiQuestions, setAIQuestions] = useState<any[]>([]);
  const [viewingAIQuestion, setViewingAIQuestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const viewedQuestions = new Set<number>();

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

      setFetchedQuiz(nonAIChoices);
      setAIQuestions(aiChoices);
      setTitle(quizData.name);
      setDescription(quizData.description);
      loadQuestion(nonAIChoices, 0);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setError(error.message || 'An error occurred');
    }
  }

  const loadQuestion = (choices: any[], index: number) => {
    if (choices.length > index && !viewedQuestions.has(index)) {
      const chosenQuiz = choices[index];
      setChoices(Object.values(chosenQuiz.choices || {}));
      setChoiceIndices(Object.keys(chosenQuiz.choices || {}));
      setQuestion(chosenQuiz.question);
      setAnswer(chosenQuiz.answer);
      setExplanation("");
      viewedQuestions.add(index);
    }
  };

  const onSubmit = (submittedAnswer: string) => {
    if (submittedAnswer === answer) {
      setExplanation(`Correct! The correct answer is: ${answer}. Here's why: Lorem ipsum dolor sit amet...`);
    } else {
      setExplanation(`Wrong! The correct answer is: ${answer}. Here's why: Lorem ipsum dolor sit amet...`);
    }
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onNextQuestion = () => {
    setViewingAIQuestion(false);
    for (let i = nonAIQuestionIndex + 1; i < fetchedQuiz.length; i++) {
      if (!viewedQuestions.has(i)) {
        setNonAIQuestionIndex(i);
        loadQuestion(fetchedQuiz, i);
        break;
      }
    }
  };

  const findAIQuestion = async () => {
    setViewingAIQuestion(true);
    // Check for any remaining AI questions
    let aiExhausted = true; // Assume all are exhausted until proven otherwise
    for (let i = aiQuestionIndex; i < aiQuestions.length; i++) {
      const aiIndex = fetchedQuiz.length + i;
      if (!viewedQuestions.has(aiIndex)) {
        aiExhausted = false; // Found an unviewed AI question
        setAIQuestionIndex(i + 1);
        loadQuestion(aiQuestions, i);
        return;
      }
    }

    if (aiExhausted) {
      console.log('No AI questions left, generating a new question.');
      try {
        setLoading(true); // Start loading
        const subject = searchParams.get('subject') ?? 'math';
        const subsubject = searchParams.get('subsubject') ?? 'algebra';
        const id = searchParams.get('id') ?? 'exercise_1';

        const requestBody = { topic: 'calculus', subject, subsubject, id, log: true };
        const response = await fetch('/api/generate-similar-question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const responseBody = await response.json();
        console.log('Generated new AI question', responseBody);

        if (!response.ok) {
          throw new Error('Failed to generate question');
        }

        setAIQuestions([...aiQuestions, responseBody]);
        setAIQuestionIndex(aiQuestions.length);
        loadQuestion([responseBody], 0);
      } catch (error) {
        console.error('Error generating similar question:', error);
        setError('Could not generate new AI question');
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  return (
    <div className="flex flex-col mx-20 my-4 font-default">
      <div>
        <hr className="border-[#B9B9B9]" />
      </div>
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
        <div className="mt-3">
          <Card
            question={question}
            choices={choices}
            choiceIndices={choiceIndices}
            callback={onSubmit}
            onToggleExplanation={toggleModal}
            onNextQuestion={onNextQuestion}
            onParallelize={findAIQuestion}
          />
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}

      {isModalOpen && (
        <div className="modal flex items-center justify-center fixed z-10 left-0 top-0 w-full h-full bg-black bg-opacity-50">
          <div className="modal-content bg-white rounded p-4 shadow-lg max-w-md w-full">
            <span className="close-button float-right text-xl cursor-pointer" onClick={toggleModal}>&times;</span>
            <h3 className="text-xl mb-2">Explanation</h3>
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;