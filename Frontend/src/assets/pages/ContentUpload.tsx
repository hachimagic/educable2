import UploadCard from "../../components/UploadCard"

function ContentUpload() {
    return (
        <div className="flex flex-col mx-20 my-4 font-default text-lg">
            <div>
                <br></br>
                <br></br>
                <hr className="border-[#B9B9B9]"></hr>
            </div>
            <div className="flex mt-8 ">
                <h1 className=" text-[#0279D4] font-bold text-6xl">
                    Upload New Content
                </h1>
            </div>
            <div className="mt-8">
                <div className="flex gap-4">
                    <UploadCard></UploadCard>
                    <div className="h-[50vh] border border-[#B9B9B9]/25"></div>
                    <form action="#">
                        <div className="bg-white rounded-3xl shadow-black w-full h-[45vh] border-[#B9B9B9] border-2">
                            <textarea placeholder="description..." className=" placeholder:text-lg rounded-3xl p-5 w-[40vw] h-full outline-none resize-none bg-white"></textarea>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] rounded-2xl hover:bg-[#1A9CFF] hover:bg-none">
                                <p className="px-8 py-2 m-auto text-white text-xl font-normal">Done</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden">
            <div className="flex flex-col p-5 bg-white rounded-3xl w-[24%] h-[10vh] shadow-sm shadow-[#B9B9B9] mt-6">
                <div>
                    <div className="flex gap-4 text-2xl">
                        <h3>Uploading - </h3>
                        <h3>fileName.txt</h3>
                        <svg width="34" height="34" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M362.685 149.352L149.352 362.685M149.352 149.352L362.685 362.685" stroke="#464F69" strokeWidth="43.0201" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-[#8A8A8A] flex gap-2 text-sm pt-1">
                        <p>4GB</p>
                        <p className="pt-[2px]">-</p>
                        <p>2 mins left</p>
                    </div>
                </div>
            </div>
            </div>
            <br></br>
            <hr className="border-[#B9B9B9]"></hr>
        </div>
    )
}

export default ContentUpload