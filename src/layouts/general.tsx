import { Outlet } from "react-router-dom";
import NavMenu from "../components/nav-menu";
import ExpenseModal from "../modals/expense";
import ModalLayout from "./modal";

interface GeneralLayoutProps {}

export default function GeneralLayout({}: GeneralLayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col flex-nowrap items-stretch justify-center">
      <main className="grow">
        <Outlet />
      </main>

      <ModalLayout>
        <ExpenseModal />
      </ModalLayout>

      <NavMenu />
    </div>
  );
}
