import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaUserGraduate, FaPoll } from "react-icons/fa";

const Home: React.FC = () => {
	const navigate = useNavigate();

	const handleUserSelection = (role: string) => {
		if (role === "teacher") {
			navigate("/dashboard");
		} else if (role === "student") {
			navigate("/answer-poll");
		}
	};

	return (
		<div className="bg-gray-950 text-gray-200 min-h-screen flex items-center justify-center">
			<div className="max-w-lg w-full p-8 bg-gray-900 rounded-lg shadow-lg text-center">
				<FaPoll size={100} className="mx-auto mb-6 text-gray-500" />
				<h1 className="text-4xl font-bold mb-8">
					Welcome to the Live Polling System
				</h1>
				<p className="mb-8 text-xl">Please select your role:</p>
				<div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8">
					<button
						onClick={() => handleUserSelection("teacher")}
						className="flex flex-col items-center px-6 py-4 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 focus:outline-none"
					>
						<FaChalkboardTeacher size={50} className="mb-2" />
						<span className="text-lg">I am a Teacher</span>
					</button>
					<button
						onClick={() => handleUserSelection("student")}
						className="flex flex-col items-center px-6 py-4 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 focus:outline-none"
					>
						<FaUserGraduate size={50} className="mb-2" />
						<span className="text-lg">I am a Student</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
