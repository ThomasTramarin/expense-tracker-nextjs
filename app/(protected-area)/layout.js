import NavbarApp from "../../components/Navbar/NavbarApp";

import { GetExpensesProvider } from "../../contexts/GetExpensesContext";
import { GetIncomesProvider } from "../../contexts/GetIncomesContext";

//Layout for protected area
export default function ProtectedLayout({ children }) {
  return (
    <>
      <NavbarApp />
      
      <GetIncomesProvider>
        <GetExpensesProvider>{children}</GetExpensesProvider>
      </GetIncomesProvider>
    </>
  );
}
