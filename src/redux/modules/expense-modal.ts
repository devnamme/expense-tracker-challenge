import { createSlice } from "@reduxjs/toolkit";
import { Expense } from "../../types/expense";

export interface ExpenseModalState {
  active: boolean;
  expense: Expense | null;
}

const INITIAL_STATE: ExpenseModalState = {
  active: false,
  expense: null,
};

const expenseModalSlice = createSlice({
  name: "expenseModal",
  initialState: <ExpenseModalState>{ ...INITIAL_STATE },
  reducers: {
    setAdding: (state, _) => {
      state.active = true;
      state.expense = null;
    },

    setEditing: (state, action) => {
      state.active = true;
      state.expense = action.payload.expense;
    },

    closeModal: (state, _) => {
      state.active = false;
    },
  },
});

export const { setAdding, setEditing, closeModal } = expenseModalSlice.actions;
export const expenseModalReducer = expenseModalSlice.reducer;
