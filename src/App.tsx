import React from 'react';
import './App.css';
import { TrancHandler } from './components/TrancHandler';
import { AccountCreator } from './components/PrivateKeyCreator';
import { SendMoney } from './components/SendMoney';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <AccountCreator/>
      <TrancHandler />
      </header>
    </div>
  );
}

export default App;
