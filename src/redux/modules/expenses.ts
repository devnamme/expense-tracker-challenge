import { createSlice } from "@reduxjs/toolkit";
import { Expense } from "../../types/expense.interface";
import data from "../data";

export interface ExpensesState {
  byID: { [key: number]: Expense };
  byDay: {
    [key: string]: number[];
    // "YYYY-MM-DD": string[]
  };
  byWeek: {
    [key: string]: number[];
    // "YYYY-MM-DD": string[]
    // DD should be day 0 (Sunday)
  };
  byMonth: {
    [key: string]: number[];
    // "YYYY-MM": string[]
  };
}

const INITIAL_STATE: ExpensesState = {
  byID: {},
  byDay: {},
  byWeek: {},
  byMonth: {},
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: <ExpensesState>{ ...INITIAL_STATE },
  reducers: {
    fetchTasks: (state, _) => {
      data.forEach((row: Expense) => {
        state.byID[row.id!] = row;

        const day = row.date.substring(0, 10);
        if (state.byDay[day] === undefined) state.byDay[day] = [];
        state.byDay[day].push(row.id!);

        const foo = new Date(row.date);
        foo.setDate(foo.getDate() - foo.getDay());
        const week = foo.toISOString().substring(0, 10);
        if (state.byWeek[week] === undefined) state.byWeek[week] = [];
        state.byWeek[week].push(row.id!);

        const month = row.date.substring(0, 7);
        if (state.byMonth[month] === undefined) state.byMonth[month] = [];
        state.byMonth[month].push(row.id!);
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
      // TODO
    },

    editTask: (state, action) => {
      // TODO
    },

    deleteTask: (state, action) => {
      // TODO
    },
  },
});

export const { fetchTasks, addTask, editTask, deleteTask } =
  expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;
