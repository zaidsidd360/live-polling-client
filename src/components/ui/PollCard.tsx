import { PollData } from "../../hooks/usePoll";
import Button from "./Button";

interface PollCardProps {
	poll: PollData;
	handleViewDetails: (poll: PollData) => void;
}

const PollCard = ({ poll, handleViewDetails }: PollCardProps) => {
	return (
		<div
			key={poll._id}
			className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between h-60 sm:h-64 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg overflow-hidden"
		>
			<div className="flex-1 overflow-hidden">
				<h2 className="text-xl font-semibold mb-2 truncate">
					{poll.question}
				</h2>
				<ul className="overflow-hidden">
					{poll.options.map((option, index) => (
						<li
							key={index}
							className="flex justify-between overflow-hidden text-ellipsis"
						>
							<span className="truncate">{option}</span>
							<span>{poll.results![index] || 0} votes</span>
						</li>
					))}
				</ul>
			</div>
			<div className="mt-4">
				<Button
					text="View Details"
					onClick={() => handleViewDetails(poll)}
					className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-400 sm:px-4 sm:py-2 sm:text-base"
				/>
			</div>
		</div>
	);
};

export default PollCard;
