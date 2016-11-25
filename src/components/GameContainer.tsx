import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import * as State from "../state";
import Game from "./Game";

const mapStateToProps = (model: State.Model, ownProps: any) => {
    return {
        game: model.game
    };
}

console.log("Game is " + Game);
const GameContainer = connect(mapStateToProps)(Game);

export default GameContainer;