import { PollData } from "../../hooks/usePoll";
import Button from "./Button";

interface PollCardProps {
	poll: PollData;
	handleViewDetails: (poll: PollData) => void;
}

const PollCard = ({ poll, handleViewDetails }: PollCardProps) => {
	return (
		<div key={poll._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-2">{poll.question}</h2>
			<ul>
				{poll.options.map((option, index) => (
					<li key={index} className="flex justify-between">
						<span>{option}</span>
						<span>{poll.results![index] || 0} votes</span>
					</li>
				))}
			</ul>
			<Button
				text="View Details"
				onClick={() => handleViewDetails(poll)}
				className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
			/>
		</div>
	);
};

export default PollCard;
