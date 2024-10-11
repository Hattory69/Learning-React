import React, { useContext } from "react";
import { Item } from "../Item/Item";
import { taskListContext } from "../TaskList/TaskListWrapper";

export const ItemsList = () => {
	const state = useContext(taskListContext);

	return (
		<>
			{state.list.map(({ id, isDone, title }, index) => (
				<Item
					key={id}
					id={id}
					title={title}
					isItem={true}
					isDone={isDone}
					isLast={state.list.length - 1 === index}
				/>
			))}
		</>
	);
};
