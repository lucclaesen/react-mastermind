import * as React from "react";
import {connect} from "react-redux";
import * as State from "../state";
import {ColorPlaced, ColorPlacedPayLoad, SubmitGuess} from "../actions";


const renderPins = (colorPlacements: State.ColorPlacement[], roundId: number, colorPlaced: any ) => {
    return [0, 1, 2, 3].map(pos => {
        let color = State.Color.None;
        const placement = colorPlacements.find(placement => placement.position === pos);
        if (placement !== undefined)
            color = placement.color;

        return (
            <label 
                className="pin" 
                style={{background: State.colorNames[color]}}
                onClick={e => {colorPlaced(roundId, pos)}} 
                />
            ); 
    });
}

const renderSubmitButton = (props: GuessOwnProps & GuessConnect) => {
    if (props.isActive && props.colorPlacements.length === 4) {
        return (
            <button className="submit"
                onClick={e => props.submitGuess(props.roundId)}
            />
        );
    }
}

interface GuessOwnProps {
    roundId: number;
    colorPlacements: State.ColorPlacement[],
    isActive: boolean;
}

interface GuessConnect {
    placeSelectedColor: (roundId: number, position: number) => void,
    submitGuess: (roundId: number) => void
}


const WrappedGuess = (props: GuessOwnProps & GuessConnect) => {
    return (
        <div className="col col-3-4">
            <div className="grid">
                <div className="col col-3-4">
                    {renderPins(props.colorPlacements, props.roundId, props.placeSelectedColor)}
                </div>
                <div className="col col-1-4">
                    {renderSubmitButton(props)}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: State.Model, ownProps: GuessOwnProps) => {
    return {
        roundId: ownProps.roundId,
        colorPlacements: ownProps.colorPlacements
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        placeSelectedColor: (roundId: number, position: number) : void => {
            dispatch(ColorPlaced(roundId, position));
        },
        submitGuess: (roundId: number) : void => {
            dispatch(SubmitGuess(roundId))
        }
    }
}

const Guess = connect(mapStateToProps, mapDispatchToProps)(WrappedGuess);

export {Guess, GuessOwnProps};