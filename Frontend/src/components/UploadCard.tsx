function UploadCard() {
    return (
        <div>
            <div className="bg-white rounded-3xl shadow-black w-[50vw] h-[55vh] flex flex-col justify-center border-[#B9B9B9] border-2">
                <div className="flex flex-col self-center gap-2 text-4xl text-center text-[#8A8A8A]">
                    <svg width="82" height="82" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-center pb-4">
                        <path d="M255.996 170.662V341.329M170.663 255.995H341.33M469.33 255.995C469.33 373.816 373.817 469.329 255.996 469.329C138.176 469.329 42.6631 373.816 42.6631 255.995C42.6631 138.175 138.176 42.6621 255.996 42.6621C373.817 42.6621 469.33 138.175 469.33 255.995Z" stroke="#464F69" strokeWidth="40.3761" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3>Upload content</h3>
                    <h3 className="hover:underline hover:cursor-pointer text-xl text-[#0279D4]">Choose file</h3>
                </div>
            </div>
        </div>
    )
}

export default UploadCard