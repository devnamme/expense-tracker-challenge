import { useEffect, useState } from "react";

export interface LineChartItem {
  value: number;
  label: string;
}

interface VerticalLegend {
  label: string;
  y: number;
}

interface Props {
  values: LineChartItem[];
  horizontalStep?: number;
  verticalStep?: number;
  className?: string;
}

export default function LineChart({
  values,
  horizontalStep = 1,
  verticalStep = 500,
  className = "",
}: Props) {
  const [path, setPath] = useState("");
  const [maxValue, setMaxValue] = useState(1);
  const [verticalLegends, setVerticalLegends] = useState<VerticalLegend[]>([]);

  useEffect(() => {
    let maxVal = 0;
    values.forEach((value: LineChartItem) => {
      if (value.value > maxVal) maxVal = value.value;
    });
    if (maxVal === 0) maxVal = 1;
    setMaxValue(maxVal);

    setVerticalLegends(
      [
        ...Array(Math.floor((maxVal - verticalStep / 5) / verticalStep) + 1),
      ].map(
        (_, idx: number) =>
          ({
            label: (idx * verticalStep).toFixed(2),
            y: 200 - ((idx * verticalStep) / maxVal) * 200,
          } as VerticalLegend)
      )
    );

    if (values.length > 0) {
      let newPath = `M0 ${200 - Math.floor((values[0].value / maxVal) * 200)}`;

      [...Array(values.length - 1)].forEach((_, idx: number) => {
        newPath += ` L${Math.floor((idx + 1) * (400 / (values.length - 1)))} ${
          200 - Math.floor((values[idx + 1].value / maxVal) * 200)
        }`;
      });

      setPath(newPath);
    } else {
      setPath("");
    }
  }, [values]);

  return (
    <div className={`bg-gray-light rounded-md py-2 px-4 w-full ${className}`}>
      <svg
        className="h-full w-full overflow-visible"
        viewBox="-50 -10 500 230"
        preserveAspectRatio="xMidYMid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0 L0 200 L400 200"
          strokeWidth="1"
          fill="none"
          className="stroke-black/50"
        />

        <path
          d={path}
          strokeWidth="2"
          fill="none"
          className="stroke-primary-dark"
        />

        {values.map((value: LineChartItem, idx: number) =>
          idx % horizontalStep == 0 ? (
            <text
              key={`line-legend-${idx}`}
              x={idx * (400 / (values.length - 1))}
              y={220}
              dominantBaseline="auto"
              textAnchor="middle"
              className="text-sm leading-none"
            >
              {value.label}
            </text>
          ) : null
        )}

        <text
          x={-10}
          y={0}
          dominantBaseline="auto"
          textAnchor="end"
          className="text-sm leading-none"
        >
          {maxValue.toFixed(2)}
        </text>

        {verticalLegends.map((legend: VerticalLegend, idx: number) => (
          <text
            key={`line-vert-legend-${idx}`}
            x={-10}
            y={legend.y}
            dominantBaseline="auto"
            textAnchor="end"
            className="text-sm leading-none"
          >
            {legend.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
