import { createSlice } from '@reduxjs/toolkit'


export const getLocalData = createSlice({
    name: 'getLocalData',
    initialState: {
        value: ""
    },
    reducers: {
        setChange: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setChange
} = getLocalData.actions

export const currentLocalValue = (state) => state.getLocalData.value;
export default getLocalData.reducer;
