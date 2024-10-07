import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
	const { userData } = useAuth();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await fetch('/api/profile', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'x-username': userData.username, // Use username from AuthContext
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch profile data');
				}

				const data = await response.json();
				setProfile(data);
			} catch (err) {
				console.error('Error fetching profile:', err.message);
				setError('Failed to fetch profile data');
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userData.username]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-200 bg-opacity-75">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<h1 className="text-[#0279D4] font-bold text-3xl mb-6 text-center">Profile</h1>
				<div className="flex flex-col">
					<p><strong>Username:</strong> {profile.username}</p>
					<p><strong>Real Name:</strong> {profile.realName}</p>
					<p><strong>Surname:</strong> {profile.surname}</p>
					<p><strong>Email:</strong> {profile.email}</p>
				</div>
				<button
					onClick={() => navigate('/edit-profile')}
					className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 mt-4 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
				>
					Edit Profile
				</button>
			</div>
		</div>
	);
}

export default Profile;