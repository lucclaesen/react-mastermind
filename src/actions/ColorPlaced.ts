import {Color, Action, ActionType} from "../state";

interface ColorPlacedPayLoad {
    roundId: number;
    color: Color;
    position: number
};

const ColorPlaced = (roundId: number, color: Color, position: number) : Action<ColorPlacedPayLoad> => {
    return {
        type: ActionType.ColorPlaced,
        payLoad: {
            roundId: roundId,
            color: color,
            position: position
        }
    };
}

export {ColorPlaced, ColorPlacedPayLoad};