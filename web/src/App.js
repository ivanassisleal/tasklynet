import React from "react";
import { Router } from "react-router-dom";

import { ApplicationProvider } from "./contexts/ApplicationContext";
import { AuthProvider } from "./contexts/AuthContext";

import history from "./services/history";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <ApplicationProvider>
          <Routes />
        </ApplicationProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
