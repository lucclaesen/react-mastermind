import {ActionBase, ActionType} from "../state";

export default () : ActionBase => {
    return { 
        type: ActionType.RestartGame
    }
}