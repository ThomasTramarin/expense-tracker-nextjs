"use client"
import { useContext } from "react";
import { GetIncomesContext } from "../../contexts/GetIncomesContext";
import { IncomesCategoriesPie } from "../../components/charts/IncomesCategoriesPie";

export default function TotalIncomeCategories() {
  const { data, loading, error} = useContext(GetIncomesContext);

  if (error) console.log(error);

  const sumAllIncome = ()=>{
    if (data.values.length === 0){
      return 0;
    }else{
      return data.values.reduce((total, num) => total + num, 0)
    }
  }

  return (
    <div className="bg-[#161617] rounded-md p-4 w-full flex flex-wrap">
    <div className="w-full sm:w-1/4 mb-2 sm:mb-0 sm:pr-4">
      <h2 className="text-light-gray">Total Income</h2>
      {loading ? <p className="h-6 w-28 mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></p> : <p className="text-2xl">{`${sumAllIncome()} $`}</p>}
    </div>

    <div className="w-full sm:w-3/4 flex justify-center items-center">
      <IncomesCategoriesPie/>
    </div>
  </div>
  );
}
