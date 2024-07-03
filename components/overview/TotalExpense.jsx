"use client"
import { useContext } from "react";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";
import { OverviewExpenseChart } from "../charts/OverviewExpenseChart";

export default function TotalExpense() {
    const { data, loading, error} = useContext(GetExpensesContext);

  if (error) return <p>Error: {error.message}</p>;

  const sumAllExpense = ()=>{
    if (data.values.length === 0){
      return 0;
    }else{
      return data.values.reduce((total, num) => total + num, 0)
    }
  }

  return (
    <div className="bg-[#161617] rounded-md p-4 w-full flex flex-wrap">
      <div className="w-full sm:w-1/3 mb-2 sm:mb-0 sm:pr-4">
        <h2 className="text-light-gray">Total Expense</h2>
        {loading ? <p className="h-6 w-20 mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></p> : <p className="text-2xl">{`${sumAllExpense()} $`}</p>}
      </div>

      <div className="w-full sm:w-2/3 flex justify-center">
        <OverviewExpenseChart />
      </div>
    </div>
  );
}
