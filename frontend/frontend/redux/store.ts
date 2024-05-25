import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/slice/authSlice";
import { apiSlice } from "./features/slice/apiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});
export default store;