import TotalIncome from "../../../components/overview/TotalIncome";
import TotalExpense from "../../../components/overview/TotalExpense";
import TotalBalance from "../../../components/overview/TotalBalance";

export const metadata = {
  title: "Overview"
}

function Overview() {


  return (
    <main className="p-4">
      <h1 className="mb-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <TotalIncome />
      <TotalExpense />
      <TotalBalance /> 
      </div>
    </main>
  );
}

export default Overview;
