function Card() {
    return (
        <div>
            <div className="bg-white rounded-3xl shadow-black w-full h-[75vh] flex flex-col justify-between">
                <div className="flex  flex-col">
                    <div className="self-start text-lg text-[#8A8A8A] pt-6 pl-10">Question / Problems</div>
                    <div className="flex flex-col my-2 mx-10 text-[#8A8A8A]">
                        <div className="flex items-center my-6">
                            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 bg-gray-100 border-gray-300">
                            </input>
                            <label
                                htmlFor="default-radio-1" className="ms-2 text-sm font-medium ">1</label>
                        </div>
                        <div className="flex items-center my-6">
                            <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4  bg-gray-100 border-gray-300">
                            </input>
                            <label
                                htmlFor="default-radio-2" className="ms-2 text-sm font-medium ">2</label>
                        </div>
                        <div className="flex items-center my-6">
                            <input id="default-radio-3" type="radio" value="" name="default-radio" className="w-4 h-4  bg-gray-100 border-gray-300">
                            </input>
                            <label
                                htmlFor="default-radio-3" className="ms-2 text-sm font-medium ">3</label>
                        </div>
                        <div className="flex items-center my-6">
                            <input id="default-radio-4" type="radio" value="" name="default-radio" className="w-4 h-4  bg-gray-100 border-gray-300">
                            </input>
                            <label
                                htmlFor="default-radio-4" className="ms-2 text-sm font-medium ">4</label>
                        </div>
                        <div className="flex items-center">
                        </div>
                    </div>
                </div>
                <div className="p-3 pb-0">
                    <hr className="mx-2 border-[#B9B9B9]" />
                    <div className="flex justify-between items-center">
                        <div className="flex p-2 gap-2">
                            <p>Stuck?</p>
                            <a href="#" className="text-[#1A9CFF] hover:underline">View explanation</a>
                        </div>
                        <div className="flex p-2 gap-6 drop-shadow-md text-xl text-white">
                            <button className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] rounded-xl hover:bg-[#1A9CFF] hover:bg-none">
                                <p className="px-3 py-1 m-auto">Parallelize</p>
                            </button>
                            <button className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] rounded-xl hover:bg-[#1A9CFF] hover:bg-none">
                                <p className="px-3 m-auto">Submit</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
