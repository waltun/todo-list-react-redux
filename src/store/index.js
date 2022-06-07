// import slices
import todoReducer from "./slices/todoSlice";
import loadingReducer from "./slices/loadingSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    loading: loadingReducer,
  },
});
