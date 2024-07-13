import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DonutChart, { DonutChartItem } from "../components/charts/donut-chart";
import LineChart, { LineChartItem } from "../components/charts/line-chart";
import { Categories } from "../constants/categories";
import { ExpensesGroupKey } from "../redux/modules/expenses";
import { RootState } from "../redux/store";
import { getDayKey, getMonthKey, getWeekKey } from "../utils/dates";

export default function HomePage() {
  const expenses = useSelector((state: RootState) => state.expenses);
  const pagination = useSelector((state: RootState) => state.pagination);

  const [lineItems, setLineItems] = useState<LineChartItem[]>([]);
  const [donutItems, setDonutItems] = useState<DonutChartItem[]>([]);

  const getGroup = () =>
    `by${pagination.mode[0].toUpperCase()}${pagination.mode.substring(
      1
    )}` as ExpensesGroupKey;

  useEffect(() => {
    let temp: { [key: string]: DonutChartItem } = {};

    Object.keys(Categories).forEach(
      (key: string) =>
        (temp[key] = {
          legend: Categories[key].name,
          value: 0,
          color: Categories[key].color,
        })
    );

    if (expenses[getGroup()][pagination.date] !== undefined) {
      expenses[getGroup()][pagination.date].expenses.forEach(
        (expenseID: number) =>
          (temp[expenses.byID[expenseID].category].value +=
            expenses.byID[expenseID].amount)
      );
    }

    let newItems: DonutChartItem[] = [];
    Object.keys(Categories).forEach((key: string) => newItems.push(temp[key]));

    setDonutItems(newItems);

    //////////////////////////////////////////////////
    let tempLines: LineChartItem[] = [];
    let date: Date = new Date(pagination.date);

    if (pagination.mode === "day") {
      date.setDate(date.getDate() - 20);

      for (let i = 0; i < 21; i++) {
        let key = getDayKey(date);
        tempLines.push({
          value:
            expenses.byDay[key] === undefined ? 0 : expenses.byDay[key].total,
          label: key,
        });

        date.setDate(date.getDate() + 1);
      }
    } else if (pagination.mode === "week") {
      date.setDate(date.getDate() - 7 * 20);

      for (let i = 0; i < 21; i++) {
        let key = getWeekKey(date);
        tempLines.push({
          value:
            expenses.byWeek[key] === undefined ? 0 : expenses.byWeek[key].total,
          label: key,
        });

        date.setDate(date.getDate() + 7);
      }
    } else if (pagination.mode === "month") {
      date.setMonth(date.getMonth() - 12);

      for (let i = 0; i < 13; i++) {
        let key = getMonthKey(date);
        tempLines.push({
          value:
            expenses.byMonth[key] === undefined
              ? 0
              : expenses.byMonth[key].total,
          label: key,
        });

        date.setMonth(date.getMonth() + 1);
      }
    }

    setLineItems(tempLines);
  }, [expenses, pagination.mode, pagination.date]);

  return (
    <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-8 grow min-h-0">
      <LineChart
        values={lineItems}
        className="min-h-0 h-full grow"
        horizontalStep={
          pagination.mode === "day" ? 5 : pagination.mode === "week" ? 5 : 2
        }
        verticalStep={
          pagination.mode === "day"
            ? 500
            : pagination.mode === "week"
            ? 1000
            : 3000
        }
      />
      <DonutChart values={donutItems} className="min-h-0 h-full grow" />
    </div>
  );
}
