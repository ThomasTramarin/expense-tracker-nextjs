import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

export default function TransactionOptions({
  transactionInfo,
  setTransactionInfo,
  handleDelete,
  handleEdit,
}) {
  return (
    <div
      className="absolute w-52 rounded-lg overflow-hidden bg-zinc-700"
      style={{ top: transactionInfo.y, left: transactionInfo.x - 208 }}
    >
      <div className="flex justify-between p-2">
        <p>Transaction Details</p>
        <button
          onClick={() =>
            setTransactionInfo({ ...transactionInfo, isOpen: false })
          }
        >
          <IoClose size={20} color="white" />
        </button>
      </div>
      <ul className="text-white">
        <li className="p-2">ID: {transactionInfo.transactionID}</li>
        <li className="hover:bg-zinc-600">
          <button
            className="flex gap-2 items-center cursor-pointer w-full h-full p-2"
            onClick={() => handleDelete(transactionInfo.transactionID)}
          >
            <MdDelete size={20} /> Delete
          </button>
        </li>
        <li className="hover:bg-zinc-600">
          <button
            className="flex gap-2 items-center cursor-pointer w-full h-full p-2"
            onClick={() => handleEdit(transactionInfo.transactionID)}
          >
            <FaPencilAlt size={20} /> Edit
          </button>
        </li>
      </ul>
    </div>
  );
}
