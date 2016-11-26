export interface ActionBase {
    type: ActionType;
}

export interface Action<P> extends ActionBase {
    payLoad: P;
}

export enum ActionType {
    SelectColor,
    RestartGame,
    ColorPlaced,
    SubmitGuess
}

