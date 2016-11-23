import {Color, Action, ActionType} from "../state";


export const SelectColor = (color: Color): Action<Color> => {
    return {
        type: ActionType.SelectColor,
        payLoad: color
    };
}