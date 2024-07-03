import { useContext, useEffect, useState } from "react";
import { GetIncomesContext } from "../../contexts/GetIncomesContext";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const OverviewBalanceChart = () => {
  const { data: incomeData, loading: incomeLoading, error: incomeError } = useContext(GetIncomesContext);
  const { data: expenseData, loading: expenseLoading, error: expenseError } = useContext(GetExpensesContext);

  const [chartData, setChartData] = useState({
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Income",
        data: [0],
        backgroundColor: "#00ff00",
        hoverBackgroundColor: "#18d918",
        barThickness: 50,
      },
      {
        label: "Expenses",
        data: [0],
        backgroundColor: "#ff0000",
        hoverBackgroundColor: "#e61717",
        barThickness: 50,
      },
    ],
  });

  useEffect(() => {
    if (!incomeLoading && !expenseLoading) {
      setChartData({
        labels: ["Income", "Expense"],
        datasets: [
          {
            label: "Income",
            data: [calculateTotal(incomeData.values)],
            backgroundColor: "#00ff00",
            hoverBackgroundColor: "#18d918",
            barThickness: 50,
          },
          {
            label: "Expense",
            data: [calculateTotal(expenseData.values)],
            backgroundColor: "#ff0000",
            hoverBackgroundColor: "#e61717",
            barThickness: 50,
          },
        ],
      });
    }
  }, [incomeLoading, expenseLoading, incomeData, expenseData]);

  const calculateTotal = (values) => {
    return values.reduce((total, num) => total + num, 0);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: false,
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + " $";
          },
        },
      },
    },
  };
  return incomeLoading && expenseLoading ? (
    <div className="w-full h-[150px] mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></div>
  ) : (
    <Bar data={chartData} options={options} />
  );
};
