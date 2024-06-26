import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    doctor: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
    setDoctor: (state, action) => {
      state.doctor = action.payload.doctor;
      // state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.user = null;
      state.doctor = null;
      state.token = null;
    },
  },
});

export const { setUser, setDoctor, clearAuth } = userSlice.actions;

export default userSlice.reducer;
