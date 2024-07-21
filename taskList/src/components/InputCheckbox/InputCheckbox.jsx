import { Checkbox, Input } from "antd";
import React from "react";
import { useFocus } from "../../useList";
import "./InputCheckbox.css";

export const InputCheckbox = ({ isItem, title, isDone, toggleItem, id, isLast, deleteItem, setTitle }) => {
  const inputRef = useFocus(null);

  const handleCheckboxChange = () => {
    toggleItem(id);
  };

  const handleTitleBlur = () => {
    if (title === "") {
      deleteItem(id);
    }
  };

  const handleTitleChnge = (event) => {
    setTitle(event.target.value, id);
  };

  return (
    <>
      <Checkbox
        className={!isItem ? "title-checkbox" : ""}
        checked={isDone}
        onClick={handleCheckboxChange}
      />
      <Input
        className="item-input"
        value={title}
        ref={isLast ? inputRef : null}
        onChange={handleTitleChnge}
        onBlur={handleTitleBlur}
      />
    </>
  );
};
