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

        let localDate = new Date(row.date);
        localDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );
        const localDateString = localDate.toISOString();

        const day = getDayKey(localDateString);
        if (state.byDay[day] === undefined) state.byDay[day] = [];
        state.byDay[day].push(row.id!);

        const week = getWeekKey(row.date);
        if (state.byWeek[week] === undefined) state.byWeek[week] = [];
        state.byWeek[week].push(row.id!);

        const month = getMonthKey(localDateString);
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
          UTCDateString: string;
          localDateString: string;
          category: string;
        };
      }
    ) => {
      const id = Object.keys(state.byID).length + 1;
      state.byID[id] = {
        id: id,
        name: action.payload.name,
        amount: action.payload.amount,
        date: action.payload.UTCDateString,
        category: action.payload.category,
      };

      const day = getDayKey(action.payload.localDateString);
      if (state.byDay[day] === undefined) state.byDay[day] = [];
      state.byDay[day].push(id);

      const week = getWeekKey(action.payload.UTCDateString);
      if (state.byWeek[week] === undefined) state.byWeek[week] = [];
      state.byWeek[week].push(id);

      const month = getMonthKey(action.payload.localDateString);
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
