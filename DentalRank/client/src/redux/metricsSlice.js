import { createSlice } from '@reduxjs/toolkit';

const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {},
  reducers: {
    updateMetrics: (state, action) => {
      const { key, min, max } = action.payload;
      state[key] = { min, max };
    },
  },
}); 

export const { updateMetrics } = metricsSlice.actions;

export default metricsSlice.reducer;