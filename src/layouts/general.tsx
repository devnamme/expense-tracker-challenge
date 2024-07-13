import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/nav-menu";
import ExpenseModal from "../modals/expense";
import { fetchTasks } from "../redux/modules/expenses";
import { AppDispatch, RootState } from "../redux/store";
import ModalLayout from "./modal";

interface GeneralLayoutProps {}

export default function GeneralLayout({}: GeneralLayoutProps) {
  const dispatch = useDispatch<AppDispatch>();

  const expenseModalState = useSelector(
    (state: RootState) => state.expenseModalState
  );

  useEffect(() => {
    if (!expenseModalState.active) dispatch(fetchTasks());
  }, []);

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
