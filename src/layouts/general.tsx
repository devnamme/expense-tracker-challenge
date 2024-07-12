import { Outlet } from "react-router-dom";
import NavMenu from "../components/nav-menu";
import ExpenseModal from "../modals/expense";

interface GeneralLayoutProps {}

export default function GeneralLayout({}: GeneralLayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col flex-nowrap items-center justify-center">
      <main className="grow">
        <Outlet />
      </main>

      <ExpenseModal />
      <NavMenu />
    </div>
  );
}
