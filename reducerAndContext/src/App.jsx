import React from "react";
import "./App.css";
import { TicTacToeWrapper } from "./components/GameFieldWrapper/TicTacToeWrapper.jsx";
import { TaskListWrapper } from "./components/TaskList/TaskListWrapper.jsx";

export function App() {
	return (
		<>
			<TaskListWrapper />
			<TicTacToeWrapper />
		</>
	);
}
