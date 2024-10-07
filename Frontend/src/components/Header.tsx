import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the paths to your icons in the 'public' directory
const settingsIcon = '/icons/settings.svg';
const profileIcon = '/icons/profile.svg';

const Header: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
	const navigate = useNavigate();

	// Handlers for icon clicks
	const handleSettingsClick = () => {
		navigate('/settings');
	};

	const handleProfileClick = () => {
		navigate('/profile');
	};

	return (
		<>
			<div className="w-full max-w-[1080px] flex justify-between items-center">
				<h1
					className="text-[#0279D4] font-bold text-6xl cursor-pointer"
					onClick={onRefresh}
					style={{ position: 'relative', display: 'inline-block' }}
				>
					<span style={{ position: 'relative' }}>
						Educable
						<span
							style={{
								content: '""',
								position: 'absolute',
								left: 0,
								bottom: '20px',
								width: '100%',
								height: '4px',
								backgroundColor: '#0279D4',
							}}
						></span>
					</span>
				</h1>
				<div className="flex gap-4 items-center">
					<input
						type="text"
						placeholder="Search"
						className="rounded-full border border-gray-300 px-3 py-1 w-48 focus:outline-none"
					/>
					<img src={settingsIcon} alt="Settings" className="w-8 h-8 cursor-pointer" onClick={handleSettingsClick} />
					<img src={profileIcon} alt="Profile" className="w-8 h-8 cursor-pointer" onClick={handleProfileClick} />
				</div>
			</div>
			<hr className="border-t border-gray-300 my-4 w-[95%] mx-auto" />
		</>
	);
};

export default Header;