import React, { createContext, useReducer } from "react";
import { taskListReducer } from "../../Reducers/taskListReducer";
import { TaskList } from "./TaskList";

export const taskListContext = createContext(null);
export const taskListDispatchContext = createContext(null);

export function TaskListWrapper() {
	const [state, dispatch] = useReducer(taskListReducer, {
		list: JSON.parse(localStorage.getItem("taskList")) || [],
		title: JSON.parse(localStorage.getItem("taskListTitle")) || "Список задач",
	});
	return (
		<taskListContext.Provider value={state}>
			<taskListDispatchContext.Provider value={dispatch}>
				<TaskList />
			</taskListDispatchContext.Provider>
		</taskListContext.Provider>
	);
}
