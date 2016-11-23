import {ActionLogger} from "./ActionLogger";
import {HandleSelectColor} from "./HandleSelectColor";
import {Model} from "../state";
import * as Redux from "redux";

const Reducer = Redux.combineReducers<Model>({ selectedColor : HandleSelectColor});

export default Reducer;