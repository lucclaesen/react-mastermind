/**
 * Colors
 */

export enum GameState {
    Playing,
    Failed,
    Success
}

export enum Color {
    Red,
    Green,
    Yellow,
    Blue, 
    Purple,
    None
}

export const colorNames = [
    "red",
    "green",
    "yellow",
    "blue",
    "purple",
    "lightgray"
]

export interface ColorSelection {
    color: Color;
}

/**
 * Rounds
 */

export interface ColorPlacement {
    position: number;
    color: Color;
}

export interface Guess {
    colorPlacements: ColorPlacement[];
}

export interface FeedBack {
    nbrColorAndPositionOk: number;
    nrbColorOkInWrongPosition: number;
    nbrWrong: number
}

export interface Round {
    sequenceNbr: number;
    guess: Guess;
    feedBack?: FeedBack;
}

export interface Game {
    currentRoundNbr: number;
    rounds: Round[];
    gameState: GameState;
}

/**
 * Final Model
 */

export interface Model {
    selectedColor: ColorSelection;
    secret: Color[];
    game: Game;
}





