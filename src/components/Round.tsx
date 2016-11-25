import * as React from "react";
import {Guess, FeedBack} from "./";

const Round = (props: any) => {
    return (
        <div className="grid">
            <Guess />
            <FeedBack />
        </div>
    );
}

export default Round;