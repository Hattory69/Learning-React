import React from "react";
import { Item } from "../Item/Item";

export const ItemsList = ({ list, deleteItem, setTitle, toggleItem }) => {
  return (
    <>
      {list.map(({ id, isDone, title }, index) => (
        <Item
          key={id}
          id={id}
          title={title}
          isItem={true}
          isDone={isDone}
          isLast={list.length - 1 === index}
          deleteItem={deleteItem}
          setTitle={setTitle}
          toggleItem={toggleItem}
        />
      ))}
    </>
  );
};
