const verifyFileExistence = () => {
	try {
			const baseDirPath = path.join(__dirname, '../../../db/Subjects');
			const subjectDirPath = path.join(baseDirPath, 'math');
			const syllabusDirPath = path.join(subjectDirPath, 'Syllabus');
			const subsubjectDirPath = path.join(syllabusDirPath, 'algebra');
			const quizDirPath = path.join(subsubjectDirPath, 'quiz');
			const exerciseFilePath = path.join(quizDirPath, 'exercise_1.json');

			console.log(`Base Directory Path: ${baseDirPath}`);
			listDirectoryContents(baseDirPath);
			console.log(`Subject Directory Path: ${subjectDirPath}`);
			listDirectoryContents(subjectDirPath);
			console.log(`Syllabus Directory Path: ${syllabusDirPath}`);
			listDirectoryContents(syllabusDirPath);
			console.log(`Subsubject Directory Path: ${subsubjectDirPath}`);
			listDirectoryContents(subsubjectDirPath);
			console.log(`Quiz Directory Path: ${quizDirPath}`);
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

// Run the verification
verifyFileExistence();