import { configureStore } from "@reduxjs/toolkit";
import vinReducer from "./vanslise";

export const store = configureStore({
  reducer: {
    vinValue: vinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
