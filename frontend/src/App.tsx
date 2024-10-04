import React from 'react';
import icon from './assets/img/ib_icon.png';
import './App.css';
import Home from './pages/Home';
import Board from './pages/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={icon} className="App-logo" alt="logo" />
        <Home/>
        <Board/>
      </header>
    </div>
  );
}

export default App;
