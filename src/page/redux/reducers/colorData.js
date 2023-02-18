import { createSlice } from "@reduxjs/toolkit";

export const colorData = createSlice({
  name: "colorData",
  initialState: {
    value: {
      textColor: "black",
      textBackgroundColor: "white",
    },
  },
  reducers: {
    changeColorData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeColorData } = colorData.actions;

export const currentColorData = (state) => state.colorData.value;
export default colorData.reducer;
