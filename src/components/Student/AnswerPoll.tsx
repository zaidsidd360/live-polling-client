// src/components/Student/AnswerPoll.tsx
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { PollData } from "../../hooks/usePoll";
import { useNavigate } from "react-router-dom";

interface AnswerPollProps {
	pollData: PollData;
	submitAnswer: (name: string, answer: number) => void;
}

const AnswerPoll: React.FC<AnswerPollProps> = ({ pollData, submitAnswer }) => {
	const navigate = useNavigate();
	const { question, options, duration, answers } = pollData;
	const voters = Object.keys(answers || {});

	const [name, setName] = useState(
		() => sessionStorage.getItem("studentName") || ""
	);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [timeLeft, setTimeLeft] = useState(duration);
	const [hasSubmitted, setHasSubmitted] = useState(false);

	useEffect(() => {
		if (pollData.question) {
			setTimeLeft(duration);
		}
	}, [pollData, duration]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleNameSubmit = () => {
		if (name.trim()) {
			sessionStorage.setItem("studentName", name.trim());
		}
	};

	const handleSubmit = () => {
		if (name && selectedOption !== null) {
			submitAnswer(name, selectedOption);
			setHasSubmitted(true);
		}
	};

	const handleViewResults = () => {
		navigate(`/results/student`);
	};

	useEffect(() => {
		if (timeLeft === 0 && !hasSubmitted) {
			handleSubmit();
		}
	}, [timeLeft, hasSubmitted]);

	if (!question) {
		return (
			<div className="bg-gray-950 text-gray-200 min-h-screen flex items-center justify-center">
				<div className="max-w-3xl w-full p-6 bg-gray-900 rounded-lg shadow-lg">
					<h1 className="text-3xl font-bold mb-6 text-center">
						No Poll Available
					</h1>
					<p className="text-center text-gray-400">
						The teacher hasn't created any poll yet. Please check
						back later.
					</p>
				</div>
			</div>
		);
	}

	if (!sessionStorage.getItem("studentName")) {
		return (
			<div className="bg-gray-950 text-gray-200 min-h-screen flex items-center justify-center">
				<div className="max-w-3xl w-full p-6 bg-gray-900 rounded-lg shadow-lg">
					<h1 className="text-3xl font-bold mb-6 text-center">
						Enter Your Name
					</h1>
					<div className="mb-6">
						<label
							htmlFor="name"
							className="block text-lg font-medium mb-2"
						>
							Your Name
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full p-3 border border-gray-800 bg-gray-950 rounded-md text-gray-200"
							placeholder="Enter your name"
						/>
					</div>
					<button
						type="button"
						onClick={handleNameSubmit}
						className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-600"
						disabled={!name.trim()}
					>
						Submit
					</button>
				</div>
			</div>
		);
	} else if (
		voters.length > 0 &&
		voters.includes(sessionStorage.getItem("studentName") || "")
	) {
		return (
			<div className="bg-gray-950 text-gray-200 min-h-screen flex items-center justify-center">
				<div className="max-w-3xl w-full p-6 bg-gray-900 rounded-lg shadow-lg text-center">
					<h1 className="text-3xl font-bold mb-6">
						Your answer has been submitted.
					</h1>
					<button
						type="button"
						onClick={handleViewResults}
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
					>
						View Live Results
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-950 text-gray-200 min-h-screen flex items-center justify-center">
			<div className="max-w-3xl w-full p-6 bg-gray-900 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Submit Your Answer
				</h1>

				{!hasSubmitted ? (
					<>
						<div className="mb-6">
							<h2 className="text-2xl font-semibold mb-4">
								{question}
							</h2>
							{options.map((option, index) => (
								<div
									key={index}
									className="relative flex items-center mb-4"
								>
									<input
										type="radio"
										name="option"
										id={`option-${index}`}
										checked={selectedOption === index}
										onChange={() =>
											setSelectedOption(index)
										}
										className="hidden"
									/>
									<label
										htmlFor={`option-${index}`}
										className={`flex-1 p-3 border border-gray-800 bg-gray-950 rounded-md text-gray-200 cursor-pointer ${
											selectedOption === index
												? "border-green-500"
												: ""
										}`}
									>
										{option}
									</label>
									<FaCheckCircle
										className={`absolute right-3 h-5 w-5 ${
											selectedOption === index
												? "text-green-500"
												: "text-gray-600"
										}`}
									/>
								</div>
							))}
						</div>

						<div className="mb-6">
							<button
								type="button"
								onClick={handleSubmit}
								className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-600"
								disabled={!name || selectedOption === null}
							>
								Submit Answer
							</button>
						</div>

						<div
							className={`text-center ${
								timeLeft <= (10 / 100) * duration
									? "text-red-400"
									: "text-gray-400"
							}`}
						>
							Time left: {timeLeft} seconds
						</div>
					</>
				) : (
					<div className="text-center text-gray-400">
						<h2 className="text-2xl font-semibold mb-4">
							Your answer has been submitted.
						</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default AnswerPoll;
