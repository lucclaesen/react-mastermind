import * as React from "react";
import {connect} from "react-redux";
import * as State from "../state";
import {RestartGame} from "../actions";


const WrappedGameProgress = (props : { gameState : State.GameState}) => {
    return (
        <div className="gameProgress">
            Status: {props.gameState}
        </div>
    );
}


const mapStateToProps = (state: State.Model) : { gameState : State.GameState} => {
    return {
        gameState: state.game.gameState
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        restartGame: () => {
            dispatch(RestartGame());
        }        
    }
}

const GameProgress = connect(mapStateToProps, mapDispatchToProps)(WrappedGameProgress);

export {GameProgress};
