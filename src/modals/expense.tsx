import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../constants/categories";
import { closeModal } from "../redux/modules/expense-modal";
import { AppDispatch, RootState } from "../redux/store";

interface Props {
  active: boolean;
}

export default function ExpenseModal({ active }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const expenseModalState = useSelector(
    (state: RootState) => state.expenseModalState
  );

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("others");

  const fieldClasses =
    "bg-white text-black text-left p-2 rounded appearance-none";

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    dispatch(closeModal());
  };

  const onDeleteClick: MouseEventHandler = (event) => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (active) {
      setName("");
      setAmount("");
      setDate("");
      setCategory("others");
    }
  }, [active]);

  return (
    <form
      className="w-full bg-gray-300 rounded-2xl p-4 grid grid-cols-1 grid-rows-5 gap-y-4"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="Name"
        className={fieldClasses}
        value={name}
        onChange={(event) => setName((event.target as HTMLInputElement).value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className={fieldClasses}
        value={amount}
        onChange={(event) =>
          setAmount((event.target as HTMLInputElement).value)
        }
      />

      <input
        type="date"
        className={fieldClasses}
        value={date}
        onChange={(event) => setDate((event.target as HTMLInputElement).value)}
      />

      <select
        value={category}
        onChange={(event) =>
          setCategory((event.target as HTMLSelectElement).value)
        }
        className={fieldClasses}
      >
        {Categories.map((categ) => (
          <option key={`select-category-${categ.value}`} value={categ.value}>
            {categ.name}
          </option>
        ))}
      </select>

      <div
        className={`grid ${
          expenseModalState.expense != null ? "grid-cols-2" : "grid-cols-1"
        } gap-x-4`}
      >
        <input
          type="submit"
          className="bg-primary-dark text-white rounded p-2 cursor-pointer"
          value={
            expenseModalState.expense != null ? "Save Expense" : "Add Expense"
          }
        />

        <input
          type="button"
          className={`bg-primary-dark text-white rounded p-2 cursor-pointer ${
            expenseModalState.expense != null ? "" : "hidden"
          }`}
          value="Delete"
          onClick={onDeleteClick}
        />
      </div>
    </form>
  );
}
