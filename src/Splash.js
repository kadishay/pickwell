import React from 'react';
import './Splash.css';

import { NavLink } from "react-router-dom";

function Splash() {

  return (
    <div className="Splash">
      <div className="Container">
        <div>XXXXX, Welcome to Pickwell </div>
        <div> We want to get to know you better before we can help you change your life. Let's start with a few basic questions about your current lifestyle and prefrences </div>
      </div>

      <NavLink to="/survey" className="splash-button">
        Start here button 
      </NavLink>
    </div>
  );
}

export default Splash;
