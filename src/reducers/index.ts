import {ActionLogger} from "./ActionLogger";
import {HandleSelectColor} from "./HandleSelectColor";
import SecretReducer from "./Secret";
import GameReducer from "./GameReducer";
import {Model} from "../state";
import * as Redux from "redux";

const Reducer = Redux.combineReducers<Model>({ 
    selectedColor : HandleSelectColor, 
    secret: SecretReducer, 
    game: GameReducer
});

export default Reducer;