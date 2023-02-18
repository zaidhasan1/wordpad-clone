import { createSlice } from "@reduxjs/toolkit";

export const fontFamilyData = createSlice({
  name: "fontFamilyData",
  initialState: {
    value: "Courier New",
  },
  reducers: {
    changeFontFamilyData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFontFamilyData } = fontFamilyData.actions;

export const currentFontFamilyData = (state) => state.fontFamilyData.value;
export default fontFamilyData.reducer;
