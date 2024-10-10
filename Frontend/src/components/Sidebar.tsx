import React from "react";

type SidebarProps = {
	nonAIChoices: any[];
	parallelQuestions: string[];
	onScrollToQuestion: (index: number) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
	nonAIChoices,
	parallelQuestions,
	onScrollToQuestion,
}) => {
	return (
		<div
			className="w-1/4 pl-4 relative flex flex-col"
			style={{ position: "sticky", top: "100px", height: "100vh" }}
		>
			<div className="absolute left-0 top-0 h-full border-l border-gray-300"></div>
			<h2 className="text-lg font-bold mb-2">Exercise Numbers</h2>
			<div className="flex flex-col gap-2">
				{nonAIChoices.map((_, index) => (
					<button
						key={index}
						className="bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-left text-black hover:bg-gray-100 transition-all duration-200"
						onClick={() => onScrollToQuestion(index)}
					>
						Exercise {index + 1}
					</button>
				))}
			</div>

			<div className="mt-4">
				<h2 className="text-lg font-bold mb-2">Parallelized Questions</h2>
				<div className="flex flex-col gap-2">
					{parallelQuestions.map((question, index) => (
						<button
							key={index}
							className="bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-left text-black hover:bg-gray-100 transition-all duration-200"
							onClick={() => onScrollToQuestion(index)}
						>
							{question}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;