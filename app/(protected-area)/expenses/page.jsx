import ExpensesForm from "../../../components/expenses/ExpensesForm";
import TotalExpenseCategories from "@/components/expenses/TotalExpenseCategories";

export default function ExpensesPage() {
  return (
    <main className="p-4">
      <h1 className="mb-4">Expenses</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <ExpensesForm />
        <TotalExpenseCategories />
      </div>
    </main>
  );
}
