import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import metricsReducer from "./metricsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    metrics: metricsReducer
  },
});