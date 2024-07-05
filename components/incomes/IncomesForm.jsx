"use client";
import { useContext } from "react";
import { useState } from "react";
import { GetIncomesContext } from "../../contexts/GetIncomesContext";
import { GetCategoriesContext } from "../../contexts/GetCategoriesContext";
import { GetTransactionsContext } from "../../contexts/GetTransactionsContext";

export default function IncomesForm() {
  const { setRefreshData: setIncomesRefreshData } = useContext(GetIncomesContext);
  const { setRefreshData: setCategoriesRefreshData } = useContext(GetCategoriesContext);
  const { setRefreshData: setTransactionsRefreshData } = useContext(GetTransactionsContext);

  const [incomeValues, setIncomeValues] = useState({
    title: "",
    amount: 0,
    type: "income",
    category: "salary",
    date: "",
  });

  const [info, setInfo] = useState({
    message: "",
    type: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      incomeValues.title === "" ||
      incomeValues.amount === 0 ||
      incomeValues.category === "" ||
      incomeValues.date === ""
    ) {
      setInfo({
        message: "All fields are required",
        type: "error",
      });
      return;
    }else{
        setInfo({
            message: "",
            type: "",
        });
    }

    try {
      const response = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeValues),
      });
      if (response.ok) {
        const result = await response.json();

        setInfo({
          message: result.message,
          type: "success",
        });

        setIncomeValues({
          title: "",
          amount: 0,
          type: "income",
          category: "salary",
          date: "",
        });

        setIncomesRefreshData(true);
        setCategoriesRefreshData(true);
        setTransactionsRefreshData(true);
      } else {
        setInfo({
            message: "Failed to add income",
            type: "error",
          });
      }
    } catch (err) {
        setInfo({
            message: "An error occurred while adding income",
            type: "error",
          })
    }
  };

  return (
    <div className="p-4 bg-[#161617] rounded-lg">
      <h2 className="text-white mb-4">Add new Income</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-8">
          <label htmlFor="title" className="mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            maxLength={30}
            onChange={(e) =>
              setIncomeValues({ ...incomeValues, title: e.target.value })
            }
            value={incomeValues.title}
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="income-amount" className="mb-1">
            Amount
          </label>
          <input
            type="number"
            name="income-amount"
            id="income-amount"
            onChange={(e) =>
              setIncomeValues({
                ...incomeValues,
                amount: Number(Math.abs(e.target.value).toFixed(2)),
              })
            }
            value={incomeValues.amount}
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="income-category" className="mb-1">
            Category
          </label>
          <select
            name="income-category"
            id="income-category"
            onChange={(e) =>
              setIncomeValues({ ...incomeValues, category: e.target.value })
            }
            value={incomeValues.category}
          >
            <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="bank-interests">Bank interests</option>
            <option value="rental-income">Rental income</option>
            <option value="gifts-and-donations">Gifts and donations</option>
          </select>
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="income-date">Date</label>
          <input
            type="date"
            name="income-date"
            id="income-date"
            onChange={(e) =>
              setIncomeValues({ ...incomeValues, date: e.target.value })
            }
            value={incomeValues.date}
          />
          {info && (
            <span className={`${info.type === "success" ? "text-green-500" : "text-red-500"} mt-1 text-sm`}>{info.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-2 border rounded-md text-white font-medium border-gray-600 hover:border-[#27272A] hover:bg-[#27272A] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          Add Income
        </button>
      </form>
    </div>
  );
}