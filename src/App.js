import './App.css';
import logo from './logo.png';

import React/*, { useState, useEffect }*/ from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Login from './Login';
import Survey from './Survey';
import Splash from './Splash';
import Vendor from './Vendor';


function App() {
  //const [login, setLogins] = useState(false);

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" className="header-logo" />
      </div>
      <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/vendor" element={<Vendor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
