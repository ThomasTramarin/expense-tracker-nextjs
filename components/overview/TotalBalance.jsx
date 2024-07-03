"use client"
import { useContext } from "react";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";
import { GetIncomesContext } from "../../contexts/GetIncomesContext";
import { OverviewBalanceChart } from "../charts/OverviewBalanceChart";

export default function TotalBalance() {
  const { data: incomeData, loading: incomeLoading, error: incomeError } = useContext(GetIncomesContext);
  const { data: expenseData, loading: expenseLoading, error: expenseError } = useContext(GetExpensesContext);


  if (incomeError || expenseError) return <p>Error:</p>;

  const calculateBalance = ()=>{
    let totalIncome = 0;
    let totalExpense = 0;
    if (incomeData.values.length === 0){
      totalIncome = 0;
    }else{
      totalIncome = incomeData.values.reduce((total, num) => total + num, 0);
    }

    if(expenseData.values.length === 0){
      totalExpense = 0;
    }else{
      totalExpense = expenseData.values.reduce((total, num) => total + num, 0);
    }

    return totalIncome - totalExpense;
  }

  return (
    <div className="bg-[#161617] rounded-md p-4 w-full flex flex-wrap">
      <div className="w-full sm:w-1/3 mb-2 sm:mb-0 sm:pr-4">
        <h2 className="text-light-gray">Income - Expense</h2>
        {incomeLoading || expenseLoading ? <p className="h-6 w-20 mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></p> : <p className="text-2xl">{`${calculateBalance()} $`}</p>}
      </div>

      <div className="w-full sm:w-2/3 flex justify-center">
        <OverviewBalanceChart />
      </div>
    </div>
  );
}
