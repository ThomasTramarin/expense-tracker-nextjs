import Navbar from "../../components/Navbar/Navbar";
export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
