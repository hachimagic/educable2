import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const getSubjects = async (req: Request, res: Response) => {
		const baseDirPath = path.join(__dirname, '../../../db/Subjects');
		console.log(`Base Directory Path: ${baseDirPath}`);
		listDirectoryContents(baseDirPath);

		try {
				const subjects: any[] = [];
				const subjectDirs = fs.readdirSync(baseDirPath);
				console.log(`Subject Directories: ${JSON.stringify(subjectDirs)}`);

				for (const subjectDir of subjectDirs) {
						console.log(`Processing subject directory: ${subjectDir}`);
						const subjectPath = path.join(baseDirPath, subjectDir);
						listDirectoryContents(subjectPath);
						const syllabusDirs = fs.readdirSync(path.join(subjectPath, 'Syllabus'));
						console.log(`Syllabus Directories for ${subjectDir}: ${JSON.stringify(syllabusDirs)}`);

						const courses = syllabusDirs.map(syllabusDir => {
								console.log(`Processing syllabus: ${syllabusDir} for subject: ${subjectDir}`);
								const syllabusPath = path.join(subjectPath, 'Syllabus', syllabusDir);
								listDirectoryContents(syllabusPath);
								const quizFiles = fs.readdirSync(path.join(syllabusPath, 'quiz'));
								console.log(`Quiz Files for ${syllabusDir}: ${JSON.stringify(quizFiles)}`);

								const quizzes = quizFiles.map(quizFile => {
										const quizFilePath = path.join(syllabusPath, 'quiz', quizFile);
										console.log(`Reading quiz file: ${quizFilePath}`);
										try {
												const quizContent = JSON.parse(fs.readFileSync(quizFilePath, 'utf8'));
												return {
														name: quizFile.replace('.json', ''),
														...quizContent,
												};
										} catch (error) {
												console.error(`Error parsing JSON from file: ${quizFilePath}`, error);
												throw new Error(`Invalid JSON in file: ${quizFilePath}`);
										}
								});
								return {
										name: syllabusDir,
										quizzes,
								};
						});
						subjects.push({
								name: subjectDir,
								courses,
						});
				}

				res.status(200).json(subjects);
		} catch (err) {
				console.error('Server Error:', err);
				res.status(500).send('Server Error');
		}
};

// Helper function
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

export default getSubjects;