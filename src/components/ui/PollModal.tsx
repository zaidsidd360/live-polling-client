import Modal from "react-modal";
import Button from "./Button";
import { PollData } from "../../hooks/usePoll";

interface PollModalProps {
	selectedPoll: PollData;
	closeModal: () => void;
	isModalOpen: boolean;
}

const PollModal = ({
	selectedPoll,
	closeModal,
	isModalOpen,
}: PollModalProps) => {
	return (
		<Modal
			ariaHideApp={false}
			isOpen={isModalOpen}
			onRequestClose={closeModal}
			className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-20"
			overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
		>
			<h2 className="text-2xl font-semibold mb-4">
				{selectedPoll.question}
			</h2>
			<p className="mb-4">
				Total Responses:{" "}
				{Object.keys(selectedPoll.answers ?? {}).length}
			</p>
			<ul>
				{Object.entries(selectedPoll.answers!).map(
					([student, answer]) => (
						<li key={student} className="flex justify-between">
							<span>{student}</span>
							<span
								className={`${
									answer === -1 ? "text-red-400" : ""
								}`}
							>
								{answer === -1
									? "Unanswered"
									: selectedPoll.options[answer]}
							</span>
						</li>
					)
				)}
			</ul>
			<Button
				text="Close"
				onClick={closeModal}
				className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
			/>
		</Modal>
	);
};

export default PollModal;
