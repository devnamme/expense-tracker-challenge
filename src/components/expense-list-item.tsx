import { Expense } from "../types/expense.interface";

interface Props {
  expense: Expense;
  showDate?: boolean;
}

export default function ExpenseListItem({ expense, showDate = false }: Props) {
  return (
    <div className="bg-gray-light p-2 rounded flex flex-row flex-nowrap items-center justify-between">
      <p className="">{expense.name}</p>
      <div className="flex flex-col items-end">
        <p className="">PHP {expense.amount.toFixed(2)}</p>
        <p className={showDate ? "" : "hidden"}>{expense.date}</p>
      </div>
    </div>
  );
}
