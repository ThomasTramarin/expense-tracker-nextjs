"use client";
import { useContext, useState, useEffect } from "react";
import { GetCategoriesContext } from "../../contexts/GetCategoriesContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpensesCategoriesPie = () => {
  const { data, loading, error } = useContext(GetCategoriesContext);

  const [chartData, setChartData] = useState({
    labels: [
      "housing",
      "transportation",
      "food",
      "utilities",
      "healthcare",
      "entertainment",
      "education",
      "miscellaneous",
    ],
    datasets: [
      {
        label: "Expenses by category",
        data: [1, 1, 1, 1, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (!loading) {
      setChartData({
        labels: data.expenses.labels,
        datasets: [
          {
            label: "Expenses by category",
            data: data.expenses.values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [loading, data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return loading ? (
    <div className="w-full h-[400px] mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></div>
  ) : (
    <Pie data={chartData} options={options} />
  );
};
