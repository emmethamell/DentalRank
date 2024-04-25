import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import metricsReducer from "./metricsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    metrics: metricsReducer
  },
});