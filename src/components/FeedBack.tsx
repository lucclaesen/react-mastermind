import * as React from "react";
import * as State from "../state";

const FeedBack = (props: { feedBack: State.FeedBack}) => {
    return (
        <div className="col col-1-4">
        {!props.feedBack ? "" : `Exact: ${props.feedBack.nbrColorAndPositionOk.toString()} - Near: ${props.feedBack.nrbColorOkInWrongPosition.toString()}`}
        </div>
    );
}

export default FeedBack;