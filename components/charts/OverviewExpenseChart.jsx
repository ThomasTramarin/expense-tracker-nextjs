"use client";
import { useContext, useEffect, useState } from "react";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";

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

export const OverviewExpenseChart = () => {
  const { data, loading, error } = useContext(GetExpensesContext);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expense",
        data: [],
        fill: false,
        borderColor: "#ff0000",
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
              label: "Expense",
              data: [0, 0],
              fill: false,
              borderColor: "#ff0000",
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
                label: "Expense",
                data: [0, data.values[0]],
                fill: false,
                borderColor: "#ff0000",
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
                label: "Expense",
                data: data.values,
                fill: false,
                borderColor: "#ff0000",
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
