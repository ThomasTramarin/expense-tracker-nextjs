import Link from "next/link";
import NavbarHome from "../components/Navbar/NavbarHome"

export const metadata = {
  title: "Not found 404"
}

export default function NotFound() {
  return (
    <>
    <NavbarHome></NavbarHome>
    <main className="p-4 flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl lg:text-5xl mb-2">404 page not found</h1>
        <p className="mb-4">This page does not exist</p>
        <Link href="/" className="px-3 py-2 border border-zinc-700 rounded-md text-white hover:bg-[#3F3F46] hover:border-[#3F3F46] transition-colors duration-100">Return to home</Link>
    </main>
    </>
  )
}
