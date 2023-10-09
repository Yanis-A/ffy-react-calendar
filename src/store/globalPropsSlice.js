import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toDateString(),
};

const globalPropsSlice = createSlice({
  name: "globalProps",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
