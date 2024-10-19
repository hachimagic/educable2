// Profile.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';

interface ProfileData {
	username: string;
	realName: string;
	surname: string;
	email: string;
	profilePic?: string;
}

function ProfileField({ label, value }: { label: string, value: string }) {
	return (
		<div className="flex flex-col mb-1">
			<label className="font-semibold">{label}:</label>
			<span>{value}</span>
		</div>
	);
}

const Profile: React.FC = () => {
	const { userData } = useAuth();
	const [profile, setProfile] = useState<ProfileData | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState<ProfileData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

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
				setFormData(data);
			} catch (err: any) {
				console.error('Error fetching profile:', err.message);
				setError('Failed to fetch profile data. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userData.username]);

	const handleEditToggle = () => {
		setEditMode(!editMode);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (formData) {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	const handleSave = async () => {
		if (formData) {
			try {
				const response = await fetch('/api/profile/update', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				if (!response.ok) {
					throw new Error(`Failed to update profile: ${response.statusText}`);
				}

				setProfile(formData);
				setEditMode(false);
			} catch (error: any) {
				console.error('Error updating profile:', error.message);
				setError('Failed to update profile data. Please try again later.');
			}
		}
	};

	return (
		<main className="flex flex-col items-center min-h-screen bg-[#F7F7F7]">
			<div className="w-full max-w-[1080px]">
				<Header onRefresh={() => window.location.reload()} />
			</div>
			<div className="flex flex-grow justify-center items-center py-10 mt-6 w-full max-w-xl">
				<div className="bg-white rounded-lg shadow-lg p-8 w-full h-full overflow-auto">
					<h1 className="text-[#0279D4] font-bold text-4xl mb-6 text-center">Profile</h1>
					{loading ? (
						<LoadingSpinner />
					) : error ? (
						<div className="text-red-500">{error}</div>
					) : (
						<div className="flex flex-col md:flex-row items-center mb-5">
							<div className="flex justify-center items-center w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-500 shadow-md mb-4 md:mb-0">
								<img
									src={profile?.profilePic || '/path-to-default-profile-pic.jpg'}
									alt="Profile"
									className="w-28 h-28 md:w-36 md:h-36 rounded-full"
								/>
							</div>
							<div className="flex flex-col mx-0 md:mx-8 text-lg w-full">
								{editMode ? (
									<>
										<input
											type="text"
											name="realName"
											value={formData?.realName || ''}
											onChange={handleChange}
											className="mb-2 border-b border-gray-300 w-full px-2 py-1"
										/>
										<input
											type="text"
											name="surname"
											value={formData?.surname || ''}
											onChange={handleChange}
											className="mb-2 border-b border-gray-300 w-full px-2 py-1"
										/>
										<input
											type="email"
											name="email"
											value={formData?.email || ''}
											onChange={handleChange}
											className="mb-2 border-b border-gray-300 w-full px-2 py-1"
										/>
									</>
								) : (
									<>
										<ProfileField label="Username" value={profile?.username} />
										<ProfileField label="Real Name" value={profile?.realName} />
										<ProfileField label="Surname" value={profile?.surname} />
										<ProfileField label="Email" value={profile?.email} />
									</>
								)}
							</div>
						</div>
					)}
					{!loading && !error && (
						<div className="flex justify-center space-x-4 mt-6">
							{editMode && (
								<button
									onClick={handleSave}
									className="bg-gradient-to-r from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 transform hover:scale-105 transition-transform duration-200"
								>
									Save
								</button>
							)}
							<button
								onClick={handleEditToggle}
								className="bg-gradient-to-r from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 transform hover:scale-105 transition-transform duration-200"
							>
								{editMode ? 'Cancel' : 'Edit Profile'}
							</button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}

export default Profile;