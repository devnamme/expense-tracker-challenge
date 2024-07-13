import { configureStore } from "@reduxjs/toolkit";
import { expenseModalReducer } from "./modules/expense-modal";
import { expensesReducer } from "./modules/expenses";
import { paginationReducer } from "./modules/pagination";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    expenseModalState: expenseModalReducer,
    pagination: paginationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
