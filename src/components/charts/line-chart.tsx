import { useEffect, useState } from "react";

export interface LineChartItem {
  value: number;
  label: string;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Props {
  values: LineChartItem[];
  className?: string;
}

export default function LineChart({ values, className = "" }: Props) {
  const [path, setPath] = useState("");

  useEffect(() => {
    let maxValue = 0;
    values.forEach((value: LineChartItem) => {
      if (value.value > maxValue) maxValue = value.value;
    });

    let newPath = `M0 ${200 - Math.floor((values[0].value / maxValue) * 200)}`;

    [...Array(values.length - 1)].forEach((_, idx: number) => {
      newPath += ` L${Math.floor((idx + 1) * (400 / (values.length - 1)))} ${
        200 - Math.floor((values[idx + 1].value / maxValue) * 200)
      }`;
    });

    setPath(newPath);
  }, [values]);

  return (
    <div
      className={`bg-gray-light rounded-md p-2 grid grid-cols-[2.5rem_1fr] grid-rows-[1fr_1.5rem] w-full ${className}`}
    >
      <div className="relative"></div>

      <div className="flex flex-col items-center justify-center overflow-y-clip min-h-0">
        <svg
          className="h-auto w-auto"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMaxYMax"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path} stroke="black" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div />

      <div
        className="relative grid"
        style={{
          gridTemplateColumns: `repeat(${values.length}, 1fr)`,
        }}
      ></div>
    </div>
  );
}
