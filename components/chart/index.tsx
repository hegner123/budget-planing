import { useCallback, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function Chart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Budget Forecasting",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Balance",

        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(255, 255, 255)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div className="col-span-6 col-start-4 min-h-[100vh]">
      <Line options={options} data={data} />
    </div>
  );
}
