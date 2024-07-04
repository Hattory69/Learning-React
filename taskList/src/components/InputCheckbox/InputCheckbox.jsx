import { Checkbox, Input } from "antd";
import React from "react";
import { useFocus } from "../../useList";
import "./InputCheckbox.css";

export const InputCheckbox = ({ isItem, title, isDone, toggleAllItems, toggleItem, id, isLast, deleteItem, setItemTitle, setListTitle }) => {
  const inputRef = useFocus(null);

  const handleCheckboxChange = () => {
    if (toggleItem) {
      toggleItem(id);
    } else {
      toggleAllItems();
    }
  };

  const handleTitleBlur = () => {
    if (title === "") {
      deleteItem(id);
    }
  };

  const handleTitleChnge = (event) => {
    if (setItemTitle) {
      setItemTitle(id, event.target.value);
    } else {
      setListTitle(event.target.value);
    }
  };

  return (
    <>
      <Checkbox
        className={!isItem ? "title-checkbox" : ''}
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
