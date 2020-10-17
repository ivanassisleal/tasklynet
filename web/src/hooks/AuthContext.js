import React, { createContext, useState, useCallback, useContext } from "react";

import api from "../services/api";

import history from "../services/history";

const initialState = {
  authenticate: false,
  authenticateToken: "",
  user: {},
};

// Context

const AuthContext = createContext({});

// Provider

const AuthProvider = ({ children }) => {
  // states
  const [state, setState] = useState((initialState) => {
    const token = localStorage.getItem("@ProjectSample:token");

    if (token) {
      api.defaults.headers.Authorization = `bearer ${token}`;

      return {
        ...initialState,
        authenticateToken: token,
        authenticate: !!token,
      };
    }

    return { ...initialState };
  });

  // functions
  const signIn = useCallback(async (token) => {
    api.defaults.headers.Authorization = `bearer ${token}`;

    setState({
      ...state,
      authenticate: true,
      authenticateToken: token,
    });

    localStorage.setItem("@ProjectSample:token", token);

    history.push("/projects");
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@ProjectSample:token");
    setState(initialState);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, state }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
