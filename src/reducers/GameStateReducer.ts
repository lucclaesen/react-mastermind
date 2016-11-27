import * as State from "../state";

const GameStateReducer = (gameState: State.GameState = State.GameState.Playing, action: State.ActionBase, rounds: State.Round[]) : State.GameState => {
    switch(action.type) {
        case State.ActionType.SubmitGuess:
            const roundId = (action as State.Action<number>).payLoad;
            if (rounds[roundId].feedBack.nbrColorAndPositionOk === 4)
                return State.GameState.Success;
            return roundId === 9 ? State.GameState.Failed : gameState;
        default: return gameState;
    }
}

export {GameStateReducer};