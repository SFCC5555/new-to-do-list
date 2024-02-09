import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;
