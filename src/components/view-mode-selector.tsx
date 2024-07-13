import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { FormEventHandler, MouseEventHandler } from "react";
import { ViewMode } from "../types/view-mode.interface";

interface Props {
  mode: ViewMode;
  setMode: Function;
  date: string;
  setDate: Function;
}

export default function ViewModeSelector({
  mode,
  setMode,
  date,
  setDate,
}: Props) {
  const onLeftClick: MouseEventHandler = (event) => {
    // TODO
  };

  const onRightClick: MouseEventHandler = (event) => {
    // TODO
  };

  const onDateChange: FormEventHandler = (event) => {
    // TODO
  };

  return (
    <div className="flex flex-row flex-nowrap gap-x-4 shrink-1">
      <select
        className="bg-gray-200 rounded-md px-4 min-w-0 shrink-1 mr-auto appearance-none cursor-pointer"
        value={mode}
        onChange={(event) => setMode(event.target.value as ViewMode)}
      >
        <option value="day">Day View</option>
        <option value="week">Week View</option>
        <option value="month">Month View</option>
      </select>

      <button
        className="bg-gray-200 rounded-md h-12 w-12 flex flex-col items-center justify-center shrink-0"
        onClick={onLeftClick}
      >
        <ArrowLeft2 size="1rem" />
      </button>

      <input
        className="bg-gray-200 rounded-md px-4 min-w-0 shrink-1 cursor-pointer"
        type={mode === "day" ? "date" : mode}
        onChange={onDateChange}
      />

      <button
        className="bg-gray-200 rounded-md h-12 w-12 flex flex-col items-center justify-center shrink-0"
        onClick={onRightClick}
      >
        <ArrowRight2 size="1rem" />
      </button>
    </div>
  );
}
