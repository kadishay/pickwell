import './App.css';

import Header from './Header';

import React, { useState, useEffect } from 'react';


function App() {
  const [login, setLogins] = useState(false);

  return (
    <div className="App">
      <Header login={login} />

      <main>

      </main>
    </div>
  );
}

export default App;
