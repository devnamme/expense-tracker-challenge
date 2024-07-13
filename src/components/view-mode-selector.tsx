import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { FormEventHandler, MouseEventHandler } from "react";
import { ViewMode } from "../types/view-mode.interface";
import { getDayKey, getMonthKey, getWeekKey } from "../utils/dates";

interface Props {
  mode: ViewMode;
  setMode: Function;
  date: string;
  setDate: Function;
  className?: string;
}

export default function ViewModeSelector({
  mode,
  setMode,
  date,
  setDate,
  className = "",
}: Props) {
  const onLeftClick: MouseEventHandler = () => {
    const parsed = new Date(date);

    if (mode === "day") {
      parsed.setDate(parsed.getDate() - 1);
      setDate(getDayKey(parsed));
    } else if (mode === "week") {
      parsed.setDate(parsed.getDate() - 7);
      setDate(getWeekKey(parsed));
    } else if (mode === "month") {
      parsed.setMonth(parsed.getMonth() - 1);
      setDate(getMonthKey(parsed));
    }
  };

  const onRightClick: MouseEventHandler = () => {
    const parsed = new Date(date);

    if (mode === "day") {
      parsed.setDate(parsed.getDate() + 1);
      setDate(getDayKey(parsed));
    } else if (mode === "week") {
      parsed.setDate(parsed.getDate() + 7);
      setDate(getWeekKey(parsed));
    } else if (mode === "month") {
      parsed.setMonth(parsed.getMonth() + 1);
      setDate(getMonthKey(parsed));
    }
  };

  const onDateChange: FormEventHandler = (event) =>
    setDate((event.target as HTMLInputElement).value);

  return (
    <div className={`flex flex-row flex-nowrap gap-x-4 shrink-1 ${className}`}>
      <select
        className="bg-gray-dark text-white rounded-md px-4 min-w-0 shrink-1 mr-auto appearance-none cursor-pointer"
        value={mode}
        onChange={(event) => setMode(event.target.value as ViewMode)}
      >
        <option value="day">Day View</option>
        <option value="week">Week View</option>
        <option value="month">Month View</option>
      </select>

      <button
        className="bg-gray-dark text-white rounded-md h-12 w-12 flex flex-col items-center justify-center shrink-0"
        onClick={onLeftClick}
      >
        <ArrowLeft2 size="1rem" />
      </button>

      <input
        className="bg-gray-dark text-white invert-date-icon rounded-md px-4 min-w-0 shrink-1 appearance-none cursor-pointer"
        type={mode === "day" || mode === "week" ? "date" : mode}
        value={date}
        onChange={onDateChange}
      />

      <button
        className="bg-gray-dark text-white rounded-md h-12 w-12 flex flex-col items-center justify-center shrink-0"
        onClick={onRightClick}
      >
        <ArrowRight2 size="1rem" />
      </button>
    </div>
  );
}
