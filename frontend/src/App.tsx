import React, { useEffect } from 'react';
import icon from './assets/img/ib_icon.png';
import './App.css';
import './css/styles.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Board from './pages/Board';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="App">
      <NavBar/>
      <img src={icon} className="App-logo" alt="logo" />
      <Home/>
      <Board/>
    </div>
  );
}

export default App;
