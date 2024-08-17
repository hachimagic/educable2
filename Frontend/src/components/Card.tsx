import { ReactNode } from "react";

type Props = {
    children: ReactNode
  }

function Card({children}:Props) {
    return (
        <div>
            <div className="bg-white rounded-3xl shadow-black w-full h-[75vh] flex flex-col justify-between">
                <div className="self-center text-[#8A8A8A] pt-4">{children}</div>
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
