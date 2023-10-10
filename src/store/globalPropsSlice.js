import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date().toDateString(),
  isModalOpen: false,
  isCalendarOpen: false,
  events: {},
  banner: {
    type: "",
    message: "",
    uuid: "",
  },
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
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
    deleteEvent: (state, action) => {
      const eventIdToDelete = action.payload;
      state.events = Object.keys(state.events).reduce((acc, date) => {
        acc[date] = state.events[date].filter((event) => event.id !== eventIdToDelete);
        if (acc[date].length === 0) {
          delete acc[date];
        }
        return acc;
      }, {});
    },
  },
});

export const { setDate, setIsModalOpen, setIsCalendarOpen, setEvents, setBanner, deleteEvent } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
