import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, List } from "antd";
import React from "react";
import { useList } from "../../useList";
import { Item } from "../Item/Item";
import { ItemsList } from "../ItemList/ItemList";
import "./TaskList.css";

export const TaskList = () => {
  const { list, title, setListTitle, createItem, setItemTitle, toggleItem, deleteItem, clearItemList } = useList();
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
        className="taskList-wrapper"
        justify="space-between"
        vertical
        align="start"
      >
        <List className="taskList-list">
          <Item
            title={title}
            isDone={true}
            toggleItem={toggleItem}
            setTitle={setListTitle}
            isItem={false}
          />
          <ItemsList
            list={list}
            deleteItem={deleteItem}
            setTitle={setItemTitle}
            toggleItem={toggleItem}
          />
        </List>
        <Flex
          justify="space-between"
          className="taskList-btnWrapper"
        >
          <Button
            className="taskList-ControleBtn"
            onClick={createItem}
          >
            <PlusOutlined />
            Добавить задачу
          </Button>
          <Button
            className="taskList-ControleBtn"
            onClick={clearItemList}
          >
            Отчистить список
          </Button>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};
