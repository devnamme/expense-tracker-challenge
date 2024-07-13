import { createSlice } from "@reduxjs/toolkit";
import { Expense } from "../../types/expense.interface";
import { getDayKey, getMonthKey, getWeekKey } from "../../utils/dates";
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
    fetchTasks: (state) => {
      state.byID = {};
      state.byDay = {};
      state.byWeek = {};
      state.byMonth = {};

      data.forEach((row: Expense) => {
        state.byID[row.id!] = row;

        const date = new Date(row.date);

        const day = getDayKey(date);
        if (state.byDay[day] === undefined) state.byDay[day] = [];
        state.byDay[day].push(row.id!);

        const week = getWeekKey(date);
        if (state.byWeek[week] === undefined) state.byWeek[week] = [];
        state.byWeek[week].push(row.id!);

        const month = getMonthKey(date);
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
      if (state.byDay[day] === undefined) state.byDay[day] = [];
      state.byDay[day].push(id);

      const week = getWeekKey(date);
      if (state.byWeek[week] === undefined) state.byWeek[week] = [];
      state.byWeek[week].push(id);

      const month = getMonthKey(date);
      if (state.byMonth[month] === undefined) state.byMonth[month] = [];
      state.byMonth[month].push(id);
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
