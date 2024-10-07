import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const { setAuthenticated, setUserData } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();
			if (response.ok) {
				setMessage(data.message);
				setAuthenticated(true);
				setUserData({ username, realName: data.realName, surname: data.surname, email: data.email });
				localStorage.setItem('username', username); // Ensure username is saved
				localStorage.setItem('realName', data.realName);
				localStorage.setItem('surname', data.surname);
				localStorage.setItem('email', data.email);
				navigate('/');
			} else {
				setMessage(data.error || 'Error logging in');
			}
		} catch (error) {
			console.error('Error:', error);
			setMessage('Error logging in');
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-200 bg-opacity-75">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
				<h1 className="text-[#0279D4] font-bold text-3xl mb-6 text-center">Login</h1>
				<form onSubmit={handleLogin} className="flex flex-col">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="my-2 p-2 border border-gray-300 rounded"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="my-2 p-2 border border-gray-300 rounded"
					/>
					<button
						type="submit"
						className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 mt-4 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
					>
						Login
					</button>
				</form>
				{message && <p className="mt-2 text-center text-[#8A8A8A]">{message}</p>}

				<div className="mt-4 text-center">
					<span className="text-sm text-[#8A8A8A]">or</span>
					<button
						onClick={() => navigate('/register')}
						className="ml-2 underline text-[#0279D4] hover:text-blue-600"
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;