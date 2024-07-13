import { useEffect, useState } from "react";

export interface DonutChartItem {
  legend: string;
  value: number;
  color: string;
}

interface Arc {
  pathLength: number;
  dasharray: string;
  color: string;
  value: number;
  valueX: number;
  valueY: number;
}

interface Props {
  values: DonutChartItem[];
  className?: string;
}

export default function DonutChart({ values, className = "" }: Props) {
  const [arcs, setArcs] = useState<Arc[]>([]);

  useEffect(() => {
    let temp: Arc[] = [];
    let sum = 0;
    let cumulative = 0;

    // values.forEach(
    //   (value: DonutChartItem) => (value.value = Math.floor(value.value))
    // );
    values.forEach((value: DonutChartItem) => (sum += Math.floor(value.value)));
    values.forEach((value: DonutChartItem, idx: number) => {
      const angle =
        (((cumulative + Math.floor(value.value) / 2) / sum) * 360 * Math.PI) /
        180;

      temp.push({
        pathLength: sum,
        dasharray:
          idx == 0
            ? `${Math.floor(value.value)} ${sum}`
            : `0 ${cumulative} ${Math.floor(value.value)} ${
                sum - cumulative - Math.floor(value.value)
              }`,
        color: value.color,
        value: value.value,
        valueX: 220 * Math.cos(angle),
        valueY: 220 * Math.sin(angle),
      });

      cumulative += Math.floor(value.value);
    });

    setArcs(temp);
  }, [values]);

  return (
    <div
      className={`bg-gray-light rounded-md pb-2 px-4 flex flex-col ${className}`}
    >
      <div className="grow flex flex-col items-center justify-center">
        <svg
          className="h-full w-auto"
          width="32"
          height="32"
          viewBox="-270 -270 540 540"
          xmlns="http://www.w3.org/2000/svg"
        >
          {arcs.map((arc: Arc, idx: number) =>
            arc.value > 0 || idx == arcs.length - 1 ? (
              <circle
                key={`donut-circle-${idx}`}
                r="160"
                stroke={arc.color}
                strokeWidth="40"
                pathLength={arc.pathLength}
                strokeDasharray={arc.dasharray}
                fill="none"
              />
            ) : null
          )}
          {arcs.map((arc: Arc, idx: number) =>
            arc.value > 0 || idx == arcs.length - 1 ? (
              <text
                key={`donut-text-${idx}`}
                x={arc.valueX || 0}
                y={arc.valueY || 0}
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-4xl"
              >
                {arc.value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </text>
            ) : null
          )}
        </svg>
      </div>

      <div className="flex flex-row flex-wrap align-center justify-center gap-x-4">
        {values.map((item: DonutChartItem, idx: number) => (
          <div key={`donut-legend-${idx}`} className="text-sm">
            <div
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor: item.color,
              }}
            />
            {item.legend}
          </div>
        ))}
      </div>
    </div>
  );
}
