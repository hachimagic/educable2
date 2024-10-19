import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Ensure this path is correct

// Define a simple ProfileField component
function ProfileField({ label, value }: { label: string, value: string | undefined }) {
	return (
		<div className="flex flex-col mb-4">
			<label className="font-semibold">{label}:</label>
			<span>{value}</span>
		</div>
	);
}

// Define LoadingSpinner component
function LoadingSpinner() {
	return (
		<div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-blue-500 rounded-full" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);
}

// Define the ProfileData type
interface ProfileData {
	username: string;
	realName: string;
	surname: string;
	email: string;
	profilePic?: string; // Include profilePic if used
}

// Profile component
function Profile() {
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
				setFormData(data); // Initialize formData with fetched data
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
					body: JSON.stringify(formData), // Ensure formData includes username
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
						{editMode ? (
							<>
								<input type="text" name="username" value={formData?.username || ''} disabled />
								<input type="text" name="realName" value={formData?.realName || ''} onChange={handleChange} />
								<input type="text" name="surname" value={formData?.surname || ''} onChange={handleChange} />
								<input type="email" name="email" value={formData?.email || ''} onChange={handleChange} />
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
				<div className="flex justify-center mt-6 space-x-4">
					{editMode ? (
						<button
							onClick={handleSave}
							className="bg-gradient-to-r from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:bg-gradient-to-r hover:from-[#1A9CFF] hover:to-[#78CBFF] transform hover:scale-105 transition-transform duration-200"
						>
							Save
						</button>
					) : null}
					<button
						onClick={handleEditToggle}
						className="bg-gradient-to-r from-[#78CBFF] to-[#1A9CFF] text-white rounded-xl px-5 py-2 hover:bg-gradient-to-r hover:from-[#1A9CFF] hover:to-[#78CBFF] transform hover:scale-105 transition-transform duration-200"
					>
						{editMode ? 'Cancel' : 'Edit Profile'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;