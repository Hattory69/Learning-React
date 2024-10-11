import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, List } from "antd";
import React, { useContext } from "react";
import { Item } from "../Item/Item";
import { ItemsList } from "../ItemList/ItemList";
import "./TaskList.css";
import { taskListContext, taskListDispatchContext } from "./TaskListWrapper";

export const TaskList = () => {
	const dispatch = useContext(taskListDispatchContext);
	const state = useContext(taskListContext);

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#000",
					colorBorder: "#000",
					checkboxCheckedColor: "#000",
					checkboxHoverColor: "#000",
				},
			}}
		>
			<Flex
				className='taskList-wrapper'
				justify='space-between'
				vertical
				align='start'
			>
				<List className='taskList-list'>
					<Item
						title={state.title}
						isDone={true}
						isItem={false}
					/>
					<ItemsList />
				</List>
				<Flex
					justify='space-between'
					className='taskList-btnWrapper'
				>
					<Button
						className='taskList-ControleBtn'
						onClick={() => {
							dispatch({
								type: "addItem",
							});
						}}
					>
						<PlusOutlined />
						Добавить задачу
					</Button>
					<Button
						className='taskList-ControleBtn'
						onClick={() => {
							dispatch({
								type: "clearItems",
							});
						}}
					>
						Отчистить список
					</Button>
				</Flex>
			</Flex>
		</ConfigProvider>
	);
};
