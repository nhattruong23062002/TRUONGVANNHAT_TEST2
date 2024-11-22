import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/page3';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  end
                >
                  Page 1
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/page2" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Page 2
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/page3" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Page 3
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3  />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
