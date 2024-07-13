"use client";
import spendyLogo from "../../public/assets/images/spendy.webp"
import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link";
function NavbarHome() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/auth/is-authenticated")
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <nav className="sticky top-0 h-16 flex items-center justify-between px-6 z-50">
      <Link href="/">
      <Image src={spendyLogo} alt="Spendy logo" width={112} height={26}/>
      </Link>

      {!loading && isAuthenticated ? (
        <Link href="/overview" className="text-white px-2 py-1 border border-zinc-700 rounded-md hover:bg-zinc-700 transition-colors duration-100">Enter</Link>
      ) : (
        <div className="flex gap-3">
          <Link href="/login" className="text-white px-2 py-1 border border-zinc-700 rounded-md hover:bg-zinc-700 transition-colors duration-100">Login</Link>
          <Link href="/register" className="text-white px-2 py-1 border border-zinc-700 rounded-md hover:bg-zinc-700 transition-colors duration-100">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default NavbarHome;
