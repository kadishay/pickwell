import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Multiselect from 'multiselect-react-dropdown';

function App() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedServiceProviders, setSelectedServiceProviders] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://o33i0hj6u9.execute-api.us-east-1.amazonaws.com/service-providers'
    }).then(function (response) {
      console.log('set service providers');
      setServiceProviders(response.data.map((item)=>({name:item.name,id:item.name})));
    });
  },[]);

  function onSelectServiceProvider(val) {
    console.log('select service provider');
    setSelectedServiceProviders(val);
  }
  function onRemoveServiceProvider(val) {
    console.log('remove service provider');
    setSelectedServiceProviders(val);
    console.log(selectedServiceProviders.length);
  }

  return (
    <div className="App">
      <div className="SubTitle"> Please select your memberships: </div>
      <Multiselect
        options={serviceProviders} 
        onSelect={onSelectServiceProvider} 
        onRemove={onRemoveServiceProvider}
        className={'ProvidersMultiSelect'}
        displayValue="name" 
        />
      {(selectedServiceProviders.length) ? "yes":"no"}
    </div>
  );
}

export default App;
