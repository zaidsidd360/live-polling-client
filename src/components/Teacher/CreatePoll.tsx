import React, { useState } from "react";
import { FaTrash, FaCheckCircle, FaPoll, FaPlus } from "react-icons/fa";
import { PollData } from "../../hooks/usePoll";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

interface CreatePollProps {
	pollData: PollData;
	endCurrentPoll: () => void;
	createPoll: (pollData: PollData) => void;
}

const CreatePoll: React.FC<CreatePollProps> = ({
	pollData,
	endCurrentPoll,
	createPoll,
}: CreatePollProps) => {
	const navigate = useNavigate();
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState<string[]>(["", "", ""]); // Default to three options
	const [newOption, setNewOption] = useState("");
	const [correctOption, setCorrectOption] = useState<number | undefined>();
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editedOption, setEditedOption] = useState("");
	const [duration, setDuration] = useState(60);

	const handleAddOption = () => {
		if (newOption.trim() && !options.includes(newOption)) {
			setOptions([...options, newOption]);
			setNewOption("");
		}
	};

	const handleOptionChange = (index: number, value: string) => {
		const updatedOptions = options.map((option, i) =>
			i === index ? value : option
		);
		setOptions(updatedOptions);
	};

	const handleEditOption = (index: number) => {
		setEditingIndex(index);
		setEditedOption(options[index]);
	};

	const handleSaveOption = (index: number) => {
		handleOptionChange(index, editedOption);
		setEditingIndex(null);
		setEditedOption("");
	};

	const handleDeleteOption = (index: number) => {
		const updatedOptions = options.filter((_, i) => i !== index);
		setOptions(updatedOptions);
		if (correctOption === index) setCorrectOption(undefined);
	};

	const handleCreatePoll = async () => {
		console.log("Poll Created:", {
			question,
			options,
			correctOption,
			duration,
		});
		// try {
		// 	const response = await createPoll({
		// 		question,
		// 		options,
		// 		duration,
		// 		correctOption,
		// 	});
		// 	if (response !== undefined) {
		// 		console.log("Poll created successfully");
		// 	}
		// 	navigate(`/results/teacher`);
		// } catch (error) {
		// 	// Handle error
		// 	console.log(error);
		// }
		createPoll({
			question,
			options,
			duration,
			correctOption,
		});
		navigate(`/results/teacher`);
	};

	const handleEndPoll = () => {
		console.log("Poll ended");
		endCurrentPoll();
	};

	return (
		<div className="bg-gray-950 text-gray-200 min-h-screen flex items-center justify-center">
			<div className="max-w-3xl w-full p-6 bg-gray-900 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
					<FaPoll />
					Create a New Poll
				</h1>
				{pollData.question ? (
					<div className="text-center text-lg text-red-400 mb-6">
						A poll is already running. Please end that poll to
						create another one.
						<div className="mt-4 flex justify-center gap-4">
							<Button
								text="End Current Poll"
								onClick={handleEndPoll}
								className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
							/>
							<Link to={"/results"}>
								<Button
									text="View Live Results"
									className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
								/>
							</Link>
						</div>
					</div>
				) : (
					<>
						<div className="mb-6">
							<label
								htmlFor="question"
								className="block text-lg font-medium mb-2"
							>
								Poll Question
							</label>
							<input
								id="question"
								type="text"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								className="w-full p-3 border border-gray-800 bg-gray-950 rounded-md text-gray-200"
								placeholder="Enter the poll question"
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor="options"
								className="block text-lg font-medium mb-2"
							>
								Options
							</label>
							{options.map((option, index) => (
								<div
									key={index}
									className="relative flex items-center mb-4"
								>
									<input
										type="text"
										value={
											editingIndex === index
												? editedOption
												: option
										}
										onChange={(e) =>
											setEditedOption(e.target.value)
										}
										onFocus={() => handleEditOption(index)}
										onBlur={() => handleSaveOption(index)}
										className="w-full p-3 border border-gray-800 bg-gray-950 rounded-md text-gray-200 pr-20"
										placeholder={`Option ${index + 1}`}
									/>
									<FaCheckCircle
										onClick={() => setCorrectOption(index)}
										className={`absolute right-10 h-5 w-5 cursor-pointer ${
											correctOption === index
												? "text-green-500"
												: "text-gray-600"
										}`}
										title="Correct Option"
									/>
									<FaTrash
										onClick={() =>
											handleDeleteOption(index)
										}
										className="absolute right-3 h-5 w-5 text-gray-600 cursor-pointer hover:text-red-500"
										title="Delete Option"
									/>
								</div>
							))}
							<div className="flex mb-6">
								<input
									type="text"
									value={newOption}
									onChange={(e) =>
										setNewOption(e.target.value)
									}
									className="flex-1 p-3 border border-gray-800 bg-gray-950 rounded-md text-gray-200"
									placeholder="Add another option"
								/>
								<Button
									text="Add Option"
									onClick={handleAddOption}
									className={`ml-3 px-4 py-2 rounded-md ${
										newOption.trim()
											? "bg-gray-700 text-gray-200 hover:bg-gray-600"
											: "bg-gray-600 text-gray-400 cursor-not-allowed"
									}`}
									diabled={!newOption.trim()}
								/>
							</div>
						</div>
						<div className="mb-6">
							<label
								htmlFor="duration"
								className="block text-lg font-medium mb-2"
							>
								Poll Duration (seconds)
							</label>
							<input
								id="duration"
								type="number"
								min="10"
								value={duration}
								onChange={(e) =>
									setDuration(Number(e.target.value))
								}
								className="w-full p-3 border border-gray-800 bg-gray-950 rounded-md text-gray-200"
								placeholder="Enter the poll duration in seconds"
							/>
						</div>
						<Button
							text="Create Poll"
							icon={<FaPlus />}
							onClick={handleCreatePoll}
							className={`w-full text-gray-200 px-4 py-2 rounded-md ${
								question.trim().length > 0 &&
								options.some((opt) => opt.trim().length > 0)
									? "bg-gray-700 text-gray-200 hover:bg-gray-600"
									: "bg-gray-600 text-gray-400 cursor-not-allowed"
							} flex items-center justify-center gap-2`}
							diabled={
								!(
									question.trim().length > 0 &&
									options.some((opt) => opt.trim().length > 0)
								)
							}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default CreatePoll;
