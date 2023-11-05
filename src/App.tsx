import React from "react";
import "./App.css";
import { AccountCreator } from "./components/PrivateKeyCreator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AccountCreator />
      </header>
    </div>
  );
}

export default App;
