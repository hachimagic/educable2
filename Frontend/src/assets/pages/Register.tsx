import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Register() {
	const [phase, setPhase] = useState(1);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [realName, setRealName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const { setAuthenticated } = useAuth();

	const handleNextPhase = (e: React.FormEvent) => {
		e.preventDefault();

		// Ensure all fields are filled and passwords match
		if (!username || !password || !confirmPassword) {
			setMessage('Please fill in all fields');
			return;
		}

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
			return;
		}

		setPhase(2);
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password, realName, surname, email }),
			});
			const data = await response.json();
			if (response.ok) {
				setMessage(data.message);
				setAuthenticated(true);
				navigate('/');
			} else {
				setMessage(data.error || 'Error registering');
			}
		} catch (error) {
			console.error('Error:', error);
			setMessage('Error registering');
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-200 bg-opacity-75">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
				<h1 className="text-[#0279D4] font-bold text-3xl mb-6 text-center">
					{phase === 1 ? 'Register - Step 1' : 'Register - Step 2'}
				</h1>
				<form onSubmit={phase === 1 ? handleNextPhase : handleRegister} className="flex flex-col">
					{phase === 1 ? (
						<>
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
							<input
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="my-2 p-2 border border-gray-300 rounded"
							/>
							<button
								type="submit"
								className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 mt-4 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
							>
								Next
							</button>
						</>
					) : (
						<>
							<input
								type="text"
								placeholder="Real Name"
								value={realName}
								onChange={(e) => setRealName(e.target.value)}
								className="my-2 p-2 border border-gray-300 rounded"
							/>
							<input
								type="text"
								placeholder="Surname"
								value={surname}
								onChange={(e) => setSurname(e.target.value)}
								className="my-2 p-2 border border-gray-300 rounded"
							/>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="my-2 p-2 border border-gray-300 rounded"
							/>
							<button
								type="submit"
								className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 mt-4 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
							>
								Register
							</button>
						</>
					)}
				</form>
				{message && <p className="mt-2 text-center text-[#8A8A8A]">{message}</p>}

				<div className="mt-4 text-center">
					<span className="text-sm text-[#8A8A8A]">or</span>
					<button
						onClick={() => navigate('/login')}
						className="ml-2 underline text-[#0279D4] hover:text-blue-600"
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default Register;