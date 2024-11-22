import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./chart.css"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
  } from "chart.js";
  
  ChartJS.register(
    ArcElement, 
    Tooltip,  
    Legend,    
    CategoryScale, 
    LinearScale,  
    BarElement    
  );
const UserCharts = ({ users }) => {
  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [
          users.filter(user => user.gender === "male").length,
          users.filter(user => user.gender === "female").length,
        ],
        backgroundColor: ["blue", "pink"],
      },
    ],
  };

  const ageData = {
    labels: ["10-19", "20-29", "30-39", "40+"], 
    datasets: [
      {
        data: [
          users.filter(user => user.dob.age >= 10 && user.dob.age <= 19).length,
          users.filter(user => user.dob.age >= 20 && user.dob.age <= 29).length,
          users.filter(user => user.dob.age >= 30 && user.dob.age <= 39).length,
          users.filter(user => user.dob.age >= 40).length,
        ],
        backgroundColor: ["green", "yellow", "orange", "red"], 
      },
    ],
  };

  const uniqueRegions = Array.from(new Set(users.map(user => user.location.state)));
  const regionData = {
    labels: uniqueRegions,
    datasets: [
      {
        data: uniqueRegions.map(
          state => users.filter(user => user.location.state === state).length
        ),
        backgroundColor: ["purple", "cyan", "lime", "gold"],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Gender Distribution</h2>
      <Pie
        data={genderData}
        options={{
          plugins: {
            legend: {
              display: true,
            },
          },
          cutout: 0, 
          elements: {
            arc: {
              borderWidth: 0, 
            },
          },
        }}
      />

      <h2>Age Distribution</h2>
      <Bar
        data={ageData}
        options={{
          plugins: {
            legend: {
              display: false, 
            },
          },
        }}
      />

      <h2>Region Distribution</h2>
      <Bar
        data={regionData}
        options={{
          plugins: {
            legend: {
              display: false, 
            },
          },
        }}
      />
    </div>
  );
};

export default UserCharts;
