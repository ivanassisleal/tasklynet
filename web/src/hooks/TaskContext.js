import React, { createContext, useState, useCallback, useContext } from "react";

const initialState = {
  formModal: false,
  selectedTask: null,
  refreshList: false,
};

// Context
const TaskContext = createContext({});

// Provider
const TaskProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const openModalForm = () => {
    setState({ ...state, formModal: true });
  };

  const closeModalForm = () => {
    setState({ ...state, formModal: false });
  };

  const setSelectedRecord = (row) => {
    setState({ ...state, selectedTask: row });
  };

  const setRefreshList = (row) => {
    setState({ ...state, refreshList: !state.refreshList });
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        openModalForm,
        closeModalForm,
        setSelectedRecord,
        setRefreshList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// hook
const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error(
      "useApplication must be used within an ApplicationProvider"
    );
  }

  return context;
};

export { TaskProvider, useTask };
