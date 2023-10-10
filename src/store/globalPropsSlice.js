import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toDateString(),
  isModalOpen: false,
  isCalendarOpen: false,
  events: {}
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
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setDate, setIsModalOpen, setIsCalendarOpen, setEvents } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
