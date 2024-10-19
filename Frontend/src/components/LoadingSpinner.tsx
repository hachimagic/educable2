// LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-12">
			<div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
		</div>
	);
};

export default LoadingSpinner;