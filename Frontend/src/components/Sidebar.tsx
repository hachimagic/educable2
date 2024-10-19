import React from "react";

type SidebarProps = {
	normalQuestions: any[];
	parallelQuestions: any[];
	normalAnswerStatuses: string[];
	parallelAnswerStatuses: string[];
	onScrollToQuestion: (index: number, isParallel: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
	normalQuestions,
	parallelQuestions,
	normalAnswerStatuses,
	parallelAnswerStatuses,
	onScrollToQuestion,
}) => (
	<div className="w-1/4 pl-4 relative flex flex-col" style={{ position: "sticky", top: "100px", height: "100vh" }}>
		<div className="absolute left-0 top-0 h-full border-l border-gray-300"></div>
		<h2 className="text-lg font-bold mb-2">Exercise Numbers</h2>
		<div className="flex flex-col gap-2">
			{Array.isArray(normalQuestions) &&
				normalQuestions.map((_, index) => (
					<button
						key={`normal-${index}`}
						className={`border border-gray-300 rounded-lg shadow-md px-4 py-2 text-left transition-all duration-200
							${normalAnswerStatuses[index] === "correct" ? "bg-green-500 text-white" : ""}
							${normalAnswerStatuses[index] === "incorrect" ? "bg-red-500 text-white" : ""}
						`}
						onClick={() => onScrollToQuestion(index, false)}
					>
						Exercise {index + 1}
					</button>
				))}
		</div>

		<div className="mt-4">
			<h2 className="text-lg font-bold mb-2">Parallelized Questions</h2>
			<div className="flex flex-col gap-2">
				{Array.isArray(parallelQuestions) &&
					parallelQuestions.map((_, index) => (
						<button
							key={`parallel-${index}`}
							className={`bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-left text-black hover:bg-gray-100 transition-all duration-200
								${parallelAnswerStatuses[index] === "correct" ? "bg-green-500 text-white" : ""}
								${parallelAnswerStatuses[index] === "incorrect" ? "bg-red-500 text-white" : ""}
							`}
							onClick={() => onScrollToQuestion(index, true)}
						>
							Parallel Question {index + 1}
						</button>
					))}
			</div>
		</div>
	</div>
);

export default Sidebar;