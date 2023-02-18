import { createSlice } from "@reduxjs/toolkit";

export const featureData = createSlice({
  name: "featureData",
  initialState: {
    value: [],
  },
  reducers: {
    changeFeatureData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFeatureData } = featureData.actions;

export const currentFeatureData = (state) => state.featureData.value;
export default featureData.reducer;
