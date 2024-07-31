import Card from "../../components/Card"

function Quiz() {
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
            Question Topic
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
        <h2 className="text-2xl text-[#8A8A8A]">descriptions</h2>
      </div>
      <div className="mt-3">
        <Card />
      </div>
    </div>
  )
}

export default Quiz