import {Color, Action, ActionType} from "../state";

interface ColorPlacedPayLoad {
    roundId: number;
    position: number
};

const ColorPlaced = (roundId: number, position: number) : Action<ColorPlacedPayLoad> => {
    console.log("color placed");
    return {
        type: ActionType.ColorPlaced,
        payLoad: {
            roundId: roundId,
            position: position
        }
    };
}

export {ColorPlaced, ColorPlacedPayLoad};