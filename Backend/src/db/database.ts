// src/db/database.ts

import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();

const dbPath = path.resolve(__dirname, '../../your-database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error('Error opening database ' + err.message);
	} else {
		console.log('Connected to SQLite database.');
		db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)", (err) => {
			if (err) {
				console.error(err.message);
			}
		});
	}
});

// Function to add a user
export const addUser = (username: string, password: string) => {
	const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
	stmt.run(username, password, (err) => {
		if (err) {
			console.error(err.message);
		} else {
			console.log('User added.');
		}
	});
	stmt.finalize();
};

// Function to get all users
export const getAllUsers = (callback: (users: any) => void) => {
	db.all("SELECT id, username FROM users", (err, rows) => {
		if (err) {
			console.error(err.message);
			callback([]);
		} else {
			callback(rows);
		}
	});
};

// Export the `db` to allow manual queries if needed
export { db };