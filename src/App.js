import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Multiselect from 'multiselect-react-dropdown';

function App() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedServiceProviders, setSelectedServiceProviders] = useState([]);

  const [memberships, setMemberships] = useState([]);
  const [selectedMemberships, setSelectedMemberships] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://o33i0hj6u9.execute-api.us-east-1.amazonaws.com/service-providers'
    }).then(function (response) {
      setServiceProviders(response.data.map((item)=>({name:item.name,id:item.id})));
    });
  },[]);

  useEffect(() => {
    //fetch and filter membership types
    axios({
      method: 'get',
      url: '  https://i0gdxxru61.execute-api.us-east-1.amazonaws.com/membership-types'
    }).then(function (response) {
      setMemberships(response.data
                        .filter((item)=>selectedServiceProviders.includes(item.providerId))
                        .map(item=>({name:item.membershipName,id:item.id})));
    });
  },[selectedServiceProviders]);

  function changeSelectedProviders(val) {
    setSelectedServiceProviders(val.map(item=>item.id));
  }

  function changeSelectedMemberships(val) {
    console.log(val);
  }

  return (
    <div className="App">
      <div className="ProvidersTitle"> Please select your providers: </div>
      <Multiselect
        options={serviceProviders} 
        onSelect={changeSelectedProviders} 
        onRemove={changeSelectedProviders}
        className={'ProvidersMultiSelect'}
        displayValue="name" 
        />
        {selectedServiceProviders.length?
          <div>
            <div className="MembershipsTitle"> Please select your memberships: </div>
            <Multiselect
              options={memberships} 
              onSelect={changeSelectedMemberships} 
              onRemove={changeSelectedMemberships}
              className={'ProvidersMultiSelect'}
              displayValue="name" 
              />
          </div>
          :""}
        {selectedMemberships.length?"yup":"na"}
    </div>
  );
}

export default App;
