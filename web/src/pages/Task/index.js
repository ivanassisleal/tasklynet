import React from "react";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import { TaskProvider } from "../../hooks/TaskContext";

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
