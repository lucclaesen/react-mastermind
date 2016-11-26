import {ActionLogger} from "./ActionLogger";
import {HandleSelectColor} from "./HandleSelectColor";
import SecretReducer from "./Secret";
import GameReducer from "./GameReducer";
import {Model, ActionBase} from "../state";
import * as Redux from "redux";


const Reducer = (model: any = {}, action: ActionBase) => {
    const selectedColor = HandleSelectColor(model.selectedColor, action);
    const secret = SecretReducer(model.secret, action);
    const game =  GameReducer(model.game, action, selectedColor, secret);
    return {
        selectedColor: selectedColor,
        secret: secret,
        game: game
    };
}


// const Reducer = Redux.combineReducers<Model>({ 
//     selectedColor : HandleSelectColor, 
//     secret: SecretReducer, 
//     game: GameReducer
// });

export default Reducer;