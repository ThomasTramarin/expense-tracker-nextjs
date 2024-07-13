import IncomesForm from "../../../components/incomes/IncomesForm";
import TotalIncomeCategories from "../../../components/incomes/TotalIncomeCategories";

export const metadata = {
  title: "Incomes"
}

export default function IncomesPage() {
  return (
    <main className="p-4">
      <h1 className="mb-4">Incomes</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <IncomesForm />
        <TotalIncomeCategories />
      </div>
    </main>
  );
}
