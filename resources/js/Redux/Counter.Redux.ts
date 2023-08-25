import * as ReduxToolkit from "@reduxjs/toolkit";
const INCREMENT = "Counter@INCREMENT";
const DECREMENT = "Counter@DECREMENT";

export const incrementCounter = ReduxToolkit.createAction(INCREMENT);
export const decrementCounter = () => ({ type: DECREMENT, payload: 1 });
const initialState: number = 0;
const reducer = (
    state = initialState,
    action: ReduxToolkit.PayloadAction<number>
) => {
    
    switch (action.type) {
        case INCREMENT: {
            var newState = state;
            newState += action.payload;
            return newState + action.payload;
        }
        case DECREMENT: {
            return state - action.payload;
        }
        default:
            return state;
    }
};
export default reducer;
