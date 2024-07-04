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
  }, [list,title])

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

  const setItemTitle = (id, title) => {
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
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        } else {
          return item;
        }
      })
    );
  };

  const toggleAllItems = () => {
    let isToggled = false;

    function mapThrough(param) {
      setList(
        list.map((item) => {
          return {
            ...item,
            isDone: param,
          };
        })
      );
    }

    for (const item of list) {
      if (!item.isDone) {
        isToggled = true;
        break;
      }
    }

    mapThrough(isToggled)
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
    toggleAllItems,
    clearItemList,
  };
}
