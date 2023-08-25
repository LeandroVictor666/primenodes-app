import * as ReduxToolkit from "@reduxjs/toolkit";
import AuthenticationRedux from "./Authentication.redux";
import CounterRedux from "./Counter.Redux";

const reducer = ReduxToolkit.combineReducers({AuthenticationRedux ,CounterRedux});
const store = ReduxToolkit.createStore(reducer);
export default store;