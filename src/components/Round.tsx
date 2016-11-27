import * as React from "react";
import * as State from "../state";
import {Guess, GuessOwnProps} from "./Guess";
import FeedBack from "./FeedBack";


const mapGuessStateToComponent = (guessState: State.Guess, roundNbr: number, isActive:boolean) => {
    return (
        <Guess roundId={roundNbr} colorPlacements={guessState.colorPlacements} isActive={isActive}/>
    );
}

interface RoundProps {
    roundId: number,
    isActive: boolean,
    guess: State.Guess,
    feedBack: State.FeedBack,
}

const Round = (props: RoundProps) => {
    return (
        <div className="grid" style={{border : "solid 1px black", marginBottom:"2px"}}>
            {mapGuessStateToComponent(props.guess, props.roundId, props.isActive)}
            <FeedBack feedBack={props.feedBack} />
        </div>
    );
}

export {RoundProps, Round};