import { IoFilter } from "react-icons/io5";
import { FaSort } from "react-icons/fa";

export default function FilterSortControls({
  toggleFilter,
  toggleSort,
  openFilter,
  openSort,
  sortOptions,
  setSortOptions,
  filterOptions,
  setFilterOptions,
}) {

  return (
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

      {/* Filter options */}
      {openFilter && (
        <div className="absolute w-64 top-10 right-20 border border-zinc-500 rounded-md bg-[#232323] p-2">
          <h2 className="text-white mb-3">Filter</h2>
          <form>
            <div className="flex flex-col mb-3">
              <label htmlFor="search" className="mb-1">
                Search Transactions
              </label>
              <input
                type="search"
                id="search"
                onChange={(e) => setFilterOptions({...filterOptions, searchTransaction: e.target.value})}
                value={filterOptions.searchTransaction}
              />
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="search-by" className="mb-1">
                Search By
              </label>
              <select
                name="search-by"
                id="search-by"
                onChange={(e) => setFilterOptions({...filterOptions, searchBy: e.target.value})}
                value={filterOptions.searchBy}
              >
                <option value="id">Id</option>
                <option value="title">Title</option>
              </select>
            </div>
            <div className="mb-3 flex justify-around">
              <div>
                <input type="radio" name="transactions-type" id="all-types" checked={filterOptions.transactionsType === "all-types"} onChange={() => setFilterOptions({...filterOptions, transactionsType: "all-types"})} value="all-type" className="hidden peer"/>
                <label htmlFor="all-types" className="text-sm text-white border peer-checked:border-blue-600 peer-checked:bg-[#22203a] border-slate-500 px-3 py-1 rounded-full cursor-pointer">All</label>
              </div>
                
              <div>
                <input type="radio" name="transactions-type" id="only-incomes" checked={filterOptions.transactionsType === "only-incomes"} onChange={() => setFilterOptions({...filterOptions, transactionsType: "only-incomes"})} value="only-incomes" className="hidden peer"/>
                <label htmlFor="only-incomes" className="text-sm text-white border peer-checked:border-blue-600 peer-checked:bg-[#22203a] border-slate-500 px-3 py-1 rounded-full cursor-pointer">Incomes</label>
              </div>

              <div>
                <input type="radio" name="transactions-type" id="only-expenses" checked={filterOptions.transactionsType === "only-expenses"} onChange={() => setFilterOptions({...filterOptions, transactionsType: "only-expenses"})} value="only-expenses" className="hidden peer"/>
                <label htmlFor="only-expenses" className="text-sm text-white border peer-checked:border-blue-600 peer-checked:bg-[#22203a] border-slate-500 px-3 py-1 rounded-full cursor-pointer">Expenses</label>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Sort Options */}
      {openSort && (
        <div className="absolute w-64 top-10 right-0 border border-zinc-500 rounded-md bg-[#232323] p-2">
          <h2 className="text-white mb-2">Sort</h2>
          <form>
            <div className="flex flex-col mb-3">
              <label htmlFor="sort-by" className="mb-1">
                Sort By
              </label>
              <select
                name="sort-by"
                id="sort-by"
                value={sortOptions.sortBy}
                onChange={(e) => setSortOptions({...sortOptions, sortBy: e.target.value})}
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="sort-mode" className="mb-1">
                Sort Mode
              </label>
              <select
                name="sort-mode"
                id="sort-mode"
                value={sortOptions.sortMode}
                onChange={(e) => setSortOptions({...sortOptions, sortMode:e.target.value})}
              >
                <option value="decreasing-reverse-alphabetical">
                  Decr/Reverse Alphabetical
                </option>
                <option value="increasing-alphabetical">
                  Incr/Alphabetical
                </option>
              </select>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
