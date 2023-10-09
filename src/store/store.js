import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./globalPropsSlice";

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
  preloadedState: {
    globalProps: {
      date: new Date().toDateString(),
    }
  }
});

export default store;
