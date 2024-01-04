import Reducer, { Reducer2, Reducer3, Reducer4, Reducer5, Reducer6, Reducer7, Reducer8 } from "./Reducer"
import {combineReducers} from "redux"

const root = combineReducers({
    items:Reducer,
    items2:Reducer2,
    items3:Reducer3,
    items4:Reducer4,
    items5:Reducer5,
    items6:Reducer6,
    items7:Reducer7,
    items8:Reducer8
})
export default root;