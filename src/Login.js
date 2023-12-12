import './Login.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import facebook from './facebook.png';
import google from './google.png';

function Login({setLogin}) {

  return (
    <div className="Login">
      
      <div className="Container">
        <div> Welcome to Pickwell. </div>
        <div> Please sign </div>
        <NavLink to="/splash" onClick={()=>{setLogin(true)}} className="Login-Button Google"> 
          <img src={google} alt="Logo" className="login-logo" />
          Sign in with Google 
        </NavLink>
        <NavLink to="/splash" oonClick={()=>{setLogin(true)}} className="Login-Button Facebook"> 
          <img src={facebook} alt="Logo" className="login-logo" />
          Sign in with Facebook 
        </NavLink>
      </div>

      <div className="Login-Legal"> Legal disclaimer... </div>
    </div>
  );
}

export default Login;
