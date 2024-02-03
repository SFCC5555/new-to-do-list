import { createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../api/get";

const profile = await getRequest("profile");

const initialState = { auth: profile.status, user: profile.data };

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.auth = action.payload.status;
      state.user = action.payload.data;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
