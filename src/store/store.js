import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./globalPropsSlice";
import { localStorageMiddleware } from "../middleware/localStorageMiddleware";

const storedEvents = JSON.parse(
  localStorage.getItem("ffy-react-calendar-events")
);

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
  preloadedState: {
    globalProps: {
      date: new Date().toDateString(),
      isModalOpen: false,
      isCalendarOpen: false,
      events: storedEvents || {},
      banner: {
        type: "",
        message: "",
        uuid: "",
      },
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
