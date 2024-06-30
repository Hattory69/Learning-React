import { useState } from "react";

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

  function saveTaskList(list, title) {
    localStorage.setItem("taskList", JSON.stringify(list));
    localStorage.setItem("taskListTitle", JSON.stringify(title));
  }

  const setTaskTitle = (title) => {
    setListTitle(title);
  };

  const clearItemList = () => {
    localStorage.removeItem("taskList", "taskListTitle");
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
        mapThrough(true);
        break;
      }
    }
    if (!isToggled) {
      mapThrough(false);
    }
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return {
    title,
    setTaskTitle,
    list,
    setItemTitle,
    createItem,
    toggleItem,
    saveTaskList,
    deleteItem,
    toggleAllItems,
    clearItemList,
  };
}
