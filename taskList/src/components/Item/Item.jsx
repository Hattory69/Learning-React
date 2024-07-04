import { CloseOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex } from "antd";
import React from "react";
import { InputCheckbox } from "../InputCheckbox/InputCheckbox";
import "./Item.css";

export const Item = ({ title, isDone, toggleAllItems, toggleItem, id, isLast, deleteItem, setItemTitle, setListTitle, isItem }) => {
  const handleItemDelition = () => {
    deleteItem(id);
  };

  const checked = isDone && isItem ? "item-checked" : null;
  return (
    <Flex
      align="center"
      className={["item-wrapper", checked]}
    >
      <InputCheckbox
        isItem={isItem}
        title={title}
        isDone={isDone}
        toggleAllItems={toggleAllItems}
        toggleItem={toggleItem}
        setItemTitle={setItemTitle}
        setListTitle={setListTitle}
        id={id}
        isLast={isLast}
        deleteItem={deleteItem}
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
            onClick={handleItemDelition}
            className="item-deletBtn"
          >
            <CloseOutlined />
          </Button>
        </ConfigProvider>
      )}
    </Flex>
  );
};
