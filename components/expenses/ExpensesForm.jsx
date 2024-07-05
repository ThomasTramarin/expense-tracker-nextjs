"use client";
import { useContext } from "react";
import { useState } from "react";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";
import { GetCategoriesContext } from "../../contexts/GetCategoriesContext";
import { GetTransactionsContext } from "../../contexts/GetTransactionsContext";

export default function ExpensesForm() {
  const { setRefreshData: setExpensesRefreshData } = useContext(GetExpensesContext);
  const { setRefreshData: setCategoriesRefreshData } = useContext(GetCategoriesContext);
  const { setRefreshData: setTransactionsRefreshData } = useContext(GetTransactionsContext);

  const [expenseValues, setExpenseValues] = useState({
    title: "",
    amount: 0,
    type: "expense",
    category: "housing",
    date: "",
  });

  const [info, setInfo] = useState({
    message: "",
    type: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      expenseValues.title === "" ||
      expenseValues.amount === 0 ||
      expenseValues.category === "" ||
      expenseValues.date === ""
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
        body: JSON.stringify(expenseValues),
      });
      if (response.ok) {
        const result = await response.json();

        setInfo({
          message: result.message,
          type: "success",
        });

        setExpenseValues({
          title: "",
          amount: 0,
          type: "expense",
          category: "housing",
          date: "",
        });

        setExpensesRefreshData(true);
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
      <h2 className="text-white mb-4">Add new Expense</h2>
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
              setExpenseValues({ ...expenseValues, title: e.target.value })
            }
            value={expenseValues.title}
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="expense-amount" className="mb-1">
            Amount
          </label>
          <input
            type="number"
            name="expense-amount"
            id="expense-amount"
            onChange={(e) =>
              setExpenseValues({
                ...expenseValues,
                amount: Number(Math.abs(e.target.value).toFixed(2)),
              })
            }
            value={expenseValues.amount}
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="expense-category" className="mb-1">
            Category
          </label>
          <select
            name="expense-category"
            id="expense-category"
            onChange={(e) =>
              setExpenseValues({ ...expenseValues, category: e.target.value })
            }
            value={expenseValues.category}
          >
            <option value="housing">Housing</option>
            <option value="transportation">Transportation</option>
            <option value="food">Food</option>
            <option value="utilities">Utilities</option>
            <option value="healthcare">Healthcare</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="expense-date">Date</label>
          <input
            type="date"
            name="expense-date"
            id="expense-date"
            onChange={(e) =>
              setExpenseValues({ ...expenseValues, date: e.target.value })
            }
            value={expenseValues.date}
          />
          {info && (
            <span className={`${info.type === "success" ? "text-green-500" : "text-red-500"} mt-1 text-sm`}>{info.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-2 border rounded-md text-white font-medium border-gray-600 hover:border-[#27272A] hover:bg-[#27272A] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}