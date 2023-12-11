import './Survey.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';

import { NavLink } from "react-router-dom";


const qna = [{
    title: "Questions 1",
    type: "single",
    content: "What are some of the challanges you face when trying ot eat healthlity?",
    info: null,
    answers: ["No access to ingridients","Lack of time or skills","I prefer the restaurant expiriance", "convenience", "I eat unhealthy or junk food"]
  },{
    title: null,
    type: "motivate",
    content: "Most users like you start their weeeks like this...",
    info: null,
    answers: null,
    image: "URL"
  },{
    title: "Questions 2",
    type: "multiple",
    content: "Do you have any medical conditions that require ongoing treatment or managment?",
    info: "(you can check more than one option)",
    answers: ["Diabetes", "Cholesterol", "Celiac", "Hypertention", "Gut Health", "Heart Conditions", "Stress", "Anxiety", "Depression", "Sleep", "N/A"]
  },{
    title: "Questions 3",
    type: "single",
    content: "Are you taking advatnage of your free time for self-care and well-being?",
    info: null,
    answers: ["I am overwhelmed and need more free time", "I am not devoting my free time preperly","I have time to take good care of myself", "I am desperate for free time"]
  },{
    title: "Questions 4",
    type: "single",
    content: "What's your preffered approach to personal development?",
    info: null,
    answers: ["Self guidance", "Online / Virtual", "In person coaching", "Working in Groups", "None of the above"]
  },{
    title: "Questions 5",
    type: "multiple",
    content: "Do you follow a specific type of diet?",
    info: "(you can check more than one option)",
    answers: ["Keto", "Vegan", "Vegeterian", "Suppliments", "Dairy Free", "Plant Based", "Low Sugar", "Hight Protein", "Nut Free", "Soy Free", "Heart Healthy"]
  },{
    title: "Questions 6",
    type: "single",
    content: "How important is price to you when making a purches",
    info: null,
    answers: ["Indifferent", "Not important", "Important", "Very Important"]
  }
]

function Survey() {
  const [level, setLevel] = useState(0);


  return (
    <div className="Survey">
      <Container className="p-3">
        <div>{qna[level].title}</div>
        <div>{qna[level].content}</div>
        <div className="survey-info">{qna[level].info}</div>
          {qna[level].answers ? qna[level].answers.map((text,id)=><div className="survey-answers"><input type="radio" name={qna[level].type === "single" ? "question" : "mutiple" + id} alue={id}/><label for={text}>{text}</label></div>) : ""}
        <ProgressBar animated now={Math.round(((level+1)/qna.length)*100)} label={`${Math.round(((level+1)/qna.length)*100)}%`} />
        {level !== qna.length - 1 ? <button onClick={()=>{setLevel(level+1)}} className="survey-skip"> Skip Questions </button> : "" }
        {level !== qna.length - 1 ? <div onClick={()=>{setLevel(level+1)}} className="survey-next survey-arrow"> → </div>  : "" }
        {level !== 0 ? <div onClick={()=>{setLevel(level-1)}} className="survey-prev survey-arrow"> ← </div> : ""}
        {level === qna.length - 1 ? <NavLink to="/vendor" className="splash-button"> Continue to Vendor Selection </NavLink>  : "" }
      </Container>
    </div>
  );
}

export default Survey;
