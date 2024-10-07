import fs from 'fs';
import path from 'path';

const listDirectoryContents = (dirPath: string) => {
		if (fs.existsSync(dirPath)) {
				const files = fs.readdirSync(dirPath);
				console.log(`Contents of ${dirPath}:`);
				files.forEach(file => {
						console.log(file);
				});
		} else {
				console.error(`Directory not found: ${dirPath}`);
		}
};

export const verifyPaths = () => {
		try {
				const baseDirPath = path.join(__dirname, '../../db/Subjects');
				const subjectDirPath = path.join(baseDirPath, 'math');
				const syllabusDirPath = path.join(subjectDirPath, 'Syllabus');
				const subsubjectDirPath = path.join(syllabusDirPath, 'algebra');
				const quizDirPath = path.join(subsubjectDirPath, 'quiz');
				const exerciseFilePath = path.join(quizDirPath, 'exercise_1.json');

				listDirectoryContents(baseDirPath);
				listDirectoryContents(subjectDirPath);
				listDirectoryContents(syllabusDirPath);
				listDirectoryContents(subsubjectDirPath);
				listDirectoryContents(quizDirPath);
				console.log(`Verifying file: ${exerciseFilePath}`);
				if (fs.existsSync(exerciseFilePath)) {
						console.log(`File exists: ${exerciseFilePath}`);
				} else {
						console.error(`File not found: ${exerciseFilePath}`);
				}
		} catch (err) {
				console.error('Error verifying paths:', err);
		}
};