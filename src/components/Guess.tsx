import * as React from "react";

const Guess = (props: any) => {
    return (
        <div className="col col-3-4">
            <div className="grid">
                <div className="col col-3-4">
                    <label className="pin"/>
                    <label className="pin"/>
                    <label className="pin"/>
                    <label className="pin"/>
                </div>
                <div className="col col-1-4">Submit</div>
            </div>
        </div>
    );
}

export default Guess;