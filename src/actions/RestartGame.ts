import {ActionBase, ActionType} from "../state";

const RestartGame = () : ActionBase => {
    console.log("restart requested");
    return { 
        type: ActionType.RestartGame
    }
}

export {RestartGame};