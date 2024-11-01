import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import memberReducer from "./membership/memberSlice";
import transactionReducer from "./transaction/transactionSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: memberReducer,
    transaction: transactionReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
