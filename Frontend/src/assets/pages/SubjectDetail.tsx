import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SubjectDetail() {
	const { subject, subsubject } = useParams<{ subject: string, subsubject: string }>();
	const [exercises, setExercises] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchExercises = async () => {
			try {
				const response = await fetch(`/api/subjects/${subject}/${subsubject}`);
				if (!response.ok) throw new Error('Failed to fetch exercises');
				const data = await response.json();
				setExercises(data.exercises);
			} catch (error) {
				console.error('Error:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchExercises();
	}, [subject, subsubject]);

	const handleExerciseClick = (exercise: string) => {
		navigate(`/quiz?subject=${subject}&subsubject=${subsubject}&id=${exercise}`);
	};

	return (
		<div className="flex flex-col items-center px-20 pt-10 bg-white max-md:px-5 h-[100vh] overflow-y-auto">
			<div className="flex flex-col items-start w-full max-w-[1080px] max-md:max-w-full">
				<header className="flex flex-wrap gap-9 items-start text-black mb-10">
					<h1 className="text-7xl basis-auto max-md:text-4xl">{subject} - {subsubject}</h1>
				</header>
				<div className="w-full">
					{loading ? (
						<p className="text-2xl text-center w-full">Loading...</p>
					) : exercises.length > 0 ? (
						<ul>
							{exercises.map((exercise, index) => (
								<li key={index}
									className="mb-4 cursor-pointer text-blue-600 hover:underline"
									onClick={() => handleExerciseClick(exercise)}>
									{exercise}
								</li>
							))}
						</ul>
					) : (
						<p className="text-2xl text-center w-full">No exercises available</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default SubjectDetail;