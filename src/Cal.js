import './Cal.css'; 

import React, { useEffect } from 'react';
import { Scheduler, WeekView } from '@progress/kendo-react-scheduler';
import { sampleData, displayDate } from './events-utc';
import '@progress/kendo-theme-default/dist/all.css';

const resources = [
  {
    name: "Rooms",
    data: [
      {
        text: "Meeting Room 101",
        value: 1,
        color: "#5392E4",
      },
      {
        text: "Meeting Room 201",
        value: 2,
        color: "#FF7272",
      },
    ],
    field: "roomId",
    valueField: "value",
    textField: "text",
    colorField: "color",
  },
];

function Cal() {
  useEffect(() => {
    document.querySelectorAll(".k-nav-day").forEach((item)=>item.innerHTML = item.innerHTML.split(",")[0]);
  });

  return (
    <div className="Cal">
      <Scheduler data={sampleData} defaultDate={displayDate} view={"week"} editable={{
            add: false,
            remove: false,
            drag: true,
            resize: true,
            edit: true
        }}
        resources={resources}>
       <WeekView slotDivisions={1} workDayStart={"08:00"} workDayEnd={"20:00"}/>
     </Scheduler>
    </div>
  );
}

export default Cal;


