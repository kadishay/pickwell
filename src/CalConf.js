import './CalConf.css'; 

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { NavLink } from "react-router-dom";

function CalConf() {
  const [sun, setSun] = useState("secondary");
  const [mon, setMon] = useState("secondary");
  const [tue, setTue] = useState("secondary");
  const [wed, setWed] = useState("secondary");
  const [thu, setThu] = useState("secondary");
  const [fri, setFri] = useState("secondary");
  const [sat, setSat] = useState("secondary");

  function flip(button, buttonFunc) {
    if (button === "secondary") {
      buttonFunc("primary");
    } else {
      buttonFunc("secondary");
    }
  }

  return (
    <div className="CalConf">
      <Container className="p-3">
        Choose the days of the week for Pickwell to set your goals
        <br />
        <ButtonGroup aria-label="Basic example">
          <Button variant={sun} onClick={()=>{flip(sun, setSun)}}>Sunday</Button>
          <Button variant={mon} onClick={()=>{flip(mon, setMon)}}>Monday</Button>
          <Button variant={tue} onClick={()=>{flip(tue, setTue)}}>Tuesday</Button>
          <Button variant={wed} onClick={()=>{flip(wed, setWed)}}>Wednesday</Button>
          <Button variant={thu} onClick={()=>{flip(thu, setThu)}}>Thursday</Button>
          <Button variant={fri} onClick={()=>{flip(fri, setFri)}}>Friday</Button>
          <Button variant={sat} onClick={()=>{flip(sat, setSat)}}>Saturday</Button>
        </ButtonGroup>

        <br />
        <br />
        When do you start your day?
         <select id="start">
            <option value="5">5am</option>
            <option value="6">6am</option>
            <option value="7">7am</option>
            <option value="8" selected="selected">8am</option>
            <option value="9">9am</option>
            <option value="10">10am</option>
         </select>

        <br />
        <br />
        When do you finish your day?
        <select id="end">
            <option value="5">5pm</option>
            <option value="6" selected="selected">6pm</option>
            <option value="7">7pm</option>
            <option value="8">8pm</option>
            <option value="9">9pm</option>
            <option value="10">10pm</option>
            <option value="11">11pm</option>
         </select>

        <br />
        <br />
        <NavLink to="/cal" className="splash-button"> Generate Calendar </NavLink>
      </Container>
    </div>
  );
}

export default CalConf;
