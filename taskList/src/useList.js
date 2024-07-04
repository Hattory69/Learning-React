import { useEffect, useRef, useState } from "react";

export const useFocus = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return inputRef;
};

export function useList() {
  const [list, setList] = useState(restoreTaskList("taskList"));
  const [title, setListTitle] = useState(restoreTaskList("taskListTitle"));

  function restoreTaskList(target) {
    const rawTaskList = localStorage.getItem(target);

    if (!rawTaskList) {
      return target === "taskList" ? [] : "Список задач";
    } else {
      return JSON.parse(rawTaskList);
    }
  }

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(list));
    localStorage.setItem("taskListTitle", JSON.stringify(title));
  }, [list, title]);

  const clearItemList = () => {
    setList([]);
    setListTitle("Список задач");
  };

  const createItem = () => {
    setList([
      ...list,
      {
        id: Date.now(),
        title: "",
        isDone: false,
      },
    ]);
  };

  const setItemTitle = (title, id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, title: title };
        } else {
          return item;
        }
      })
    );
  };

  const toggleItem = (id) => {
    if (id) {
      setList(
        list.map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item
        )
      );
    } else {
      const allDone = list.every(item => item.isDone);
      setList(
        list.map(item => ({ ...item, isDone: !allDone }))
      );
    }
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return {
    title,
    setListTitle,
    list,
    setItemTitle,
    createItem,
    toggleItem,
    deleteItem,
    clearItemList,
  };
}
