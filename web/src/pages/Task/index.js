import React from "react";

import { TaskProvider } from "./context/TaskContext";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const Task = () => {
  return (
    <>
      <TaskProvider>
        <TaskList />
        <TaskForm />
      </TaskProvider>
    </>
  );
};

export default Task;
