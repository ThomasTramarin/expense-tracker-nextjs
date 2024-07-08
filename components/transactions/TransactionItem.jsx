import { TbDotsVertical } from "react-icons/tb";

export default function TransactionItem({transaction, handleTransactionOption }) {
  return (
    <li className="p-2 bg-[#262626] rounded-lg" key={transaction.transactionID}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white break-all">{transaction.title}</h3>
        <button
          onClick={(e) => handleTransactionOption(e, transaction.transactionID)}
        >
          <TbDotsVertical cursor={"pointer"} color="white" size={18} />
        </button>
      </div>

      <div className="flex gap justify-between items-center">
        <p className="text-light-gray text-sm">
          {transaction.transactionDate} &sdot; {transaction.category}
        </p>
        <p
          className={`text-sm ${
            transaction.type === "income" ? "text-green-500" : "text-red-500"
          } font-medium`}
        >
          {transaction.type === "income" ? "+" : "-"} {transaction.amount} $
        </p>
      </div>
    </li>
  );
}
