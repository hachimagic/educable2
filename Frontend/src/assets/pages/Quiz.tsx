import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from "../../components/Card"

function Quiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    
    
    async function RequestData() {
      let subject = searchParams.get("subject") ?? "math"
      let syllabus = searchParams.get("syllabus") ?? "algebra"
      let id = searchParams.get("id") ?? "exercise_2"
      let fetchedQuiz: any = await (await fetch(`/api/getQuizContent?subject=${subject}&syllabus=${syllabus}&id=${id}`)).json()

      let quizName:string = fetchedQuiz.name
      let quizDescription:string = fetchedQuiz.description

      setTitle(quizName)
      setDescription(quizDescription)
    }
    RequestData();
  }, []);
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")


  return (
    <div className="flex flex-col mx-20 my-4 font-default">
      <div>
        <br></br>
        <br></br>
        <hr className="border-[#B9B9B9]"></hr>
      </div>
      <div className="flex mt-4 justify-between items-end">
        <div>
          <h1 className=" text-[#0279D4] font-bold text-6xl m-auto">
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
        <Card />
      </div>
    </div>
  )
}

export default Quiz