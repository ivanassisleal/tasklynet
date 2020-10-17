import React from "react";
import { Router } from "react-router-dom";

import { ApplicationProvider } from "./hooks/ApplicationContext";
import history from "./services/history";
import Routes from "./routes";
import { AuthProvider } from "./hooks/AuthContext";

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
