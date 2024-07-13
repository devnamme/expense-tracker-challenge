import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/nav-menu";
import ExpenseModal from "../modals/expense";
import { RootState } from "../redux/store";
import ModalLayout from "./modal";

interface GeneralLayoutProps {}

export default function GeneralLayout({}: GeneralLayoutProps) {
  const expenseModalState = useSelector(
    (state: RootState) => state.expenseModalState
  );

  return (
    <div className="w-screen h-screen flex flex-col flex-nowrap items-stretch justify-center">
      <main className="grow min-h-0 flex flex-col flex-nowrap overflow-y-clip p-6">
        <Outlet />
      </main>

      <ModalLayout active={expenseModalState.active}>
        <ExpenseModal active={expenseModalState.active} />
      </ModalLayout>

      <NavMenu />
    </div>
  );
}
