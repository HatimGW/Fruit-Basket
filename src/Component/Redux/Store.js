import { applyMiddleware, legacy_createStore } from "redux";
import root from "./Combine";
import {thunk} from "redux-thunk"

const store = legacy_createStore(root,applyMiddleware(thunk))
export default store;