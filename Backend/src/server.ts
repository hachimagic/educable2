import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';

// Import existing functionality
import getSubjects from './api/Subject/getSubjects';
import getSubjectDetail from './api/Subject/getSubjectDetail';
import getQuizObject from './api/Quiz/getQuizObject';
import generateSimilarQuestion from './api/Quiz/generateQuizQuestion';

const app = express();
const port = 3000;

sqlite3.verbose();

// Path to the SQLite database
const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      username TEXT, 
      password TEXT,
      realName TEXT,
      surname TEXT,
      email TEXT
    )`, (error) => {
      if (error) {
        console.error('Table creation error:', error.message);
      }
    });
  }
});

app.use(express.json());

// Existing endpoints
app.get('/api/subjects', getSubjects);
app.get('/api/subjects/:subject/:subsubject', getSubjectDetail);
app.get('/api/subjects/:subject/:subsubject/:id', getQuizObject);
app.post('/api/generate-similar-question', generateSimilarQuestion);



// Define a type for the user row
interface UserRow {
  id: number;
  password: string;
}

app.get('/api/profile', (req: Request, res: Response) => {
  const username = req.headers['x-username']; // Assume username is sent in headers for simplicity

  if (!username) {
    console.warn('No username provided');
    return res.status(400).json({ error: 'Bad Request: username is required' });
  }

  db.get<UserRow>("SELECT username, realName, surname, email FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      console.warn('User not found:', username);
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(row); // Send the user data as a JSON response
  });
});

app.post('/api/register', (req: Request, res: Response) => {
  console.log('Register endpoint hit');
  const { username, password, realName, surname, email } = req.body;

  if (!username || !password || !realName || !surname || !email) {
    console.warn('Validation failed: Missing required field');
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.get("SELECT username FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (row) {
      console.warn('Duplicate username detected:', username);
      return res.status(409).json({ error: 'Username already exists' });
    }

    const stmt = db.prepare("INSERT INTO users (username, password, realName, surname, email) VALUES (?, ?, ?, ?, ?)", (prepareErr) => {
      if (prepareErr) {
        console.error('Prepare statement error:', prepareErr.message);
        return res.status(500).json({ error: 'Database error' });
      }
    });

    bcrypt.hash(password, 10, (hashErr: Error | undefined, hashedPassword: string) => {
      if (hashErr) {
        console.error('Hashing error:', hashErr.message);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      stmt.run(username, hashedPassword, realName, surname, email, (error: Error | null) => {
        if (error) {
          console.error('Insert error:', error.message);
          return res.status(500).json({ error: 'Error inserting user' });
        }

        console.log('User registered:', username);
        return res.status(201).json({ message: 'User registered successfully' });
      });

      stmt.finalize((finalizeErr) => {
        if (finalizeErr) {
          console.error('Finalize statement error:', finalizeErr.message);
        }
      });
    });
  });
});

app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check for required fields
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query the database for the user
  db.get<UserRow>("SELECT id, password FROM users WHERE username = ?", [username], (err: Error | null, row: UserRow | undefined) => {
    if (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      console.warn('Failed login attempt for non-existent user:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, row.password, (compareError: Error | undefined, result: boolean) => {
      if (compareError) {
        console.error('Error in password comparison:', compareError.message);
        return res.status(500).json({ error: 'Error processing login' });
      }

      if (result) {
        console.log('User logged in:', username);
        return res.json({ message: 'Login successful!' });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;