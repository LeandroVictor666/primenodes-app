import * as ReduxToolkit from "@reduxjs/toolkit";
import { AccountData } from "@/types/Account/AccountData";
import { stat } from "fs";
const UPDATE_AUTH = "Authentication@UPDATEAUTH";
const REMOVE_AUTH = "Authentication@REMOVEAUTH";

const initialState: AccountData = {
    email: undefined,
    full_name: undefined,
    token: undefined,
};

const slice = ReduxToolkit.createSlice({
    name: "Authentication",
    initialState: initialState,
    reducers: {
        updateAuth(state, action) {
            state.email = action.payload.email;
            state.full_name = action.payload.full_name;
            state.token = action.payload.token;
        },
        removeAuth(state) {
            state.email = initialState.email;
            state.full_name = initialState.full_name;
            state.token = initialState.token;
        },
    },
});
export const { updateAuth, removeAuth } = slice.actions;
export default slice.reducer;
