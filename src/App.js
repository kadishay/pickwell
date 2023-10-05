import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';


function App() {
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {

    fetch('https://o33i0hj6u9.execute-api.us-east-1.amazonaws.com/service-providers', {
      method: "GET",
      mode: 'no-cors'
    }).then((response)=>{
      console.log(response);
      response.text().then((data) => {
        console.log("data:" + data);
      });
    })
    .catch((err)=>console.log(err))


    /*.then((response,a) => {
      console.log(response, a);
      setServiceProviders(JSON.stringify(response));
      });//response.json()).then((json) => console.log(json));
    */
  });

  return (
    <div className="App">
      {serviceProviders}

      Hi There
    </div>
  );
}

export default App;
