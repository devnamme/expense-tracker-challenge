import { useSelector } from "react-redux";
import ExpenseListItem from "../components/expense-list-item";
import { ExpensesGroupKey } from "../redux/modules/expenses";
import { RootState } from "../redux/store";

export default function ListPage() {
  const expenses = useSelector((state: RootState) => state.expenses);
  const pagination = useSelector((state: RootState) => state.pagination);

  const getGroup = () =>
    `by${pagination.mode[0].toUpperCase()}${pagination.mode.substring(
      1
    )}` as ExpensesGroupKey;

  return (
    <div className="min-h-0 grow flex flex-col flex-nowrap gap-y-4 overflow-y-auto -mb-6 pb-6">
      {expenses[getGroup()][pagination.date] !== undefined ? (
        expenses[getGroup()][pagination.date].expenses.map(
          (expenseID: number) => (
            <ExpenseListItem
              key={`expense-list-item-${expenses.byID[expenseID].id}`}
              expense={expenses.byID[expenseID]}
              showDate={pagination.mode !== "day"}
            />
          )
        )
      ) : (
        <p>No expenses found!</p>
      )}
    </div>
  );
}
