import './Header.css';
import logo from './logo.png';

import React, { useState, useEffect } from 'react';

let serviceProvidersMap = {};

function Header({ login }) {
  const [serviceProviders, setServiceProviders] = useState([]);

  console.log(login);

  return (
    <div className="Header">
      <img src={logo} alt="Logo" className="header-logo" />
      {login}
    </div>
  );
}

export default Header;
