import { Checkbox, Input, Flex, ConfigProvider, Button } from "antd";
import { useEffect, useRef } from "react";
import "./item.css";
import { CloseOutlined } from "@ant-design/icons";

export const Item = ({ id, deleteItem, setItemTitle, toggle, title, isDone }) => {
  const inputRef = useRef(null);
  const checked = isDone ? "item-checked" : null;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleCheckboxChange = () => {
    toggle(id);
  };

  const handleTitleBlur = () => {
    if (title === "") {
      deleteItem(id);
    }
  };

  const handleTitleChnge = (event) => {
    setItemTitle(id, event.target.value);
  };

  const handleItemDelition = () => {
    deleteItem(id);
  };

  return (
    <Flex
      align="center"
      className={["item-wrapper", checked]}
    >
      <Checkbox
        className="item-checkbox"
        checked={isDone}
        onChange={handleCheckboxChange}
      />
      <Input
        className="item-input"
        defaultValue={title}
        ref={inputRef}
        onChange={handleTitleChnge}
        onBlur={handleTitleBlur}
      />
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
    </Flex>
  );
};
