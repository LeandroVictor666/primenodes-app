import * as ReduxToolkit from "@reduxjs/toolkit";
const slice = ReduxToolkit.createSlice({
    name: "counter",
    initialState: {
        total: 0,
    },
    reducers: {
        incrementCounter(state) {
            state.total++;
        },
        decrementCounter(state) {
            state.total--;
        },
        changeCounter(state, action) {
            state.total = action.payload;
        },
    },
});

export const { incrementCounter, decrementCounter, changeCounter } =
    slice.actions;
export default slice.reducer;
