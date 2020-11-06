import React, { createContext, useState } from "react";

// Context
const TaskContext = createContext({});

// Provider
const TaskProvider = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [changeList, setChangeList] = useState(false);

  const setListHasChange = () => {
    setChangeList(!changeList);
  };

  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        isOpenModal,
        changeList,
        setSelectedTask,
        setIsOpenModal,
        setListHasChange,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
