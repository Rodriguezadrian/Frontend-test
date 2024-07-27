import { createSlice } from "@reduxjs/toolkit";

const logsSlice = createSlice({
  name: "logs",
  initialState: [],
  reducers: {
    storeInfo(state, action) {
      state.push(action.payload);
    },
    resetInfo(state, action) {
      return (state = []);
    },
  },
});

const { actions, reducer } = logsSlice;
export const { storeInfo, resetInfo } = actions;
export default reducer;
