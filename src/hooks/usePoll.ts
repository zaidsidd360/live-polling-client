import { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

export interface PollData {
	_id?: string;
	question: string;
	options: string[];
	duration: number;
	correctOption?: number;
	answers?: { [studentId: string]: number };
	results?: { [optionIndex: number]: number };
}

export const usePoll = () => {
	const [pollData, setPollData] = useState<PollData>({
		question: "",
		options: [],
		duration: 60,
		correctOption: undefined,
		answers: {},
		results: {},
	});
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socketClient = io(SOCKET_SERVER_URL);

		setSocket(socketClient);

		socketClient.on("updatePollData", (data: PollData) => {
			setPollData(data);
		});

		return () => {
			socketClient.disconnect();
		};
	}, []);

	const fetchPollData = useCallback(async () => {
		try {
			const response = await fetch(`${SOCKET_SERVER_URL}/poll`);
			if (response.ok) {
				const data = await response.json();
				setPollData(data);
			} else {
				console.error("Error fetching poll data:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching poll data:", error);
		}
	}, []);

	const submitAnswer = async (name: string, answer: number) => {
		try {
			if (socket) {
				socket.emit("submitAnswer", { studentName: name, answer });
			}
		} catch (error) {
			console.error("Error submitting answer:", error);
		}
	};

	const endCurrentPoll = () => {
		try {
			if (socket) {
				socket.emit("endCurrentPoll");
			}
		} catch (error) {
			console.log("Error ending poll:", error);
		}
	};

	const createPoll = (pollData: PollData) => {
		try {
			if (socket) {
				socket.emit("createPoll", pollData);
			}
		} catch (error) {
			console.log("Error creating poll:", error);
		}
	};

	return {
		pollData,
		fetchPollData,
		submitAnswer,
		endCurrentPoll,
		createPoll,
	};
};
