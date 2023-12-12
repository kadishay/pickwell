import './App.css';
import logo from './logo.png';

import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Login from './Login';
import Survey from './Survey';
import Splash from './Splash';
import Vendor from './Vendor';
import Goals from './Goals';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" className="header-logo" />
        {login ? 
          <span>
            <span className="header-button">Explore</span>
            <span className="header-button">My Progress</span>
            <span className="header-button">My Calendar</span>
          </span> 
          :""}
      </div>
      <Router>
        <Routes>
            <Route exact path="/" element={<Login setLogin={setLogin}/>} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/goals" element={<Goals />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
