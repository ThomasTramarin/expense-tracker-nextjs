"use client";
import { IoFilter, IoClose } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaSort, FaPencilAlt } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";

import { GetTransactionsContext } from "../../contexts/GetTransactionsContext";
import { GetCategoriesContext } from "../../contexts/GetCategoriesContext";
import { GetIncomesContext } from "../../contexts/GetIncomesContext";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";

export default function TransactionsList() {
  const {
    data,
    loading: loadingData,
    error: errorData,
    setRefreshData: setTransactionsRefreshData,
  } = useContext(GetTransactionsContext);
  const { setRefreshData: setCategoriesRefreshData } =
    useContext(GetCategoriesContext);
  const { setRefreshData: setIncomesRefreshData } =
    useContext(GetIncomesContext);
  const { setRefreshData: setExpensesRefreshData } =
    useContext(GetExpensesContext);

  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState({
    isOpen: false,
    transactionID: 0,
    x: 0,
    y: 0,
  });

  //State for formatting data
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const toggleFilter = () => {
    if (openFilter === false) {
      if (openSort === true) {
        setOpenSort(false);
        setOpenFilter(true);
      } else {
        setOpenFilter(true);
      }
    } else {
      setOpenFilter(false);
    }
  };

  const toggleSort = () => {
    if (openSort === false) {
      if (openFilter === true) {
        setOpenFilter(false);
        setOpenSort(true);
      } else {
        setOpenSort(true);
      }
    } else {
      setOpenSort(false);
    }
  };

  const handleTransactionOption = (e, id) => {
    const x = e.pageX;
    const y = e.pageY;
    setTransactionInfo({ isOpen: true, transactionID: id, x, y });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/transactions?transactionID=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setExpensesRefreshData(true);
        setIncomesRefreshData(true);
        setCategoriesRefreshData(true);
        setTransactionsRefreshData(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const formattedTransactions = data.map((transaction) => ({
      ...transaction,
      transactionDate: new Date(
        transaction.transactionDate
      ).toLocaleDateString(),
    }));
    setTransactions(formattedTransactions);
    setLoadingTransactions(false);
  }, [setLoadingTransactions, setTransactions, data]);

  return (
    <>
      <div className="bg-[#161617] rounded-lg p-2 relative">
        <div className="flex justify-between mb-5 items-center">
          <h2 className="text-light-gray font-bold">List</h2>
          <div className="flex gap-2 relative">
            <button
              className={`flex gap-2 items-center text-white text-sm p-2 border rounded-md ${
                openFilter
                  ? "outline outline-blue-500 border-blue-500"
                  : "border-gray-600 hover:border-[#27272A]"
              } hover:bg-[#27272A] transition-colors duration-100`}
              onClick={toggleFilter}
            >
              Filter <IoFilter size={20} />
            </button>
            <button
              className={`flex gap-2 items-center text-white text-sm p-2 border rounded-md ${
                openSort
                  ? "outline outline-blue-500 border-blue-500"
                  : "border-gray-600 hover:border-[#27272A]"
              } hover:bg-[#27272A] transition-colors duration-100`}
              onClick={toggleSort}
            >
              Sort <FaSort size={20} />
            </button>

            {/* Filter Options */}
            {openFilter && (
              <div className="absolute top-10 right-20 border border-zinc-500 rounded-md bg-[#232323] p-2">
                <h2 className="text-white">Filtri</h2>
              </div>
            )}
          </div>
        </div>

        <div>
          <ul className="flex flex-col gap-2">
            {!loadingData &&
              !loadingTransactions &&
              transactions.map((transaction) => (
                <li
                  className="p-2 bg-[#262626] rounded-lg"
                  key={transaction.transactionID}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white break-all">
                      {transaction.title}
                    </h3>
                    <button
                      onClick={(e) =>
                        handleTransactionOption(e, transaction.transactionID)
                      }
                    >
                      <TbDotsVertical
                        cursor={"pointer"}
                        color="white"
                        size={18}
                      />
                    </button>
                  </div>

                  <div className="flex gap justify-between items-center">
                    <p className="text-light-gray text-sm">
                      {transaction.transactionDate} &sdot;{" "}
                      {transaction.category}
                    </p>
                    <p
                      className={`text-sm ${
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      } font-medium`}
                    >
                      {transaction.type === "income" ? "+" : "-"}{" "}
                      {transaction.amount} $
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {transactionInfo.isOpen && (
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
            <li
              className="hover:bg-zinc-600 p-2 flex gap-2 items-center cursor-pointer"
              onClick={() => handleDelete(transactionInfo.transactionID)}
            >
              <MdDelete size={20} /> Delete
            </li>
            <li
              className="hover:bg-zinc-600 p-2 flex gap-2 items-center cursor-pointer"
              onClick={() => handleEdit(transactionInfo.transactionID)}
            >
              <FaPencilAlt size={20} /> Edit
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
