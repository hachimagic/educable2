import { Request, Response } from 'express';

const getExerciseDetail = (req: Request, res: Response) => {
	const { subject, subsubject, id } = req.params;

	// Dummy data to simulate getting exercise detail
	const exerciseDetail = {
		Shuffle: true,
		name: id,
		description: "demos",
		weight: 0.5,
		Choices: [
			{
				ai: false,
				type: "choice",
				question: "Find x in 2x+3=11",
				choices: {
					"1": "4",
					"2": "2",
					"3": "7",
					"4": "-1"
				},
				answer: "1",
				solution: " hello this is a placeholder, if you are seeing this, its wip or i forgot"
			}
		]
	};

	res.json(exerciseDetail);
};

export default getExerciseDetail;