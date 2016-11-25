import {Color, ActionBase, ActionType} from "../state";

const createSecret = () : Color[] => {
    const res = [];
    for(let i=0; i < 4; i++) {
        res.push(Math.floor(Math.random() * 5));
    }
    return res;
}

const SecretReducer = (secret: Color[] = createSecret(), action : ActionBase) : Color[] => {
    switch(action.type) {
        case ActionType.RestartGame:
            return createSecret();
        default:
            return secret;
    }
}

export default SecretReducer;