import { createSlice } from "@reduxjs/toolkit";

export const textAlign = createSlice({
  name: "textAlign",
  initialState: {
    value: "left",
  },
  reducers: {
    changeTextAlign: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTextAlign } = textAlign.actions;

export const currentTextAlign = (state) => state.textAlign.value;
export default textAlign.reducer;
