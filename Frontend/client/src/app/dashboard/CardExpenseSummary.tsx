"use client";

import React from "react";
import { Pie as ChartJSPie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CardExpenseSummary = () => {
  // Data for the Condition Value Distribution Pie Chart
  const conditionData = {
    labels: ["Good", "Average", "Poor"], // Replace with actual condition labels
    datasets: [
      {
        data: [300, 200, 100], // Replace with dynamic values
        backgroundColor: ["#3b82f6", "#a855f7", "#ef4444"],
        hoverBackgroundColor: ["#60a5fa", "#c084fc", "#f87171"],
      },
    ],
  };

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between p-6 " style={{ height: '450px' }}>
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-center">
          Condition Value Distribution
        </h2>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex justify-center items-center py-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow w-full max-w-md">
          <ChartJSPie data={conditionData} />
        </div>
      </div>
    </div>
  );
};

export default CardExpenseSummary;