import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toDateString(),
  isModalOpen: false,
  isCalendarOpen: false,
};

const globalPropsSlice = createSlice({
  name: "globalProps",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsCalendarOpen: (state, action) => {
      state.isCalendarOpen = action.payload;
    },
  },
});

export const { setDate, setIsModalOpen, setIsCalendarOpen } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
