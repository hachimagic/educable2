// Header.tsx (Component)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const profileIcon = '/icons/profile.svg';

const Header: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate('/profile');
	};

	const handleLogoClick = () => {
		navigate('/');
	};

	return (
		<div className="header w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center">
			<h1
				className="text-blue-500 font-bold text-6xl cursor-pointer hover:underline"
				onClick={handleLogoClick}
			>
				Educable
			</h1>
			<div className="flex gap-6 items-center">
				<input
					type="text"
					placeholder="Search"
					className="rounded-full border border-gray-300 px-4 py-2 w-[40vw] max-w-[500px] focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<div className="p-2">
					<img
						src={profileIcon}
						alt="Profile"
						className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
						onClick={handleProfileClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;