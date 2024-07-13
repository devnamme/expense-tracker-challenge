import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DonutChart from "../components/charts/donut-chart";
import LineChart from "../components/charts/line-chart";
import Total from "../components/total";
import ViewModeSelector from "../components/view-mode-selector";
import { ExpensesGroupKey } from "../redux/modules/expenses";
import { RootState } from "../redux/store";
import { ViewMode } from "../types/view-mode.interface";
import { getWeekKey } from "../utils/dates";

export default function HomePage() {
  const expenses = useSelector((state: RootState) => state.expenses);

  const [mode, setMode] = useState<ViewMode>("day");
  const [date, setDate] = useState<string>(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
  );

  const switchMode = (newMode: ViewMode) => {
    setMode(newMode);

    if (mode == "day") {
      if (newMode == "month") setDate(date.substring(0, 7));
      else if (newMode == "week") setDate(getWeekKey(new Date(date)));
    } else if (mode == "week") {
      if (newMode == "month") setDate(date.substring(0, 7));
    } else if (mode == "month") {
      if (newMode == "day") setDate(`${date.substring(0, 7)}-01`);
      else if (newMode == "week") setDate(getWeekKey(new Date(date)));
    }
  };

  const switchDate = (newDate: string) => {
    if (mode === "week") setDate(getWeekKey(new Date(newDate)));
    else setDate(newDate);
  };

  const getGroup = () =>
    `by${mode[0].toUpperCase()}${mode.substring(1)}` as ExpensesGroupKey;

  useEffect(() => console.log(expenses), [expenses]);

  return (
    <div className="flex flex-col gap-y-6 grow">
      <ViewModeSelector
        mode={mode}
        setMode={switchMode}
        date={date}
        setDate={switchDate}
      />

      <Total
        value={
          expenses[getGroup()][date] === undefined
            ? 0
            : expenses[getGroup()][date].total
        }
        className=""
      />

      <LineChart className="grow" />

      <DonutChart className="grow" />
    </div>
  );
}
