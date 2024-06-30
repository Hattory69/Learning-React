import "./App.css";
import { Button, Flex, List, ConfigProvider } from "antd";
import { Item } from "./components/Item/Item.jsx";
import { useList } from "./useList.js";
import { ListTitle } from "./components/ListTitle/ListTitle.jsx";
import { PlusOutlined } from "@ant-design/icons";

export function App() {
  const { list, title, setTaskTitle, createItem, setItemTitle, toggleItem, deleteItem, saveTaskList, toggleAllItems, clearItemList } = useList();
  saveTaskList(list, title);
  return (
    <Flex
      justify="space-between"
      vertical
      align="start"
      className="taskList-wrapper"
    >
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
        <List className="taskList-list">
          <ListTitle
            setTaskTitle={setTaskTitle}
            title={title}
            toggleAllItems={toggleAllItems}
          />

          {list.map(({ id, title, isDone }) => (
            <div
              className="taskList-item"
              key={id}
            >
              <Item
                id={id}
                isDone={isDone}
                deleteItem={deleteItem}
                setItemTitle={setItemTitle}
                toggle={toggleItem}
                title={title}
              />
            </div>
          ))}
        </List>
        <Flex
          justify="space-between"
          className="taskList-btnWrapper"
        >
          <Button
            className="taskList-btn"
            onClick={createItem}
          >
            <PlusOutlined />
            Добавить задачу
          </Button>
          <Button
            className="taskList-btn"
            onClick={clearItemList}
          >
            Отчистить список
          </Button>
        </Flex>
      </ConfigProvider>
    </Flex>
  );
}
