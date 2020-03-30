import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          这是在 <code>src/App.js</code> 里修改的.
        </p>
        <a>
          Hello React!!!
        </a>
      </header>
    </div>
  );
}

export default App;
