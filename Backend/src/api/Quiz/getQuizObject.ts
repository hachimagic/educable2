import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const getQuizObject = async (req: Request, res: Response) => {
  const { subject, subsubject, id } = req.params;
  const basePath = path.resolve('./db/Subjects');
  const filePath = path.join(basePath, subject, 'Syllabus', subsubject, 'quiz', `${id}.json`);

  console.log(`Base Path: ${basePath}`);
  console.log(`Full File Path: ${filePath}`);

  try {
    console.log(`Attempting to access file: ${filePath}`);
    await fs.access(filePath);

    console.log(`File exists: ${filePath}`);
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(`File content: ${data}`);

    res.json(JSON.parse(data));
  } catch (error: any) {
    console.error(`Error reading quiz file at ${filePath}:`, error.message);
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: `Quiz not found for ${subject}/${subsubject}/${id}` });
    } else {
      res.status(500).json({ error: `Failed to load quiz data for ${subject}/${subsubject}/${id}` });
    }
  }
};

export default getQuizObject;