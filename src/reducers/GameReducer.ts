import {Game, Round, FeedBack, Guess, ColorPlacement, ActionBase, Action, ActionType, ColorSelection, Color} from '../state';
import {ColorPlaced, ColorPlacedPayLoad} from "../actions";

const initialRounds = () : Round[] => {
    let res : Round[] = [];
    for(let i=0; i < 10; i++) {
        res.push({
            sequenceNbr: i, 
            guess: {
                colorPlacements : []
            },
            feedBack: null
        });
    }
    return res;
}


const defaultGame = () : Game => {
    return {
        currentRoundNbr: 0,
        rounds : initialRounds() 
    };
}

const GuessReducer = (guess: Guess, action: ActionBase, selectedColor: ColorSelection, secret: Color[]) : Guess => {
    switch (action.type) {
        /**
         * A color is placed in the context of a guess
         */
        case ActionType.ColorPlaced:
            const payLoad = (action as Action<ColorPlacedPayLoad>).payLoad;
            const otherPlacements = guess.colorPlacements.filter(p => p.position !== payLoad.position);
            return { 
                colorPlacements:    [... otherPlacements, {    color: selectedColor.color,
                                                            position: payLoad.position
                                                        }
                                    ]
            };
        default:
            return guess;
    }
}

const RoundReducer = (round: Round, action : ActionBase, selectedColor: ColorSelection, secret: Color[]) : Round => {
    switch (action.type) {
        /**
         * A color is placed in the context of a guess
         */
        case ActionType.ColorPlaced:
            const payLoad = (action as Action<ColorPlacedPayLoad>).payLoad;
            if (round.sequenceNbr !== payLoad.roundId)
                return round;
            return {
                sequenceNbr: round.sequenceNbr,
                guess: GuessReducer(round.guess, action, selectedColor, secret)
            };
        default:
            return round;
    }
}

const RoundsReducer = (rounds: Round[], action: ActionBase, selectedColor: ColorSelection, secret: Color[]) : Round[] => {
    switch (action.type) {
        /**
         * A color is placed in the context of a guess
         */
        case ActionType.ColorPlaced:
            return rounds.map(r => RoundReducer(r, action, selectedColor, secret));
        default:
            return rounds;
    }
}

const GameReducer = (game: Game = defaultGame(), action: ActionBase, selectedColor: ColorSelection, secret: Color[]) : Game => {
    switch(action.type) {
        /**
         * A color is placed in the context of a guess
         */
        case ActionType.ColorPlaced:
            const payLoad = (action as Action<ColorPlacedPayLoad>).payLoad;
            const currentRound = game.rounds[payLoad.roundId];
            return {
                currentRoundNbr:  game.currentRoundNbr,
                rounds: RoundsReducer(game.rounds, action, selectedColor, secret)
            };
        default:
            return game;

    }
}

export default GameReducer;