import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
	username: string;
	realName: string;
	surname: string;
	email: string;
	bio?: string;
	joinDate?: string;
}

function ProfileField({ label, value }: { label: string; value?: string }) {
	return value ? (
		<p>
			<strong>{label}:</strong> {value}
		</p>
	) : null;
}

function LoadingSpinner() {
	return <div className="loader"></div>;
}

function Profile() {
	const { userData } = useAuth();
	const [profile, setProfile] = useState<ProfileData | null>(null);
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
						'x-username': userData.username, 
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch profile data');
				}

				const data = await response.json();
				setProfile(data);
			} catch (err: any) {
				console.error('Error fetching profile:', err.message);
				setError('Failed to fetch profile data');
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userData.username]);

	if (loading) return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner /></div>;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-200 bg-opacity-75">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<h1 className="text-[#0279D4] font-bold text-3xl mb-6 text-center">Profile</h1>
				<div className="flex flex-col items-center">
					<img
						src="/path-to-default-profile-pic.jpg"
						alt="Profile"
						className="w-32 h-32 rounded-full mb-4"
					/>
					<div className="flex flex-col space-y-4 text-center">
						<ProfileField label="Username" value={profile.username} />
						<ProfileField label="Real Name" value={profile.realName} />
						<ProfileField label="Surname" value={profile.surname} />
						<ProfileField label="Email" value={profile.email} />
						<ProfileField label="Bio" value={profile.bio} />
						<ProfileField label="Joined" value={profile.joinDate} />
					</div>
					<button
						onClick={() => navigate('/edit-profile')}
						className="bg-gradient-to-br from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 mt-4 hover:from-[#1A9CFF] hover:to-[#1A9CFF]"
					>
						Edit Profile
					</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;