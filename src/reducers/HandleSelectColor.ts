import {ColorSelection, Action, ActionType, ActionBase, Color} from "../state";

export const HandleSelectColor = (state: ColorSelection = { color : Color.Yellow}, action: ActionBase) : ColorSelection => {
    switch(action.type) {
        case ActionType.SelectColor:
            const selectColorAction = action as Action<Color>;
            const newModel = Object.assign({}, state, { color : selectColorAction.payLoad });
            return newModel;
        default: return state; 
    }
}