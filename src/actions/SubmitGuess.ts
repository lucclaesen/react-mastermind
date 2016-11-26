import * as State from "../state"

const SubmitGuess = (roundId: number) : State.Action<number> => {
    return { 
        type: State.ActionType.SubmitGuess,
        payLoad: roundId
    };
}

export {SubmitGuess};