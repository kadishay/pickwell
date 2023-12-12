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
          Lose 5 pounds
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-2"
          type="checkbox"
          variant="outline-primary"
          checked={checked[1]}
          value="2"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Lose 10 pounds
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-3"
          type="checkbox"
          variant="outline-primary"
          checked={checked[2]}
          value="3"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Lose 15 pounds
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
          Run 2 miles
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-5"
          type="checkbox"
          variant="outline-primary"
          checked={checked[4]}
          value="5"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Run 3 miles
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-6"
          type="checkbox"
          variant="outline-primary"
          checked={checked[5]}
          value="6"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Run 5 miles
        </ToggleButton>
        <br/>

        <ToggleButton
          className="mb-2"
          id="toggle-check-7"
          type="checkbox"
          variant="outline-primary"
          checked={checked[6]}
          value="7"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Start exercising
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-8"
          type="checkbox"
          variant="outline-primary"
          checked={checked[7]}
          value="8"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Exercise twice a week
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-9"
          type="checkbox"
          variant="outline-primary"
          checked={checked[8]}
          value="9"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Exercise three times a week
        </ToggleButton>
        <br/>

        <ToggleButton
          className="mb-2"
          id="toggle-check-10"
          type="checkbox"
          variant="outline-primary"
          checked={checked[9]}
          value="10"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Start Meditating
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check-11"
          type="checkbox"
          variant="outline-primary"
          checked={checked[10]}
          value="11"
          onChange={(e) => {checkItem(e.currentTarget)}}>
          Eat Healthy
        </ToggleButton>
        <br />

        <NavLink className="splash-button"> Set your calender </NavLink>
      </Container>
    </div>
  );
}

export default Goals;
