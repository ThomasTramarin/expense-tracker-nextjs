"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
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
  const [profileOpen, setProfileOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <nav className="sticky top-0 bg-background border h-16 flex items-center justify-between px-6 border-b border-[#333333] z-50">
      <button
        aria-label="Toggle menu button"
        aria-expanded={menuOpen}
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
              className={`text-sm transition-colors duration-100 ${
                pathname === link.href
                  ? "text-blue-500 font-medium"
                  : "text-light-gray hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 items-center">
        <button onClick={handleProfileToggle}
        aria-label="Toggle profile button"
        aria-expanded={profileOpen}>
          <FaRegUserCircle size={35} color="white" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed top-16 left-0 w-full h-[calc(100%-64px)] bg-background p-6 flex flex-col lg:hidden z-50">
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
        </div>
      )}

      {profileOpen && (
        <div className="absolute border border-zinc-700 right-4 top-16 rounded-lg p-2 w-40 bg-background">
          <h2 className="text-white">Profile</h2>
          <ul className="text-light-gray">
            <li>
              <Link
                href="/login"
                className="block hover:text-blue-600 transition-colors duration-100"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block hover:text-blue-600 transition-colors duration-100"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/api/auth/signout"
                className="block hover:text-blue-600 transition-colors duration-100"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavbarApp;
