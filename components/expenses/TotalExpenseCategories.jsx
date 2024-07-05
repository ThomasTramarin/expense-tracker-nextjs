"use client"
import { useContext } from "react";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";
import { ExpensesCategoriesPie } from "../../components/charts/ExpensesCategoriesPie";

export default function TotalExpenseCategories() {
  const { data, loading, error} = useContext(GetExpensesContext);

  if (error) console.log(error);

  const sumAllExpense = ()=>{
    if (data.values.length === 0){
      return 0;
    }else{
      return data.values.reduce((total, num) => total + num, 0)
    }
  }

  return (
    <div className="bg-[#161617] rounded-md p-4 w-full flex flex-wrap">
    <div className="w-full sm:w-1/4 mb-2 sm:mb-0 sm:pr-4">
      <h2 className="text-light-gray">Total Expense</h2>
      {loading ? <p className="h-6 w-28 mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></p> : <p className="text-2xl">{`${sumAllExpense()} $`}</p>}
    </div>

    <div className="w-full sm:w-3/4 flex justify-center items-center">
      <ExpensesCategoriesPie/>
    </div>
  </div>
  );
}
