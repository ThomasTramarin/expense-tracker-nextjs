import Image from "next/image"
import NavbarHome from "../components/Navbar/NavbarHome";
import moneyImage from "../public/assets/images/money.png"
import { FaCheck } from "react-icons/fa6";

function Home() {
  return (
    <>
      <NavbarHome />
      <header className="flex flex-col justify-center items-center h-[90vh] bg-[linear-gradient(to_bottom,#09090b,#0a2401_34%,#184708_50%,#0a2401_80%,#09090b_100%)]">
        <div className="w-[70vw] text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-3 z-20">
          Track Your Finances
          </h1>
        </div>

        <ul className="text-[#d1d1d1] flex-col lg:flex-row lg:gap-5 flex gap-2">
          <li className="flex items-center gap-1">
            <FaCheck />
            <span>Real-Time Expense Tracking</span>
          </li>
          <li className="flex items-center gap-1">
            <FaCheck />
            <span>Organize Expenses by Category</span>
          </li>
          <li className="flex items-center gap-1">
            <FaCheck />
            <span>Transaction History Overview</span>
          </li>
        </ul>
      </header>

      <main className="p-4 text-white">
        ...
      </main>
    </>
  );
}

export default Home;
