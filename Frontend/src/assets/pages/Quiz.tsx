import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from "../../components/Card"

function Quiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choice, setChoice] = useState([""]);
  const [choiceindex, setChoiceindex] = useState([""]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");  // State for holding the explanation content
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    async function RequestData() {
      try {
        let subject = searchParams.get("subject") ?? "math";
        let syllabus = searchParams.get("syllabus") ?? "algebra";
        let id = searchParams.get("id") ?? "exercise_1";
        setSearchParams({ subject: subject, syllabus: syllabus, id: id });
        
        let fetchedQuiz = await (await fetch(`/api/getQuizContent?subject=${subject}&syllabus=${syllabus}&id=${id}`)).json();
        
        let quizName = fetchedQuiz.name;
        let quizDescription = fetchedQuiz.description;
        let quizid = 2;
        let chosenQuiz = fetchedQuiz.quiz[quizid];
        let quizChoice = chosenQuiz.choices;
        let quizQuestion = chosenQuiz.question;
        let quizAnswer = chosenQuiz.answer;
        
        setTitle(quizName);
        setDescription(quizDescription);
        setChoice(Object.values(quizChoice));
        setChoiceindex(Object.keys(quizChoice));
        setQuestion(quizQuestion);
        setAnswer(quizAnswer);
        setExplanation("");  // Initially, no explanation is set
      } catch {
        return;
      }
    }
    RequestData();
  }, []);

  const onSubmit = (submittedAnswer) => {
    if (submittedAnswer === answer) {
      setExplanation(`Correct! The correct answer is: ${answer}. Here's why: Lorem ipsum dolor sit amet...`);
    } else {
      setExplanation(`Wrong! The correct answer is: ${answer}. Here's why: Lorem ipsum dolor sit amet...`);
    }
    toggleModal();
  };

  // Toggle Modal Visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleViewExplanation = () => {
    setExplanation("Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a generic explanation.");
    toggleModal();
  };

  return (
    <div className="flex flex-col mx-20 my-4 font-default">
      <div>
        <br></br>
        <br></br>
        <hr className="border-[#B9B9B9]"></hr>
      </div>
      <div className="flex mt-4 justify-between items-end">
        <div>
          <h1 className="text-[#0279D4] font-bold text-6xl m-auto">
            {title}
          </h1>
        </div>
        <div className="flex gap-4 align-middle font-bold">
          <div className="w-10 h-10 bg-[#1A9CFF] text-white rounded-full text-center pt-2">
            1
          </div>
          <div className="w-10 h-10 bg-[#1A9CFF]/15 text-[#1A9CFF] rounded-full text-center pt-2">
            2
          </div>
        </div>
      </div>

      <div className="mt-3 pl-6">
        <h2 className="text-2xl text-[#8A8A8A]">{description}</h2>
      </div>
      <div className="mt-3">
        <Card 
          choice={choice} 
          choiceindex={choiceindex} 
          question={question} 
          callback={onSubmit} 
          onToggleExplanation={handleViewExplanation}  // Pass the explanation handler to Card
        />
      </div>

      {/* Modal Implementation */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
            <h3>Explanation</h3>
            <p>{explanation}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5); /* Darkened background */
        }
        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          max-width: 500px;
          width: 80%;
        }
        .close-button {
          color: #aaa;
          float: right;
          font-size: 24px;
          cursor: pointer;
        }
        .close-button:hover {
          color: black;
        }
      `}</style>
    </div>
  );
}

export default Quiz;
