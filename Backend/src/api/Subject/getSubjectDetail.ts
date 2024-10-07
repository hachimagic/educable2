import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const getSubjectDetail = async (req: Request, res: Response) => {
		const { subject, subsubject } = req.params;

		try {
				const baseDirPath = path.join(__dirname, '../../../db/Subjects');
				const subjectDirPath = path.join(baseDirPath, subject);
				const syllabusDirPath = path.join(subjectDirPath, 'Syllabus');
				const subsubjectDirPath = path.join(syllabusDirPath, subsubject);
				const quizDirPath = path.join(subsubjectDirPath, 'quiz');

				if (!fs.existsSync(quizDirPath)) {
						return res.status(404).json({ error: 'Quiz directory not found' });
				}

				const exercises = fs.readdirSync(quizDirPath).map(file => file.replace('.json', ''));
				console.log('Returning exercises list:', exercises);  // Debugging log
				res.status(200).json({ exercises });
		} catch (err) {
				console.error('Server Error:', err);
				res.status(500).send('Server Error');
		}
};

export default getSubjectDetail;