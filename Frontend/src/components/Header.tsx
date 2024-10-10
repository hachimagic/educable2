import React from 'react';
import { useNavigate } from 'react-router-dom';

const profileIcon = '/icons/profile.svg';

const Header: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate('/profile');
	};

	return (
		<>
			<div className="w-full max-w-[1080px] flex justify-between items-center p-2 md:px-4">
				<h1
					className="text-[#0279D4] font-bold text-4xl md:text-6xl cursor-pointer transition-all duration-200"
					onClick={onRefresh}
					style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
				>
					<span className="hover:text-blue-700">Educable</span>
				</h1>
				<div className="flex gap-4 items-center">
					<input
						type="text"
						placeholder="Search"
						className="rounded-full border border-gray-300 px-4 py-2 w-72 md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-500 transition-all duration-200"
					/>
					<div className="p-1 border-2 border-gray-300 rounded-full hover:border-blue-500 transition-all duration-200">
						<img
							src={profileIcon}
							alt="Profile"
							className="w-8 h-8 cursor-pointer hover:opacity-80 hover:scale-105 transition-transform duration-200"
							onClick={handleProfileClick}
						/>
					</div>
				</div>
			</div>
			<hr className="border-t border-gray-300 my-4 w-[95%] mx-auto" />
		</>
	);
};

export default Header;