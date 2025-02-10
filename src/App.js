import React from "react";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <Home />
      </div>
    </UserProvider>
  );
};

export default App;
