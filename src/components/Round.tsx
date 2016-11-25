import * as React from "react";
import * as State from "../state";
import {Guess} from "./Guess";
import FeedBack from "./FeedBack";


const mapGuessStateToComponent = (guessState: State.Guess, roundNbr: number) => {
    return (
        <Guess
            roundNbr={roundNbr}
            colorPlacements={guessState.colorPlacements}
        />
    );
}


const Round = (props: State.Round &  {isActive: boolean}) => {
    return (
        <div className="grid" style={{border : "solid 1px black", marginBottom:"2px"}}>
            {mapGuessStateToComponent(props.guess, props.sequenceNbr)}
            <FeedBack />
        </div>
    );
}

export default Round;