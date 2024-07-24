import React, { useEffect } from "react";
import { PollData } from "../hooks/usePoll";
import { FaPoll } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./ui/Button";

interface ViewResultsProps {
	pollData: PollData;
	fetchPollData: () => void;
	endCurrentPoll: () => void;
}

const ViewResults: React.FC<ViewResultsProps> = ({
	pollData,
	fetchPollData,
	endCurrentPoll,
}) => {
	const { question, options, results } = pollData;
	const { role } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!pollData.question) {
			fetchPollData();
		}
	}, [pollData.question, fetchPollData]);

	const handleEndPoll = async () => {
		endCurrentPoll();
	};

	const resultsArray = options.map((_, index) => results?.[index] || 0);
	const totalVotes = resultsArray.reduce((total, votes) => total + votes, 0);

	return (
		<div className="bg-gray-950 text-gray-200 min-h-screen flex items-center justify-center">
			<div className="max-w-3xl w-full p-6 bg-gray-900 rounded-lg shadow-lg">
				{question ? (
					<>
						<h1 className="text-3xl font-bold mb-6 text-center">
							Poll Results
						</h1>
						<div className="mb-6">
							<h2 className="text-2xl font-semibold mb-4">
								{question}
							</h2>
							{options.map((option, index) => {
								const votes = results?.[index] || 0;
								const percentage = totalVotes
									? (votes / totalVotes) * 100
									: 0;
								return (
									<div key={index} className="mb-4">
										<div className="relative flex items-center mb-1 p-3 border border-gray-800 bg-gray-950 rounded-md text-gray-200">
											<span className="flex-1">
												{option}
											</span>
											<span className="ml-4 text-green-500">
												{votes} votes (
												{percentage.toFixed(1)}%)
											</span>
										</div>
										<div className="w-full bg-gray-800 rounded-full h-2.5">
											<div
												className="bg-green-500 h-2.5 rounded-full"
												style={{
													width: `${percentage}%`,
												}}
											></div>
										</div>
									</div>
								);
							})}
						</div>
						{role === "teacher" && (
							<Button
								text="End Poll"
								onClick={handleEndPoll}
								className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
							/>
						)}
					</>
				) : (
					<div className="text-center text-xl flex flex-col items-center justify-center space-y-4">
						<div className="flex items-center space-x-4">
							<FaPoll className="text-6xl" />
							<span>
								No poll is going on right now. Check back later.
							</span>
						</div>
						{role === "teacher" && (
							<button
								onClick={() => navigate("/dashboard")}
								className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
							>
								Go to dashboard
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ViewResults;
