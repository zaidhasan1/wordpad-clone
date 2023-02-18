import { createSlice } from '@reduxjs/toolkit'

export const localString = createSlice({
    name: 'localString',
    initialState: {
        value: "",
    },
    reducers: {

    },
})


export const stringData = (state) => state.localString.value
export default localString.reducer;
