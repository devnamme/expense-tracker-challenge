import { More } from "iconsax-react";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { setEditing } from "../redux/modules/expense-modal";
import { AppDispatch } from "../redux/store";
import { Expense } from "../types/expense.interface";

interface Props {
  expense: Expense;
  showDate?: boolean;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ExpenseListItem({ expense, showDate = false }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const onEditClick: MouseEventHandler = () => {
    dispatch(setEditing({ expense: expense }));
  };

  const formatDate = (date: Date) =>
    `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${
      date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    }:${date.getMinutes().toString().padStart(2, "0")} ${
      date.getHours() >= 12 ? "PM" : "AM"
    }`;

  return (
    <div className="bg-gray-light py-2 px-4 rounded flex flex-row flex-nowrap items-center justify-start gap-x-4">
      <p className="mr-auto shrink line-clamp-2">{expense.name}</p>

      <div className="shrink-0 flex flex-col items-end">
        <p className="font-medium text-right">
          PHP {expense.amount.toFixed(2)}
        </p>
        <p className={`font-light ${showDate ? "" : "hidden"}`}>
          {formatDate(new Date(expense.date))}
        </p>
      </div>

      <More
        className="shrink-0 rotate-90 cursor-pointer"
        onClick={onEditClick}
      />
    </div>
  );
}
