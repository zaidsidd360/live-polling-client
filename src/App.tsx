// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { usePoll } from "./hooks/usePoll";
import CreatePoll from "./components/Teacher/CreatePoll";
import AnswerPoll from "./components/Student/AnswerPoll";
import ViewResults from "./components/ViewResults";
import Home from "./components/Home";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";

const App: React.FC = () => {
	const {
		pollData,
		fetchPollData,
		submitAnswer,
		endCurrentPoll,
		createPoll,
	} = usePoll();

	useEffect(() => {
		fetchPollData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/dashboard"
					element={
						<TeacherDashboard
							pollData={pollData}
							endCurrentPoll={endCurrentPoll}
						/>
					}
				/>
				<Route
					path="/create-poll"
					element={
						<CreatePoll
							pollData={pollData}
							endCurrentPoll={endCurrentPoll}
							createPoll={createPoll}
						/>
					}
				/>
				<Route
					path="/answer-poll"
					element={
						<AnswerPoll
							pollData={pollData}
							submitAnswer={submitAnswer}
						/>
					}
				/>
				<Route
					path="/results/:role"
					element={
						<ViewResults
							pollData={pollData}
							fetchPollData={fetchPollData}
							endCurrentPoll={endCurrentPoll}
						/>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
