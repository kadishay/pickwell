import './Goals.css'; 

import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { NavLink } from "react-router-dom";

function Goals() {
  const [checked, setChecked] = useState([false,false,false,false,false,false,false,false,false,false,false]);

  function checkItem(target) {
    var currentStatus = [...checked];
    currentStatus[target.value-1] = target.checked;
    setChecked(currentStatus);
  }

  return (
    <div className="Goals">
      <Container className="p-3">
        <div  className="goals-header">Select at least one goal</div>

        <ToggleButton
          className="mb-2"
          id="toggle-check-1"
          type="checkbox"
          variant="outline-primary"
          checked={checked[0]}
          value="1"
          onChange={(e) => {checkItem(e.currentTarget)}}>
            Improve quality and consistent sleep of 7-8 hours each night
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-2"
          type="checkbox"
          variant="outline-primary"
          checked={checked[1]}
          value="2"
          onChange={(e) => {checkItem(e.currentTarget)}}>
            Mindfulness and gratitude 5 times a day
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-3"
          type="checkbox"
          variant="outline-primary"
          checked={checked[2]}
          value="3"
          onChange={(e) => {checkItem(e.currentTarget)}}>
            Lose 10 pounds within 2-3 month
        </ToggleButton>
        <br/>

        <ToggleButton
          className="mb-2"
          id="toggle-check-4"
          type="checkbox"
          variant="outline-primary"
          checked={checked[3]}
          value="4"
          onChange={(e) => {checkItem(e.currentTarget)}}>
            Incorporate strength training and exercises into routines twice a week
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-5"
          type="checkbox"
          variant="outline-primary"
          checked={checked[4]}
          value="5"
          onChange={(e) => {checkItem(e.currentTarget)}}>
            Attend a fitness class or go for a run three times a week 
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-6"
          type="checkbox"
          variant="outline-primary"
          checked={checked[5]}
          value="6"
          onChange={(e) => {checkItem(e.currentTarget)}}>
            Run 3 -5 miles twice a weeks within 2 month  
        </ToggleButton>
        <br/>

        <NavLink to="/conf" className="splash-button"> Set your calender </NavLink>
      </Container>
    </div>
  );
}

export default Goals;
