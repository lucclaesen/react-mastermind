import * as React from "react";
import Round  from "./Round";
import * as State from "../state";

/** Rather than having  */

const mapRoundStateToRoundComponent = (roundState: State.Round, indexOfCurrentRound: number) => {
    return (<Round
        key={roundState.sequenceNbr}
        sequenceNbr = {roundState.sequenceNbr}
        isActive={roundState.sequenceNbr === indexOfCurrentRound}
        guess={roundState.guess}
        feedBack={roundState.feedBack}
    />);
}


const Game = (game: State.Game) => {

    return (
        <div className="col col-3-4">
            <h5>Game</h5>
            {
                game.rounds.map(r => mapRoundStateToRoundComponent(r, game.currentRoundNbr))
            }
        </div>
    );
}

export default Game;