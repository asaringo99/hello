// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { paramsReducer } from "./reducers/paramstable/Reducer";

export const store = configureStore({
  reducer: paramsReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;