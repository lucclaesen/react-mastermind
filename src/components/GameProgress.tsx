import * as React from "react";
import {connect} from "react-redux";
import * as State from "../state";
import {RestartGame} from "../actions";

const revealSecret = (secret: State.Color[]) => {
    return (
        <div>
        {
            secret.map(c => {
                return <label 
                        className="pin-small" 
                        style={{background: State.colorNames[c]}}
                        />
            })
        }
        </div>
    );
};


const displayProgress = (gameState : State.GameState, secret: State.Color[], restartGame: () => void) => {
    switch(gameState) {
        case State.GameState.Playing:
            return (
                <div> 
                    <p> Come on, keep up the good work</p>;
                </div>);
        case State.GameState.Failed:
            return (
                <div>
                    <p>Too bad ... This is the solution:</p>
                    {revealSecret(secret)}
                    <p>Would you like to play again?</p>
                    <div>
                        <button className="playAgainButton"
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
                        <button className="playAgainButton"
                            onClick={e => {restartGame()}}>
                                Play again
                        </button>
                    </div>
                </div>
            );
        
    }
}



const WrappedGameProgress = (props : { gameState : State.GameState, secret: State.Color[], restartGame: () => void}) => {
    return (
        <div className="gameProgress">
            {displayProgress(props.gameState, props.secret, props.restartGame)}
        </div>
    );
}


const mapStateToProps = (state: State.Model) : { gameState : State.GameState, secret: State.Color[]} => {
    return {
        gameState: state.game.gameState,
        secret: state.secret
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
