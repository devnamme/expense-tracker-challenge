import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/nav-menu";
import Total from "../components/total";
import ViewModeSelector from "../components/view-mode-selector";
import ExpenseModal from "../modals/expense";
import { ExpensesGroupKey, fetchTasks } from "../redux/modules/expenses";
import { setDate, setMode } from "../redux/modules/pagination";
import { AppDispatch, RootState } from "../redux/store";
import { ViewMode } from "../types/view-mode.interface";
import ModalLayout from "./modal";

interface GeneralLayoutProps {}

export default function GeneralLayout({}: GeneralLayoutProps) {
  const dispatch = useDispatch<AppDispatch>();

  const expenses = useSelector((state: RootState) => state.expenses);
  const expenseModalState = useSelector(
    (state: RootState) => state.expenseModalState
  );
  const pagination = useSelector((state: RootState) => state.pagination);

  const getGroup = () =>
    `by${pagination.mode[0].toUpperCase()}${pagination.mode.substring(
      1
    )}` as ExpensesGroupKey;

  useEffect(() => {
    if (!expenseModalState.active) dispatch(fetchTasks());
  }, [expenseModalState.active]);

  return (
    <div className="w-screen h-screen flex flex-col flex-nowrap items-stretch justify-center">
      <main className="grow min-h-0 flex flex-col flex-nowrap gap-y-6 overflow-y-clip p-6">
        <ViewModeSelector
          mode={pagination.mode}
          setMode={(mode: ViewMode) => dispatch(setMode({ mode: mode }))}
          date={pagination.date}
          setDate={(date: string) => dispatch(setDate({ date: date }))}
        />

        <Total
          value={
            expenses[getGroup()][pagination.date] === undefined
              ? 0
              : expenses[getGroup()][pagination.date].total
          }
          className=""
        />

        <Outlet />
      </main>

      <ModalLayout active={expenseModalState.active}>
        <ExpenseModal active={expenseModalState.active} />
      </ModalLayout>

      <NavMenu />
    </div>
  );
}
