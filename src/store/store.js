import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./globalPropsSlice";

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
  preloadedState: {
    globalProps: {
      date: new Date().toDateString(),
      isModalOpen: false,
      isCalendarOpen: false,
      events: {}
    }
  }
});

export default store;
