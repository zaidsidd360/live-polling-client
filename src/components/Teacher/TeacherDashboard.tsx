import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PollData } from "../../hooks/usePoll";
import { getAllPolls } from "../../api/poll.api";
import Button from "../ui/Button";
import PollModal from "../ui/PollModal";
import PollCard from "../ui/PollCard";
import { toast } from "react-toastify";

interface TeacherDashboardProps {
	pollData: PollData;
	endCurrentPoll: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
	pollData,
	endCurrentPoll,
}: TeacherDashboardProps) => {
	const [pastPolls, setPastPolls] = useState<PollData[]>([]);
	const [selectedPoll, setSelectedPoll] = useState<PollData | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadPolls = async () => {
			const polls = await getAllPolls();
			setPastPolls(polls);
		};

		loadPolls();
	}, []);

	const handleEndPoll = async () => {
		endCurrentPoll();
		toast.success("Poll ended successfully!");
	};

	const handleStartNewPoll = () => {
		navigate("/create-poll");
	};

	const handleViewDetails = (poll: PollData) => {
		setSelectedPoll(poll);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedPoll(null);
	};

	return (
		<div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl w-full p-6 bg-gray-900 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Teacher Dashboard (Past Polls)
				</h1>
				<div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
					<Button
						text="End Current Poll"
						onClick={handleEndPoll}
						className={`bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center ${
							!pollData.question?.length
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-red-400"
						}`}
						icon={<FaTrash />}
						diabled={!pollData.question}
					/>
					<Button
						text="Start New Poll"
						onClick={handleStartNewPoll}
						className={`bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center ${
							pollData.question
								? "opacity-50 cursor-not-allowed"
								: "hover:bg-green-400"
						}`}
						icon={<FaPlus />}
						diabled={!!pollData.question}
					/>
				</div>
				{pastPolls.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{pastPolls.map((poll) => (
							<PollCard
								key={poll._id}
								poll={poll}
								handleViewDetails={handleViewDetails}
							/>
						))}
					</div>
				) : (
					<p className="text-center text-xl">No past polls found.</p>
				)}
			</div>
			{selectedPoll && (
				<PollModal
					isModalOpen={isModalOpen}
					closeModal={closeModal}
					selectedPoll={selectedPoll}
				/>
			)}
		</div>
	);
};

export default TeacherDashboard;
