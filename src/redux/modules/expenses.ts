import { createSlice } from "@reduxjs/toolkit";
import { Expense } from "../../types/expense.interface";
import { getDayKey, getMonthKey, getWeekKey } from "../../utils/dates";
import data from "../data";

export interface ExpensesState {
  byID: { [key: number]: Expense };
  byDay: {
    // "YYYY-MM-DD": string[]
    [key: string]: {
      total: number;
      expenses: number[];
    };
  };
  byWeek: {
    // "YYYY-MM-DD": string[]
    [key: string]: {
      total: number;
      expenses: number[];
    };
  };
  byMonth: {
    // "YYYY-MM": string[]
    [key: string]: {
      total: number;
      expenses: number[];
    };
  };
}

export type ExpensesGroupKey = "byDay" | "byWeek" | "byMonth";

const INITIAL_STATE: ExpensesState = {
  byID: {},
  byDay: {},
  byWeek: {},
  byMonth: {},
};

const addToGroup = (
  state: any,
  group: ExpensesGroupKey,
  key: string,
  id: number
) => {
  if (state[group][key] === undefined)
    state[group][key] = { total: 0, expenses: [] };
  state[group][key].expenses.push(id);
};

const calculateTotal = (
  state: any,
  group: "byDay" | "byWeek" | "byMonth",
  key: string
) => {
  state[group][key].total = 0;
  state[group][key].expenses.forEach(
    (id: number) => (state[group][key].total += state.byID[id].amount)
  );
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: <ExpensesState>{ ...INITIAL_STATE },
  reducers: {
    fetchTasks: (state) => {
      state.byID = {};
      state.byDay = {};
      state.byWeek = {};
      state.byMonth = {};

      data.forEach((row: Expense) => {
        state.byID[row.id!] = row;

        const date = new Date(row.date);

        const day = getDayKey(date);
        addToGroup(state, "byDay", day, row.id!);
        state.byDay[day].total += row.amount;

        const week = getWeekKey(date);
        addToGroup(state, "byWeek", week, row.id!);
        state.byWeek[week].total += row.amount;

        const month = getMonthKey(date);
        addToGroup(state, "byMonth", month, row.id!);
        state.byMonth[month].total += row.amount;
      });
    },

    addTask: (
      state,
      action: {
        type: string;
        payload: {
          name: string;
          amount: number;
          date: string;
          category: string;
        };
      }
    ) => {
      const id = Object.keys(state.byID).length + 1;
      state.byID[id] = {
        id: id,
        name: action.payload.name,
        amount: action.payload.amount,
        date: action.payload.date,
        category: action.payload.category,
      };

      const date = new Date(action.payload.date);

      const day = getDayKey(date);
      addToGroup(state, "byDay", day, id);

      const week = getWeekKey(date);
      addToGroup(state, "byWeek", week, id);

      const month = getMonthKey(date);
      addToGroup(state, "byMonth", month, id);

      // (["byDay", "byWeek", "byMonth"] as ExpensesGroupKey[]).forEach(
      //   (group: ExpensesGroupKey) =>
      //     Object.keys(state[group]).forEach((key: string) =>
      //       calculateTotal(state, group, key)
      //     )
      // );
      calculateTotal(state, "byDay", day);
      calculateTotal(state, "byWeek", week);
      calculateTotal(state, "byMonth", month);
    },

    editTask: (
      state,
      action: {
        type: string;
        payload: {
          id: number;
          expense: Expense;
        };
      }
    ) => {
      // TODO edit
      // TODO recalculate totals
    },

    deleteTask: (
      state,
      action: {
        type: string;
        payload: {
          id: string;
        };
      }
    ) => {
      // TODO delete
      // TODO recalculate totals
    },
  },
});

export const { fetchTasks, addTask, editTask, deleteTask } =
  expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;
