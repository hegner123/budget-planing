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
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";

export default function Chart({ forecastData, x, y, title }) {
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
        text: title,
      },
    },
  };

  const data = {
    labels: forecastData.map((item) => dayjs(item.date).format("MM/DD")),
    datasets: [
      {
        label: "Balance",
        data: forecastData.map((item) => item.balance),
        fill: false,
        borderColor: "rgb(0, 0, 0)",
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
