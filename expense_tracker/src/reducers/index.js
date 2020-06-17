import {combineReducers} from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import listReducers from "./listReducers";
import eventReducers from "./eventReducers";

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    list:listReducers,
    events:eventReducers
});