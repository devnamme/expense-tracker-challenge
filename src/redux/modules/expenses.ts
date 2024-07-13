import { createSlice } from "@reduxjs/toolkit";
import { Expense } from "../../types/expense.interface";
import { getDayKey, getMonthKey, getWeekKey } from "../../utils/dates";
import data from "../data";

export interface ExpensesState {
  byID: { [key: number]: Expense };
  byDay: {
    total: number;
    expenses: {
      [key: string]: number[];
      // "YYYY-MM-DD": string[]
    };
  };
  byWeek: {
    total: number;
    expenses: {
      [key: string]: number[];
      // "YYYY-MM-DD": string[]
      // DD should be day 0 (Sunday)
    };
  };
  byMonth: {
    total: number;
    expenses: {
      [key: string]: number[];
      // "YYYY-MM": string[]
    };
  };
}

const INITIAL_STATE: ExpensesState = {
  byID: {},
  byDay: { total: 0, expenses: {} },
  byWeek: { total: 0, expenses: {} },
  byMonth: { total: 0, expenses: {} },
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: <ExpensesState>{ ...INITIAL_STATE },
  reducers: {
    fetchTasks: (state) => {
      state.byID = {};
      state.byDay = { total: 0, expenses: {} };
      state.byWeek = { total: 0, expenses: {} };
      state.byMonth = { total: 0, expenses: {} };

      data.forEach((row: Expense) => {
        state.byID[row.id!] = row;

        const date = new Date(row.date);

        const day = getDayKey(date);
        if (state.byDay.expenses[day] === undefined)
          state.byDay.expenses[day] = [];
        state.byDay.expenses[day].push(row.id!);

        const week = getWeekKey(date);
        if (state.byWeek.expenses[week] === undefined)
          state.byWeek.expenses[week] = [];
        state.byWeek.expenses[week].push(row.id!);

        const month = getMonthKey(date);
        if (state.byMonth.expenses[month] === undefined)
          state.byMonth.expenses[month] = [];
        state.byMonth.expenses[month].push(row.id!);
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
      if (state.byDay.expenses[day] === undefined)
        state.byDay.expenses[day] = [];
      state.byDay.expenses[day].push(id);

      const week = getWeekKey(date);
      if (state.byWeek.expenses[week] === undefined)
        state.byWeek.expenses[week] = [];
      state.byWeek.expenses[week].push(id);

      const month = getMonthKey(date);
      if (state.byMonth.expenses[month] === undefined)
        state.byMonth.expenses[month] = [];
      state.byMonth.expenses[month].push(id);
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
      // TODO
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
      // TODO
    },
  },
});

export const { fetchTasks, addTask, editTask, deleteTask } =
  expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;
