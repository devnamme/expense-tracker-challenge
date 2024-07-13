import { createSlice } from "@reduxjs/toolkit";
import { ViewMode } from "../../types/view-mode.interface";
import { getDayKey, getWeekKey } from "../../utils/dates";

export interface PaginationState {
  mode: ViewMode;
  date: string;
}

const INITIAL_STATE: PaginationState = {
  mode: "day",
  date: getDayKey(new Date()),
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState: <PaginationState>{ ...INITIAL_STATE },
  reducers: {
    setMode: (
      state: any,
      action: {
        type: string;
        payload: {
          mode: ViewMode;
        };
      }
    ) => {
      if (state.mode == "day") {
        if (action.payload.mode == "month")
          state.date = state.date.substring(0, 7);
        else if (action.payload.mode == "week")
          state.date = getWeekKey(new Date(state.date));
      } else if (state.mode == "week") {
        if (action.payload.mode == "month")
          state.date = state.date.substring(0, 7);
      } else if (state.mode == "month") {
        if (action.payload.mode == "day")
          state.date = `${state.date.substring(0, 7)}-01`;
        else if (action.payload.mode == "week")
          state.date = getWeekKey(new Date(state.date));
      }

      state.mode = action.payload.mode;
    },

    setDate: (
      state: any,
      action: {
        type: string;
        payload: {
          date: string;
        };
      }
    ) => {
      if (state.mode === "week")
        state.date = getWeekKey(new Date(action.payload.date));
      else state.date = action.payload.date;
    },
  },
});

export const { setMode, setDate } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
