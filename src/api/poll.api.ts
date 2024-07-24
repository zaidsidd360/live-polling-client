// src/api/pollApi.ts
import axiosInstance from "../axiosConfig";
import { PollData } from "../hooks/usePoll";

// Function to fetch poll data
export const fetchPollData = async () => {
	try {
		const response = await axiosInstance.get<PollData>("/poll");
		return response.data;
	} catch (error) {
		console.error("Error fetching poll data:", error);
		throw error;
	}
};

// Function to create a new poll
export const createPoll = async (pollData: PollData) => {
	try {
		const response = await axiosInstance.post("/poll/create", pollData);
		return response.data;
	} catch (error) {
		console.error("Error creating poll:", error);
		throw error;
	}
};

// Function to get all polls
export const getAllPolls = async () => {
	try {
		const response = await axiosInstance.get("/poll/all");
		return response.data;
	} catch (error) {
		console.error("Error fetching all polls:", error);
		throw error;
	}
};
