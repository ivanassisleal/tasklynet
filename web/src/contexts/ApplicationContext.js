import React, { createContext, useState, useCallback } from "react";

const initialState = {
  drawerOpen: true,
  title: "",
};

// Context
const ApplicationContext = createContext({});

// Provider
const ApplicationProvider = ({ children }) => {
  // states
  const [state, setState] = useState(initialState);

  // functions
  const handleDrawerOpen = useCallback(() => {
    setState({ ...state, drawerOpen: true });
  }, []);

  const handleDrawerClose = useCallback(() => {
    setState({ ...state, drawerOpen: false });
  }, []);

  return (
    <ApplicationContext.Provider
      value={{ state, handleDrawerOpen, handleDrawerClose }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationProvider, ApplicationContext };
