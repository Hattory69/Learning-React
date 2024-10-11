import { Checkbox, Input } from "antd";
import React, { useContext } from "react";
import { useFocus } from "../../useFocus";
import { taskListDispatchContext } from "../TaskList/TaskListWrapper";
import "./InputCheckbox.css";

export const InputCheckbox = ({ isItem, title, isDone, id, isLast }) => {
	const inputRef = useFocus(null);
	const dispatch = useContext(taskListDispatchContext);

	return (
		<>
			<Checkbox
				className={!isItem ? "title-checkbox" : ""}
				checked={isDone}
				onClick={() => {
					dispatch({
						type: "setIsDone",
						payload: {
							id: id,
						},
					});
				}}
			/>
			<Input
				className='item-input'
				value={title}
				ref={isLast ? inputRef : null}
				onChange={(e) =>
					dispatch({
						type: "setItemTitle",
						payload: {
							id: id,
							title: e.target.value,
							isItem: isItem,
						},
					})
				}
				onBlur={(e) => {
					dispatch({
						type: "handleTitleBlur",
						payload: {
							id: id,
							title: e.target.value,
						},
					});
				}}
			/>
		</>
	);
};
