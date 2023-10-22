import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Multiselect from 'multiselect-react-dropdown';

import Cal from './Cal';
import FormDialog from './FormDialog'

/*form and time*/
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimeField } from '@mui/x-date-pickers/TimeField';
/*form and time*/

let serviceProvidersMap = {};

function App() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedServiceProviders, setSelectedServiceProviders] = useState([]);

  const [memberships, setMemberships] = useState([]);
  const [selectedMemberships, setSelectedMemberships] = useState([]);

  const [services, setServices] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://o33i0hj6u9.execute-api.us-east-1.amazonaws.com/service-providers'
    }).then(function (response) {
      response.data.forEach((provider)=>{
        serviceProvidersMap[provider.id] = provider.name;
      });
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

  useEffect(() => {
    //fetch and filter membership types
    axios({
      method: 'get',
      url: 'https://frdsi5b0x9.execute-api.us-east-1.amazonaws.com/services'
    }).then(function (response) {
      let availbleServices = response.data.filter((service)=>{
        if (service.requiredMembership[0]==="[") {
          var clean = service.requiredMembership.substring(1,service.requiredMembership.length-1);
          var obj = clean.split(",");
          return obj.some((requiredMembership)=>selectedMemberships.includes(requiredMembership));
        } else {
          return selectedMemberships.includes(service.requiredMembership)
        }
        
      });
      setServices(availbleServices);
    });
  },[selectedMemberships]);

  function changeSelectedProviders(val) {
    setSelectedServiceProviders(val.map(item=>item.id));
  }

  function changeSelectedMemberships(val) {
    setSelectedMemberships(val.map(item=>item.id));
  }


  /*form*/
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [currentTitle, setCurrentTitle] = React.useState(null);
  const [currentDuration, setCurrentDuration] = React.useState(null);

  const handleClickOpen = (a) => {
    setCurrentTitle(a.target.parentElement.querySelectorAll("div")[0].innerText + " - " + a.target.parentElement.querySelectorAll("div")[1].innerText);
    setCurrentDuration((a.target.parentElement.querySelectorAll("div")[2].innerText.split(" ")[0]));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (a) => {
    setOpen(false);
    const start = dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(time).format('HH:mm:00Z');
    const end = dayjs(date).format('YYYY-MM-DD') + "T" + dayjs(time).add(currentDuration, 'minute').format('HH:mm:00Z');
    Cal.createCalEvent(currentTitle, null, null, start, end);
  };
  /*form*/

  return (
    <div className="App">
      <button onClick={Cal.handleAuthClick}> Auth</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            When?
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            value={date}
            onChange={setDate}
            defaultValue={dayjs()} />
          <TimeField 
            value={time}
            onChange={setTime}
            defaultValue={dayjs()} />
        </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>

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
        {selectedMemberships.length ?
          <div>
            <div className="ServicesTitle"> Your services: </div>
            <div className="ServicesContainer">
              {services.map(item=>
                <div className="ServiceTag" key={item.id} onClick={handleClickOpen}>
                  <div> {serviceProvidersMap[item.serviceProviderId]} </div>
                  <div> {item.serviceName} </div>
                  <div> {item.totalDuration} </div>
                </div>)}
            </div>
          </div>
          :""}
    </div>
  );
}

export default App;
