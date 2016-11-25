import * as React from "react";
import Guess from "./Guess";
import FeedBack from "./FeedBack";

const Round = (props: any) => {
    return (
        <div className="grid">
            <Guess />
            <FeedBack />
        </div>
    );
}

export default Round;