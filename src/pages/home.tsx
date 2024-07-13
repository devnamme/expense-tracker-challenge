import DonutChart from "../components/charts/donut-chart";
import LineChart from "../components/charts/line-chart";

export default function HomePage() {
  return (
    <>
      <LineChart className="grow" />
      <DonutChart className="grow" />
    </>
  );
}
