import {ActionBase, ActionType} from "../state";

const RestartGame = () : ActionBase => {
    return { 
        type: ActionType.RestartGame
    }
}

export {RestartGame};