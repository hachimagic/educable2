import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserData = {
	username: string;
	realName: string;
	surname: string;
	email: string;
};

type AuthContextType = {
	isAuthenticated: boolean;
	userData: UserData;
	setAuthenticated: (value: boolean) => void;
	setUserData: (data: UserData) => void;
	logout: () => void;
};

const defaultUserData: UserData = {
	username: '',
	realName: '',
	surname: '',
	email: '',
};

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	userData: defaultUserData,
	setAuthenticated: () => {},
	setUserData: () => {},
	logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		const storedAuth = localStorage.getItem('isAuthenticated');
		return storedAuth === 'true' || false;
	});

	const [userData, setUserData] = useState<UserData>(() => ({
		username: localStorage.getItem('username') || '',
		realName: localStorage.getItem('realName') || '',
		surname: localStorage.getItem('surname') || '',
		email: localStorage.getItem('email') || '',
	}));

	const setAuthenticated = (value: boolean) => {
		setIsAuthenticated(value);
		localStorage.setItem('isAuthenticated', value.toString());
	};

	const updateUserData = (data: UserData) => {
		setUserData(data);
		localStorage.setItem('username', data.username);
		localStorage.setItem('realName', data.realName);
		localStorage.setItem('surname', data.surname);
		localStorage.setItem('email', data.email);
	};

	const logout = () => {
		console.log('Logging out...');
		setIsAuthenticated(false);
		setUserData(defaultUserData);
		localStorage.clear(); // Clears all items
		navigate('/login');
	};

	useEffect(() => {
		// Only redirect if userData is empty, meaning it wasn't initialized from localStorage
		if (!userData.username && isAuthenticated) {
			console.warn("Username is missing, performing logout.");
			logout();
		}
	}, [userData, isAuthenticated]); // Check both userData and isAuthenticated

	return (
		<AuthContext.Provider value={{ isAuthenticated, userData, setAuthenticated, setUserData: updateUserData, logout }}>
			{children}
		</AuthContext.Provider>
	);
};