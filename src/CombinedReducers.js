import { combineReducers } from "redux";
import context from "./Framework/Dynamic.Reducers";

export default function createReducers(dynamicReducer) {
    const staticReducers = {
        context
    };

    return combineReducers(Object.assign(staticReducers, dynamicReducer));
}