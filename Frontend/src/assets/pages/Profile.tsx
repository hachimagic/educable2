import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
	username: string;
	realName: string;
	surname: string;
	email: string;
	profilePic?: string;
	bio?: string;
	joinDate?: string;
}

function ProfileField({ label, value }: { label: string; value?: string }) {
	return value ? (
		<p className="text-gray-700">
			<strong className="font-semibold">{label}:</strong> {value}
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
					throw new Error(`Failed to fetch profile data: ${response.statusText}`);
				}

				const data: ProfileData = await response.json();
				setProfile(data);
			} catch (err: any) {
				console.error('Error fetching profile:', err.message);
				setError('Failed to fetch profile data. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userData.username]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
				<h1 className="text-[#0279D4] font-bold text-4xl mb-6 text-center">Profile</h1>
				<div className="flex">
					<img
						src={profile?.profilePic || '/path-to-default-profile-pic.jpg'}
						alt="Profile"
						className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md"
					/>
					<div className="flex items-center mx-8 h-40">
						<div className="border-l-2 border-gray-300 h-full"></div>
					</div>
					<div className="flex flex-col justify-center space-y-3 text-lg">
						<ProfileField label="Real Name" value={profile?.realName} />
						<ProfileField label="Surname" value={profile?.surname} />
						<ProfileField label="Email" value={profile?.email} />
					</div>
				</div>
				<div className="flex justify-center mt-6">
					<button
						onClick={() => navigate('/edit-profile')}
						className="bg-gradient-to-r from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:bg-gradient-to-r hover:from-[#1A9CFF] hover:to-[#78CBFF] transform hover:scale-105 transition-transform duration-200"
					>
						Edit Profile
					</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;