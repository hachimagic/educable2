import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
		return new URLSearchParams(useLocation().search);
}

function ExerciseDetail() {
		const query = useQuery();
		const subject = query.get('subject');
		const subsubject = query.get('subsubject');
		const exercise = query.get('id');

		const [quiz, setQuiz] = useState<any>(null);
		const [loading, setLoading] = useState<boolean>(true);

		useEffect(() => {
				const fetchQuiz = async () => {
						try {
								const response = await fetch(`/api/subjects/${subject}/${subsubject}/${exercise}`);
								if (!response.ok) throw new Error('Failed to fetch quiz');
								const data = await response.json();
								setQuiz(data);
						} catch (error) {
								console.error('Error:', error);
						} finally {
								setLoading(false);
						}
				};

				fetchQuiz();
		}, [subject, subsubject, exercise]);

		return (
				<div className="flex flex-col items-center px-20 pt-10 bg-white max-md:px-5 h-[100vh] overflow-y-auto">
						<div className="flex flex-col items-start w-full max-w-[1080px] max-md:max-w-full">
								<header className="flex flex-wrap gap-9 items-start text-black mb-10">
										<h1 className="text-7xl basis-auto max-md:text-4xl">{subject} - {subsubject} - {exercise}</h1>
								</header>
								<div className="w-full">
										{loading ? (
												<p className="text-2xl text-center w-full">Loading...</p>
										) : quiz ? (
												<div>
														<h2 className="text-3xl">{quiz.name}</h2>
														<p className="text-xl">{quiz.description}</p>
														{quiz.quiz && quiz.quiz.length > 0 && (
																<ul>
																		{quiz.quiz.map((question: any, index: number) => (
																				<li key={index} className="mb-4">
																						<p className="font-semibold">Question: {question.question}</p>
																						<ul>
																								{Object.keys(question.choices).map((key, idx) => (
																										<li key={idx}>
																												{key}: {question.choices[key]}
																										</li>
																								))}
																						</ul>
																						<p className="text-sm">Answer: {question.answer}</p>
																						<p className="text-sm">Solution: {question.solution}</p>
																				</li>
																		))}
																</ul>
														)}
												</div>
										) : (
												<p className="text-2xl text-center w-full">Quiz not available</p>
										)}
								</div>
						</div>
				</div>
		);
}

export default ExerciseDetail;