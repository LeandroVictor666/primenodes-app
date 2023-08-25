import * as ReduxToolkit from "@reduxjs/toolkit";
import { AccountData } from "@/types/Account/AccountData";
const UPDATE_AUTH = "Authentication@UPDATEAUTH";
const REMOVE_AUTH = "Authentication@REMOVEAUTH";


export const updateAuth = ReduxToolkit.createAction(UPDATE_AUTH);
export const removeAuth = () => ({ type: REMOVE_AUTH });

const initialState: AccountData | undefined = {
    email: undefined,
    full_name: undefined,
    token: undefined,
};

const reducer = (
    state = initialState,
    action: ReduxToolkit.PayloadAction<AccountData>
) => {
    switch (action.type) {
        case UPDATE_AUTH: {
            
            var newState = state;
            newState = action.payload;

            return newState;
        }
        case REMOVE_AUTH: {
            return undefined;
        }
        default: {
            return state;
        }
    }
};

export default reducer;
