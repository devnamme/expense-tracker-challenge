import { InfoCircle } from "iconsax-react";
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../constants/categories";
import { closeModal } from "../redux/modules/expense-modal";
import { addExpense, editExpense } from "../redux/modules/expenses";
import { AppDispatch, RootState } from "../redux/store";
import { getDayKey } from "../utils/dates";

interface Props {
  active: boolean;
}

interface ErrorMessages {
  name?: string;
  amount?: string;
  date?: string;
  category?: string;
}

const DEFAULT_ERROR_MESSAGES: ErrorMessages = {};

export default function ExpenseModal({ active }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const expenseModalState = useSelector(
    (state: RootState) => state.expenseModalState
  );
  const pagination = useSelector((state: RootState) => state.pagination);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    ...DEFAULT_ERROR_MESSAGES,
  });

  const fieldClasses =
    "w-full min-h-10 bg-white text-black text-left p-2 rounded appearance-none";
  const errorFieldClasses = "border-2 border-error";

  const validateNonEmptyField = (value: string): string => {
    return value.length ? "" : "Field should not be left blank.";
  };

  const validateAmountField = (amount: string): string => {
    if (amount.length === 0) {
      return "Field should not be left blank.";
    }
    if (parseFloat(amount) < 0) {
      return "Amount should not be negative.";
    }

    return "";
  };

  const generateErrorMessage = (text: string | undefined) =>
    text ? (
      <p className="mt-1 text-error leading-none">
        <InfoCircle size="1rem" className="inline-block align-top" /> {text}
      </p>
    ) : null;

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const errors: ErrorMessages = {
      name: validateNonEmptyField(name),
      amount: validateAmountField(name),
      date: validateNonEmptyField(date),
      category: validateNonEmptyField(category),
    };
    setErrorMessages(errors);

    const valid =
      errors.name!.length === 0 &&
      errors.amount!.length === 0 &&
      errors.date!.length === 0 &&
      errors.category!.length === 0;
    if (!valid) return;

    if (expenseModalState.expense !== null) {
      dispatch(
        editExpense({
          id: expenseModalState.expense.id!,
          expense: {
            name: name,
            amount: Math.round(parseFloat(amount) * 100) / 100,
            date: new Date(date).toISOString(),
            category: category,
          },
        })
      );
    } else {
      dispatch(
        addExpense({
          name: name,
          amount: Math.round(parseFloat(amount) * 100) / 100,
          date: new Date(date).toISOString(),
          category: category,
        })
      );
    }

    dispatch(closeModal());
  };

  const onDeleteClick: MouseEventHandler = (event) => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (active) {
      if (expenseModalState.expense !== null) {
        setName(expenseModalState.expense.name);
        setAmount(expenseModalState.expense.amount.toString());
        setDate(getDayKey(new Date(expenseModalState.expense.date)));
        setCategory(expenseModalState.expense.category);
      } else {
        setName("");
        setAmount("");
        setDate(getDayKey(new Date(pagination.date)));
        setCategory("");
      }

      setErrorMessages({ ...DEFAULT_ERROR_MESSAGES });
    }
  }, [active]);

  return (
    <form
      className="w-full bg-gray-300 rounded-2xl p-4 flex flex-col gap-y-4"
      onSubmit={onSubmit}
    >
      <div>
        <input
          type="text"
          placeholder="Name"
          className={`${fieldClasses} ${
            errorMessages.name ? errorFieldClasses : ""
          }`}
          value={name}
          onChange={(event) => {
            const value = (event.target as HTMLInputElement).value;
            setName(value);
            setErrorMessages({
              ...errorMessages,
              name: validateNonEmptyField(value),
            });
          }}
        />
        {generateErrorMessage(errorMessages.name)}
      </div>

      <div>
        <input
          type="number"
          placeholder="Amount"
          className={`${fieldClasses} ${
            errorMessages.amount ? errorFieldClasses : ""
          }`}
          value={amount}
          onChange={(event) => {
            const value = (event.target as HTMLInputElement).value;
            setAmount((event.target as HTMLInputElement).value);
            setErrorMessages({
              ...errorMessages,
              amount: validateAmountField(value),
            });
          }}
        />
        {generateErrorMessage(errorMessages.amount)}
      </div>

      <div>
        <input
          type="date"
          className={`${fieldClasses} ${
            errorMessages.date ? errorFieldClasses : ""
          }`}
          value={date}
          onChange={(event) => {
            const value = (event.target as HTMLInputElement).value;
            setDate(value);
            setErrorMessages({
              ...errorMessages,
              date: validateNonEmptyField(value),
            });
          }}
        />
        {generateErrorMessage(errorMessages.date)}
      </div>

      <div>
        <select
          value={category}
          onChange={(event) => {
            const value = (event.target as HTMLSelectElement).value;
            setCategory(value);
            setErrorMessages({
              ...errorMessages,
              category: validateNonEmptyField(value),
            });
          }}
          className={`${fieldClasses} ${
            errorMessages.category ? errorFieldClasses : ""
          }`}
        >
          <option value="">--Select Category--</option>
          {Object.keys(Categories).map((key: string) => (
            <option key={`select-category-${key}`} value={key}>
              {Categories[key].name}
            </option>
          ))}
        </select>
        {generateErrorMessage(errorMessages.category)}
      </div>

      <div
        className={`min-h-10 grid ${
          expenseModalState.expense != null ? "grid-cols-2" : "grid-cols-1"
        } gap-x-4`}
      >
        <input
          type="submit"
          className="bg-primary-dark text-white rounded p-2 cursor-pointer"
          value={expenseModalState.expense != null ? "Save" : "Add Expense"}
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
