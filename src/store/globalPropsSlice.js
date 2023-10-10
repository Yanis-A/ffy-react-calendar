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
  },
});

export const { setDate, setIsModalOpen, setIsCalendarOpen, setEvents, setBanner } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
