import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";

import LayoutPrivate from "../layouts/Private";
import LayoutPublic from "../layouts/Public";

import { AuthContext } from "../contexts/AuthContext";

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const authContext = useContext(AuthContext);

  const { authenticate } = authContext.state;

  if (!authenticate && isPrivate) {
    return <Redirect to="/" />;
  } else if (authenticate && !isPrivate) {
    return <Redirect to="/projects" />;
  }

  const Layout = authenticate ? LayoutPrivate : LayoutPublic;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
