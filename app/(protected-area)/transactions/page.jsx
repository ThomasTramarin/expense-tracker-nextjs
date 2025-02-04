import TransactionsList from "../../../components/transactions/TransactionsList";

export const metadata = {
  title: "Transactions"
}

function Transactions() {
  return (
    <main className="p-4">
      <h1 className="mb-4">Transactions</h1>
      <div>
        <TransactionsList />
      </div>
    </main>
  );
}

export default Transactions;
