import { CloseOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex } from "antd";
import React, { useContext } from "react";
import { InputCheckbox } from "../InputCheckbox/InputCheckbox";
import { taskListDispatchContext } from "../TaskList/TaskListWrapper";
import "./item.css";

export const Item = ({ title, isDone, id, isLast, isItem }) => {
	const dispatch = useContext(taskListDispatchContext);
	const checked = isDone && isItem ? "item-checked" : null;
	return (
		<Flex
			align='center'
			className={["item-wrapper", checked]}
		>
			<InputCheckbox
				isItem={isItem}
				title={title}
				isDone={isDone}
				id={id}
				isLast={isLast}
			/>
			{isItem && (
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: "red",
						},
					}}
				>
					<Button
						onClick={() => {
							dispatch({ type: "deleteItem", payload: { id } });
						}}
						className='item-deleteBtn'
					>
						<CloseOutlined />
					</Button>
				</ConfigProvider>
			)}
		</Flex>
	);
};
