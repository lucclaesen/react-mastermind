import * as React from "react";
import Round from "./Round";

const mockRounds = () => {
    const rounds = [];
    for(let i = 0; i < 10; i++) {
        rounds.push(
            <Round key={i}/>
        );
    }
    return rounds;   
}

const Game = (props: any) => {

    // // for now, we will mock rounds that will be provided by the props
    const rounds = mockRounds();

    return (
        <div className="col col-3-4">
            <h5>Game</h5>
            {rounds}
        </div>
    );
}

export default Game;