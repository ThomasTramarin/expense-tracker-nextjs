"use client";
import { useContext, useEffect, useState } from "react";
import { GetIncomesContext } from "../../contexts/GetIncomesContext";

import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const OverviewIncomeChart = () => {
  const { data, loading, error } = useContext(GetIncomesContext);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        fill: false,
        borderColor: "#00ff00",
        tension: 0.5,
        pointRadius: 0,
      },
    ],
  });

  useEffect(() => {
    if (!loading) {
      if(data.values.lenght === 0 || data.labels.length === 0){
        setChartData({
          labels: ["none", "none"],
          datasets: [
            {
              label: "Income",
              data: [0, 0],
              fill: false,
              borderColor: "#00ff00",
              tension: 0.5,
              pointRadius: 0,
            },
          ],
        });
      }else{
        if(data.values.lenght === 1 || data.labels.length === 1){
          setChartData({
            labels: ["none", data.labels[0]],
            datasets: [
              {
                label: "Income",
                data: [0, data.values[0]],
                fill: false,
                borderColor: "#00ff00",
                tension: 0.5,
                pointRadius: 0,
              },
            ],
          });
        }else{
          setChartData({
            labels: data.labels,
            datasets: [
              {
                label: "Income",
                data: data.values,
                fill: false,
                borderColor: "#00ff00",
                tension: 0.5,
                pointRadius: 0,
              },
            ],
          });
        }
        }
      }
      
    }, [loading, data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        beginAtZero: false,
      },
    },
  };

  return loading ? (
    <div className="w-full h-[150px] mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></div>
  ) : (
    <Line data={chartData} options={options} />
  );
};
