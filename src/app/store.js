import { configureStore } from "@reduxjs/toolkit";
import bookSReducer from "../features/bookSlice";

export const store = configureStore({
  reducer: {
   books: bookSReducer
  }
});