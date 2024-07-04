import NavbarApp from "../../components/Navbar/NavbarApp";

import { GetExpensesProvider } from "../../contexts/GetExpensesContext";
import { GetIncomesProvider } from "../../contexts/GetIncomesContext";
import { GetCategoriesProvider } from "../../contexts/GetCategoriesContext";

//Layout for protected area
export default function ProtectedLayout({ children }) {
  return (
    <>
      <NavbarApp />

      <GetIncomesProvider>
        <GetExpensesProvider>
          <GetCategoriesProvider>{children}</GetCategoriesProvider>
        </GetExpensesProvider>
      </GetIncomesProvider>
    </>
  );
}
