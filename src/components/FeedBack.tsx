import * as React from "react";
import * as State from "../state";

/**
 * A component that represents feedback on a guess.
 */


const renderFeds = (feedBack: State.FeedBack) => {
    const feds = [];

    if (!feedBack) {
        for(let i=0; i < 4; i++) {
            feds.push(<span className="fed"></span>);
        }        
    }
    else {
        for(let i=0; i < feedBack.nbrColorAndPositionOk; i++) {
            feds.push(<span className="fed fed-exact"></span>);
        }
        for(let i=0; i < feedBack.nrbColorOkInWrongPosition; i++) {
            feds.push(<span className="fed"></span>);
        }
        for(let i=0; i < feedBack.nbrWrong; i++) {
            feds.push(<span className="fed fed-miss"></span>);
        }
    }

    return (
        <div className="fed-box">
            {feds}
        </div>
    );
}


const FeedBack = (props: { feedBack: State.FeedBack}) => {
    return (
        <div className="col col-1-4">
            {renderFeds(props.feedBack)}
        </div>
    );
}

export default FeedBack;