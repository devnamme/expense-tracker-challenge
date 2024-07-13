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
import { addTask } from "../redux/modules/expenses";
import { AppDispatch, RootState } from "../redux/store";

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

    let local_date = new Date(date);
    local_date = new Date(
      local_date.getTime() + local_date.getTimezoneOffset() * 60000
    );

    dispatch(
      addTask({
        name: name,
        amount: parseFloat(amount),
        date: local_date.toISOString(),
        category: category,
      })
    );
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
      setCategory("");
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
          {Categories.map((categ) => (
            <option key={`select-category-${categ.value}`} value={categ.value}>
              {categ.name}
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
