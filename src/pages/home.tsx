import { useState } from "react";
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
    <>
      <ViewModeSelector
        mode={mode}
        setMode={setMode}
        date={date}
        setDate={setDate}
      />
    </>
  );
}
