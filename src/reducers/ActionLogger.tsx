import {Model, Action} from "../state";

export const ActionLogger = (state: Model, action: Action<any>) : Model => {
    console.log(`Handling action of type ${action.type}`);
    return state;
}