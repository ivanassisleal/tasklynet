import React, { createContext, useState, useCallback, useContext } from "react";

const initialState = {
  drawerOpen: true,
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

// hook

const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplication must be used within an ApplicationProvider"
    );
  }

  return context;
};

export { ApplicationProvider, useApplication };
