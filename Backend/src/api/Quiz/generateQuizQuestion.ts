import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env['OPENAI_API_KEY']; // Ensure this is securely stored in environment variables

function appendQuestionToJSON(newQuestion: any, pathToFile: string) {
	fs.readFile(pathToFile, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading JSON file:', err);
			return;
		}
		try {
			const jsonData = JSON.parse(data);
			jsonData.Choices.push(newQuestion);
			fs.writeFile(pathToFile, JSON.stringify(jsonData, null, 2), (err) => {
				if (err) {
					console.error('Error writing new question to JSON file:', err);
				} else {
					console.log('New question appended successfully');
				}
			});
		} catch (parseError) {
			console.error('Error parsing JSON file:', parseError);
		}
	});
}

export default async function generateSimilarQuestion(req: Request, res: Response) {
	try {
		const { topic, subject, subsubject, id, log } = req.body;

		const openaiResponse = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: "system", content: "You are a quiz AI. Provide a clear question, four choices, each prefixed by numbers 1 through 4, and specify the correct answer using 'Answer: X' format." },
					{ role: "user", content: `Create a quiz question on ${topic}. Include a question, four options labeled 1 to 4, and specify correct option as 'Answer: X'.` }
				],
				max_tokens: 150,
				temperature: 0.6
			},
			{
				headers: {
					'Authorization': `Bearer ${OPENAI_API_KEY}`,
				},
			}
		);

		const responseText = openaiResponse.data.choices[0].message.content.trim();
		console.log('Full OpenAI Response Text:', responseText);

		const lines = responseText.split('\n').map((line: string) => line.trim()).filter((line: string) => line);
		console.log('Parsed Lines:', lines);

		if (lines.length < 5) {
			throw new Error('Unexpected response format');
		}

		const parsedQuestion = lines[0];

		const choices = {
			"1": lines.length > 1 ? lines[1].split(')')[1].trim() : "Option 1",
			"2": lines.length > 2 ? lines[2].split(')')[1].trim() : "Option 2",
			"3": lines.length > 3 ? lines[3].split(')')[1].trim() : "Option 3",
			"4": lines.length > 4 ? lines[4].split(')')[1].trim() : "Option 4"
		};

		const correctOptionLine = lines.find((line: string) => line.startsWith("Answer:"));
		console.log('Correct Option Line:', correctOptionLine);

		let correctOptionKey = "1";  // Default to "1" only if extraction fails
		if (correctOptionLine) {
			const parts = correctOptionLine.split(':');
			if (parts.length > 1) {
				const key = parts[1].trim();
				if (["1", "2", "3", "4"].includes(key)) {
					correctOptionKey = key;
				}
			}
		}

		const questionData = {
			number: (new Date()).getTime().toString(),
			ai: true,
			type: 'choice',
			question: parsedQuestion,
			choices,
			answer: correctOptionKey,  // Ensure this reflects the parsed number
			solution: "The correct answer is based on differentiation rules."
		};

		const dbPath = path.resolve(__dirname, `../../../db/Subjects/${subject}/Syllabus/${subsubject}/quiz/${id}.json`);

		appendQuestionToJSON(questionData, dbPath);

		res.json(questionData);

	} catch (error) {
		if (error instanceof Error) {
			console.error('Error generating question:', error.message);
		} else {
			console.error('Unexpected error:', error);
		}
		res.status(500).send('Error processing question generation');
	}
}