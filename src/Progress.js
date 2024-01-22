import './Progress.css'; 

import React from 'react';
import GaugeChart from 'react-gauge-chart'
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

function Progress({setLogin}) {
  const chartStyle = {
    height: 150,
    width:200 
  }
  setLogin(true);
  return (
    <div className="Progress">
      <div className="gauge-container">
        <div className="gauge-box">
          <GaugeChart 
            nrOfLevels={3} 
            arcWidth={0.2} 
            percent={0.27} 
            colors={['#EA4228', '#F5CD19', '#5BE12C' ]}
            style={chartStyle}
          />
          <div className="gauge-box-text">
            Physical Exercise
          </div>
        </div>
        <div className="gauge-box">
          <GaugeChart  
            nrOfLevels={3} 
            arcWidth={0.2} 
            percent={0.12} 
            colors={['#EA4228', '#F5CD19', '#5BE12C' ]}
            style={chartStyle}
          />
          <div className="gauge-box-text">
            Sleep
          </div>
        </div>
        <div className="gauge-box">
          <GaugeChart 
            nrOfLevels={3} 
            arcWidth={0.2} 
            percent={0.54} 
            colors={['#EA4228', '#F5CD19', '#5BE12C' ]}
            style={chartStyle}
          />
          <div className="gauge-box-text">
            Weigth
          </div>
        </div>
        <div className="gauge-box">
          <GaugeChart  
            nrOfLevels={3} 
            arcWidth={0.2} 
            percent={0.84} 
            colors={['#EA4228', '#F5CD19', '#5BE12C' ]}
            style={chartStyle}
          />
          <div className="gauge-box-text">
            Healthy Eating
          </div>
        </div>
        <div className="gauge-box">
          <GaugeChart  
            nrOfLevels={3} 
            arcWidth={0.2} 
            percent={0.95} 
            colors={['#EA4228', '#F5CD19', '#5BE12C' ]}
            style={chartStyle}
          />
          <div className="gauge-box-text">
            Mental Exercise
          </div>
        </div>
      </div>

      <div className="pie-container">
        <div className="pie-box">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 34 },
                  { id: 1, value: 12 },
                ],
              },
            ]}
            width={250}
            height={150}
          />
          Overall weekly tasks completed
        </div>
        <div className="pie-box">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 16 },
                  { id: 1, value: 31 },
                ],
              },
            ]}
            width={250}
            height={150}
          />
          Weekly goals to be completed
        </div>

        <div className="pie-box">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 13 },
                  { id: 1, value: 15 },
                ],
              },
            ]}
            width={250}
            height={150}
          />
          Paied services currently in use
        </div>
        <div className="pie-box">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 18 },
                  { id: 1, value: 28 },
                ],
              },
            ]}
            width={250}
            height={150}
          />
          Commitment to calendar
        </div>
      </div>

      <div className="gauge-container">
        <div className="gauge-box">
          <GaugeChart 
            nrOfLevels={3} 
            arcWidth={0.2} 
            percent={0.47} 
            colors={['#EA4228', '#F5CD19', '#5BE12C' ]}
            style={chartStyle}
          />
          <div className="gauge-box-text">
            Weekly Usage
          </div>
        </div>
        <div className="gauge-box">
          <GaugeChart  
            nrOfLevels={3} 
            arcWidth={0.2} 
            percent={0.82} 
            colors={['#EA4228', '#F5CD19', '#5BE12C' ]}
            style={chartStyle}
          />
          <div className="gauge-box-text">
            Cost Per Week
          </div>
        </div>
      </div>

      Last month activities
      <div className="line-container">
        <LineChart
          series={[
            {
              data: [2, 5, 2, 4, 1, 3, 0, 0, 2, 1, 3, 4, 2, 0, 3, 2, 5, 2, 4, 1, 3, 0, 0, 2, 1, 3, 4, 2, 0, 3, 2],
              showMark: false,
            },
          ]}
          width={500}
          height={300}
        />
      </div>

    </div>
  );
}

export default Progress;
