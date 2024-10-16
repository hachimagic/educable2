import { Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const OPENAI_API_KEY = process.env['OPENAI_API_KEY']; // Ensure this is securely stored in environment variables

interface QuestionData {
	number: string;
	ai: boolean;
	type: string;
	question: string;
	choices: Record<string, string>;
	answer: string;
	solution: string;
}

async function appendQuestionToJSON(newQuestion: QuestionData, pathToFile: string) {
	try {
		const data = await fs.readFile(pathToFile, 'utf8');
		const jsonData = JSON.parse(data);
		jsonData.Choices.push(newQuestion);
		await fs.writeFile(pathToFile, JSON.stringify(jsonData, null, 2));
		console.log('New question appended successfully');
	} catch (err) {
		console.error('Error handling JSON file:', err);
		throw new Error('Failed to append question to JSON file');
	}
}

async function fetchQuestionFromOpenAI(topic: string) {
	const formatExample = `
		Format example:
		Question: What is 2 + 2?
		1) 3
		2) 4
		3) 5
		4) 6
		Answer: 2
		Explanation: 2 + 2 equals 4 because it is the sum of the two numbers.
	`;

	const questionResponse = await axios.post(
		'https://api.openai.com/v1/chat/completions',
		{
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: "system", content: "You are a highly knowledgeable math professor." },
				{ 
					role: "user", 
					content: `Create a clear and accurate quiz question on ${topic}. 
						Make sure the options are relevant and do not contain any random or nonsensical answers. 
						The output should include:
						1. The question
						2. Four plausible options labeled 1 to 4
						3. A line starting with "Answer:" indicating the correct option
						4. A line starting with "Explanation:" detailing why the answer is correct.
						${formatExample}`
				}
			],
			max_tokens: 250,
			temperature: 0.6
		},
		{
			headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
		}
	);

	const lines = questionResponse.data.choices[0].message.content.trim().split('\n').map(line => line.trim()).filter(Boolean);
	if (lines.length < 6) throw new Error('Unexpected response format');

	const parsedQuestion = lines[0];
	const choices: Record<string, string> = {};
	for (let i = 1; i <= 4; i++) {
		const choiceLine = lines[i];
		choices[i.toString()] = choiceLine?.split(')')[1]?.trim() || `Option ${i}`;
	}

	let correctOptionKey = lines.find(line => line.startsWith("Answer:"))?.split(':')[1]?.trim() || "1";
	if (!["1", "2", "3", "4"].includes(correctOptionKey)) correctOptionKey = "1";
	const solution = lines.find(line => line.startsWith("Explanation:"))?.split(':')[1]?.trim() || "No explanation provided.";

	return { parsedQuestion, choices, correctOptionKey, solution };
}

export default async function generateSimilarQuestion(req: Request, res: Response) {
	try {
		const { topic, subject, subsubject, id } = req.body;
		const { parsedQuestion, choices, correctOptionKey, solution } = await fetchQuestionFromOpenAI(topic);

		const questionData: QuestionData = {
			number: Date.now().toString(),
			ai: true,
			type: 'choice',
			question: parsedQuestion,
			choices,
			answer: correctOptionKey,
			solution
		};

		const dbPath = path.resolve(__dirname, `../../../db/Subjects/${subject}/Syllabus/${subsubject}/quiz/${id}.json`);
		await appendQuestionToJSON(questionData, dbPath);
		res.json(questionData);
	} catch (error) {
		console.error('Error generating question:', error instanceof Error ? error.message : error);
		res.status(500).send('Error processing question generation');
	}
}
