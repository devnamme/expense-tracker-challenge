import { useState } from "react";
import DonutChart from "../components/charts/donut-chart";
import LineChart from "../components/charts/line-chart";
import Total from "../components/total";
import ViewModeSelector from "../components/view-mode-selector";
import { ViewMode } from "../types/view-mode.interface";

export default function HomePage() {
  const [mode, setMode] = useState<ViewMode>("day");
  const [date, setDate] = useState<string>(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
  );

  return (
    <div className="flex flex-col gap-y-6 grow">
      <ViewModeSelector
        mode={mode}
        setMode={setMode}
        date={date}
        setDate={setDate}
      />

      <Total value={0} className="" />

      <LineChart className="grow" />

      <DonutChart className="grow" />
    </div>
  );
}
