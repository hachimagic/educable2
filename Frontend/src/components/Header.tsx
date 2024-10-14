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
			<div className="w-full flex justify-between items-center px-6 pt-4">
				<h1
					className="text-[#0279D4] font-bold text-6xl cursor-pointer"
					onClick={onRefresh}
				>
					<span className="drop-shadow-sm">Educable</span>
				</h1>
				<div className="flex gap-6 items-center">
					<input
						type="text"
						placeholder="Search"
						className="rounded-full border border-[#B9B9B9] px-4 py-2 w-[45vw] focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-75"
					/>
					<div className="p-2">
						<img
							src={profileIcon}
							alt="Profile"
							className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
							onClick={handleProfileClick}
						/>
					</div>
				</div>
			</div>
			<div><hr className='border-[#B9B9B9] w-full mt-6'/></div>
		</>
	);
};

export default Header;