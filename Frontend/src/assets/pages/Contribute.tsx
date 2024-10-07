import React, { useState } from 'react';

function Contribute() {
		const [courseName, setCourseName] = useState('');
		const [courseDetails, setCourseDetails] = useState('');
		const [subject, setSubject] = useState('');
		const [contributor, setContributor] = useState('');

		const handleSubmit = async (e: React.FormEvent) => {
				e.preventDefault();

				const newCourse = {
						name: courseName,
						details: courseDetails,
						subject: subject,
						contributor: contributor.split(',').map(name => name.trim())
				};

				const response = await fetch('/api/contribute', {
						method: 'POST',
						headers: {
								'Content-Type': 'application/json'
						},
						body: JSON.stringify(newCourse)
				});

				if (response.ok) {
						// Handle successful response
						alert('Course contributed successfully!');
				} else {
						// Handle error response
						alert('Failed to contribute course');
				}

		}

		return (
				<main className="flex flex-col items-center py-10 bg-white">
						<h1 className="text-4xl">Contribute a Course</h1>
						<form className="w-full max-w-lg mt-10" onSubmit={handleSubmit}>
								<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">Course Name</label>
										<input
												type="text"
												value={courseName}
												onChange={e => setCourseName(e.target.value)}
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												required
										/>
								</div>
								<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">Course Details</label>
										<textarea
												value={courseDetails}
												onChange={e => setCourseDetails(e.target.value)}
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												required
										/>
								</div>
								<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
										<input
												type="text"
												value={subject}
												onChange={e => setSubject(e.target.value)}
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												required
										/>
								</div>
								<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">Contributor(s)</label>
										<input
												type="text"
												value={contributor}
												onChange={e => setContributor(e.target.value)}
												placeholder="Separate names with a comma"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												required
										/>
								</div>
								<div className="flex items-center justify-between">
										<button
												type="submit"
												className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
										>
												Contribute
										</button>
								</div>
						</form>
				</main>
		);
}

export default Contribute;