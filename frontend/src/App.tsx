import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import './css/styles.css';
import './css/custom.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import About from './pages/About';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
      <div className="App flex-shrink-0">
        <NavBar/>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/:boardId" element={<BoardPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
        <Footer/>
      </div>
  );
}

export default App;
