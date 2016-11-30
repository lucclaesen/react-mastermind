import * as React from "react";
import {connect} from "react-redux";
import * as State from "../state";
import {RestartGame} from "../actions";

const displayProgress = (gameState : State.GameState, restartGame: () => void) => {
    switch(gameState) {
        case State.GameState.Playing:
            return (
                <div> 
                    <p> Come on, keep up the good work</p>;
                </div>);
        case State.GameState.Failed:
            return (
                <div>
                    <p>Too bad ...</p>
                    <p>Would you like to play again?</p>
                    <div>
                        <button
                            onClick={e => {restartGame()}}>
                                Play again
                        </button>
                    </div>
                </div>
            );
        case State.GameState.Success:
            return (
                <div>
                    <p>Congratulations ...</p>
                    <p>Would you like to play again?</p>
                    <div>
                        <button
                            onClick={e => {restartGame()}}>
                                Play again
                        </button>
                    </div>
                </div>
            );
        
    }
}



const WrappedGameProgress = (props : { gameState : State.GameState, restartGame: () => void}) => {
    return (
        <div className="gameProgress">
            {displayProgress(props.gameState, props.restartGame)}
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
