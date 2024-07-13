"use client";
import { useContext, useState, useEffect } from "react";

import { GetTransactionsContext } from "../../contexts/GetTransactionsContext";
import { GetCategoriesContext } from "../../contexts/GetCategoriesContext";
import { GetIncomesContext } from "../../contexts/GetIncomesContext";
import { GetExpensesContext } from "../../contexts/GetExpensesContext";

import TransactionItem from "./TransactionItem";
import FilterSortControls from "./FilterSortControls";
import TransactionOptions from "./TransactionOptions";
import TransactionEdit from "./TransactionEdit";

export default function TransactionsList() {
  // Context import
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

  // States
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState({
    isOpen: false,
    transactionID: 0,
    x: 0,
    y: 0,
  });
  const [editTransaction, setEditTransaction] = useState({
    isOpen: false,
    transactionID: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const [sortOptions, setSortOptions] = useState({
    sortBy: "date",
    sortMode: "decreasing-reverse-alphabetical",
  });

  const [filterOptions, setFilterOptions] = useState({
    searchTransaction: "",
    searchBy: "id",
    transactionsType: "all-types",
  });

  // Toggle functions for filter settings
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
    if (openSort) setOpenSort(false);
  };

  // Toggle functions for sorting settings
  const toggleSort = () => {
    setOpenSort(!openSort);
    if (openFilter) setOpenFilter(false);
  };

  // Function to set data to the transaction options
  const handleTransactionOption = (e, id) => {
    const x = e.pageX !== 0 ? e.pageX : 250;
    const y = e.pageY !== 0 ? e.pageY : 150;
    setTransactionInfo({ isOpen: true, transactionID: id, x, y });
  };

  // Function to delete transaction
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

      setTransactionInfo({ isOpen: false });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to edit transaction
  const handleEdit = (id) => {
    setEditTransaction({ isOpen: true, transactionID: id });
    setTransactionInfo({ isOpen: false });
  };

  const searchMatch = (arr) => {
    if (filterOptions.searchTransaction === "") return arr;
    const reg = new RegExp(filterOptions.searchTransaction, "i");

    if (filterOptions.searchBy === "id") {
      return arr.filter((transaction) =>
        transaction.transactionID.toString().match(reg)
      );
    } else {
      return arr.filter((transaction) => transaction.title.match(reg));
    }
  };

  const selectedTransactionsType = (transactions) => {
    if (filterOptions.transactionsType === "all-types") {
      return transactions;
    } else if (filterOptions.transactionsType === "only-incomes") {
      return transactions.filter(
        (transaction) => transaction.type === "income"
      );
    } else {
      return transactions.filter(
        (transaction) => transaction.type === "expense"
      );
    }
  };

  //Formatting data
  useEffect(() => {
    const formattedTransactions = data.map((transaction) => ({
      ...transaction,
      transactionDate: new Date(transaction.transactionDate),
    }));

    const sortedTransactions = formattedTransactions.sort((a, b) => {
      if (sortOptions.sortBy === "date") {
        return sortOptions.sortMode === "increasing-alphabetical"
          ? a.transactionDate - b.transactionDate
          : b.transactionDate - a.transactionDate;
      } else if (sortOptions.sortBy === "title") {
        return sortOptions.sortMode === "increasing-alphabetical"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortOptions.sortBy === "amount") {
        const amountA = a.type === "expense" ? -a.amount : a.amount;
        const amountB = b.type === "expense" ? -b.amount : b.amount;
        return sortOptions.sortMode === "increasing-alphabetical"
          ? amountA - amountB
          : amountB - amountA;
      } else if (sortOptions.sortBy === "category") {
        return sortOptions.sortMode === "increasing-alphabetical"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });

    const typeTransactions = selectedTransactionsType(sortedTransactions);
    const finalTransactions = searchMatch(typeTransactions);

    setTransactions(finalTransactions);
    setLoadingTransactions(false);
  }, [data, sortOptions, filterOptions]);

  return (
    <>
      <div className="bg-[#161617] rounded-lg p-2 relative">
        <div className="flex justify-between mb-5 items-center">
          <h2 className="text-light-gray font-bold">List</h2>
          <FilterSortControls
            toggleFilter={toggleFilter}
            toggleSort={toggleSort}
            openFilter={openFilter}
            openSort={openSort}
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>

        <div className="overflow-auto h-[70vh] px-1">
          <ul className="flex flex-col gap-2">
            {loadingTransactions && (
              <>
                <li className="h-16 w-full mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></li>
                <li className="h-16 w-full mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></li>
                <li className="h-16 w-full mt-2 bg-[#2f2f31] animate-pulse rounded-lg"></li>
              </>
            )}

            {!loadingData &&
              !loadingTransactions &&
              data.length > 0 &&
              transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.transactionID}
                  transaction={{
                    ...transaction,
                    transactionDate:
                      transaction.transactionDate.toLocaleDateString(),
                  }}
                  handleTransactionOption={handleTransactionOption}
                />
              ))}
            {!loadingData && !loadingTransactions && data.length === 0 && (
              <li className="p-2 bg-[#262626] rounded-lg text-white">
                No transactions found...
              </li>
            )}
          </ul>
        </div>
      </div>

      {transactionInfo.isOpen && (
        <TransactionOptions
          transactionInfo={transactionInfo}
          setTransactionInfo={setTransactionInfo}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}

      {editTransaction.isOpen && (
        <>
        <TransactionEdit
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
          data={transactions}
          setExpensesRefreshData={setExpensesRefreshData}
          setIncomesRefreshData={setIncomesRefreshData}
          setCategoriesRefreshData={setCategoriesRefreshData}
          setTransactionsRefreshData={setTransactionsRefreshData}
        />
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-75 z-10"></div>
        </>
      )}

  
    </>
  );
}
