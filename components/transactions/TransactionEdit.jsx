"use client";
import { useEffect, useState } from "react";

export default function TransactionEdit({
  editTransaction,
  setEditTransaction,
  data,
  setExpensesRefreshData,
  setIncomesRefreshData,
  setCategoriesRefreshData,
  setTransactionsRefreshData,
}) {
  const [transactionData, setTransactionData] = useState(
    data.find(
      (transaction) =>
        transaction.transactionID === editTransaction.transactionID
    )
  );

  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  useEffect(() => {
    setTransactionData({
      ...transactionData,
      transactionDate: transactionData.transactionDate.toLocaleString(
        "fr-CA",
        dateOptions
      ),
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/transactions?transactionID=${transactionData.transactionID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        }
      );

      if (response.ok) {
        setExpensesRefreshData(true);
        setIncomesRefreshData(true);
        setCategoriesRefreshData(true);
        setTransactionsRefreshData(true);

        setEditTransaction({ isOpen: false, transactionID: 0 });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute w-[95vw] p-2 border rounded-xl bg-[#161617] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-white mb-3">Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-8">
          <label htmlFor="edit-title" className="mb-1">
            Edit Title
          </label>
          <input
            type="text"
            id="edit-title"
            name="edit-title"
            value={transactionData.title}
            onChange={(e) =>
              setTransactionData({ ...transactionData, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="edit-amount" className="mb-1">
            Edit Amount
          </label>
          <input
            type="number"
            id="edit-amount"
            name="edit-amount"
            value={transactionData.amount}
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                amount: Number(Math.abs(e.target.value).toFixed(2)),
              })
            }
          />
        </div>
        <div className="mb-8 flex gap-3">
          <div>
            <input
              type="radio"
              name="transactions-type"
              id="only-incomes"
              checked={transactionData.type === "income"}
              onChange={() => {
                setTransactionData({ ...transactionData, type: "income", category: "salary" })
              }}
              value="only-incomes"
              className="hidden peer"
            />
            <label
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter")
                  setTransactionData({ ...transactionData, type: "income", category: "salary" });
              }}
              htmlFor="only-incomes"
              className="text-sm text-white border peer-checked:border-blue-600 peer-checked:bg-[#22203a] border-slate-500 px-3 py-1 rounded-full cursor-pointer"
              tabIndex="0"
            >
              Income
            </label>
          </div>

          <div>
            <input
              type="radio"
              name="transactions-type"
              id="only-expenses"
              checked={transactionData.type === "expense"}
              onChange={() =>
                setTransactionData({ ...transactionData, type: "expense", category: "miscellaneous" })
              }
              value="only-expenses"
              className="hidden peer"
            />
            <label
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter")
                  setTransactionData({ ...transactionData, type: "expense", category: "miscellaneous" });
              }}
              htmlFor="only-expenses"
              className="text-sm text-white border peer-checked:border-blue-600 peer-checked:bg-[#22203a] border-slate-500 px-3 py-1 rounded-full cursor-pointer"
              tabIndex="0"
            >
              Expense
            </label>
          </div>
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="edit-category" className="mb-1">
            Edit Category
          </label>
          {transactionData.type === "income" ? (
            <select
              name="edit-category"
              id="edit-category"
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  category: e.target.value,
                })
              }
              value={transactionData.category}
            >
              <option value="salary">Salary</option>
              <option value="bonus">Bonus</option>
              <option value="bank-interests">Bank interests</option>
              <option value="rental-income">Rental income</option>
              <option value="gifts-and-donations">Gifts and donations</option>
            </select>
          ) : (
            <select
              name="edit-category"
              id="edit-category"
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  category: e.target.value,
                })
              }
              value={transactionData.category}
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
          )}
        </div>
        <div className="flex flex-col mb-8">
          <label htmlFor="edit-date" className="mb-1">
            Edit Date
          </label>
          <input
            type="date"
            id="edit-date"
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                transactionDate: e.target.value,
              })
            }
            value={transactionData.transactionDate}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="submit"
            value="Update Transaction"
            className="px-3 py-2 border rounded-md text-white font-medium border-gray-600 hover:border-[#27272A] hover:bg-[#27272A] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          />
          <button
            className="px-3 py-2 border rounded-md text-white font-medium border-gray-600 hover:border-[#27272A] hover:bg-[#27272A] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            onClick={() =>
              setEditTransaction({ ...editTransaction, isOpen: false })
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
