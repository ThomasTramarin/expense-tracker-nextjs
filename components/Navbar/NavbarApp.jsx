"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const links = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Overview", href: "/overview" },
  { id: 3, name: "Transactions", href: "/transactions" },
  { id: 4, name: "Incomes", href: "/incomes" },
  { id: 5, name: "Expenses", href: "/expenses" },
];

function NavbarApp() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="sticky top-0 bg-background border h-16 flex items-center justify-between px-6 border-b border-[#333333]">
      <button
        className="p-1 w-[40px] h-[40px] flex items-center justify-center hover:bg-[#27272A] rounded-md transition-colors duration-100 lg:hidden"
        onClick={handleMenuToggle}
      >
        {menuOpen ? (
          <IoClose className="text-white text-3xl" />
        ) : (
          <HiMenuAlt1 className="text-white text-3xl" />
        )}
      </button>

      <ul className="hidden lg:flex gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`text-sm transition-colors duration-100 ${pathname === link.href ? "text-blue-500 font-medium" : "text-light-gray hover:text-white"}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 items-center">
        <Link
          href=""
          className="flex items-center justify-center border border-[#27272A] hover:bg-[#27272A] rounded-md w-[40px] h-[40px] p-1 transition-colors duration-100"
        >
          <IoIosNotificationsOutline className="text-white text-3xl" />
        </Link>
        <div className="w-10 h-10 rounded-full border"></div>
      </div>

      {menuOpen && (
        <div className="fixed top-16 left-0 w-full h-[calc(100%-64px)] bg-background p-6 flex flex-col justify-between lg:hidden">
          <ul className="">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={`text-lg transition-colors duration-100 block p-1 ${
                    pathname === link.href
                      ? "text-blue-500 font-medium"
                      : "text-light-gray hover:text-white"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/api/auth/signout"
            className="text-red-400 p-1 hover:underline hover:underline-offset-2"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavbarApp;
