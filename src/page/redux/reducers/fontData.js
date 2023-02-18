import { createSlice } from "@reduxjs/toolkit";

export const fontData = createSlice({
  name: "fontData",
  initialState: {
    value: 14,
  },
  reducers: {
    changeFontData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFontData } = fontData.actions;

export const currentFontData = (state) => state.fontData.value;
export default fontData.reducer;
