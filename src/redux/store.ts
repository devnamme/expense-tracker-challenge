import { configureStore } from "@reduxjs/toolkit";
import { expenseModalReducer } from "./modules/expense-modal";
import { expensesReducer } from "./modules/expenses";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    expenseModal: expenseModalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
