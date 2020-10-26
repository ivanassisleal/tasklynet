import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignIn from "../pages/SignIn";
import ProjectForm from "../pages/ProjectForm";
import ProjectList from "../pages/ProjectList";
import Task from "../pages/Task";
import Category from "../pages/Category";

export default function Routes() {
  return (
    <Switch>
      <Route component={SignIn} path="/" exact />
      <Route component={ProjectList} path="/projects" exact isPrivate />
      <Route component={ProjectForm} path="/projects/new" exact isPrivate />
      <Route
        component={ProjectForm}
        path="/projects/:id/edit"
        exact
        isPrivate
      />
      <Route component={Task} path="/tasks" exact isPrivate />
      <Route component={Category} path="/categories" exact isPrivate />
    </Switch>
  );
}
