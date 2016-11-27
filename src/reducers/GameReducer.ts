import {Game, GameState, Round, FeedBack, Guess, ColorPlacement, ActionBase, Action, ActionType, ColorSelection, Color} from '../state';
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
        rounds : initialRounds(),
        gameState: GameState.Playing
    };
}



const createFeedBack = (colorPlacements: ColorPlacement[], secret: Color[]) : FeedBack => {
    
    // allow for tags on the secret values
    const annotatedSecret = secret.map(s => ({val: s, tag: 0}));
    
    // pass 1: look for exact matches
    let remainder = colorPlacements.filter(pl => {
        if (annotatedSecret[pl.position].val === pl.color) {
            annotatedSecret[pl.position].tag = 1;
        }
        else return pl;
    });

    // pass 2 on the remainder of the placements: look for half-matches (color occurrences on a different position) on non-tagged secret values
    remainder.forEach(pl => {
        let match = annotatedSecret.find(s => s.tag === 0 && s.val === pl.color);
        if (match !== undefined)
            match.tag = 2;
    });

    // collate the feedback 
    const result : FeedBack = {
        nbrColorAndPositionOk: 0,
        nbrWrong: 0,
        nrbColorOkInWrongPosition: 0
    }; 

    annotatedSecret.forEach(s => {
        switch(s.tag) {
            case 0: result.nbrWrong++; break;
            case 1: result.nbrColorAndPositionOk++; break;
            case 2: result.nrbColorOkInWrongPosition++; break;
        }
    });

    return result;
}

const FeedBackReducer = (feedBack: FeedBack = {
        nbrColorAndPositionOk: 0,
        nbrWrong: 0,
        nrbColorOkInWrongPosition: 0
    }, action: ActionBase, colorPlacements: ColorPlacement[], secret: Color[]) : FeedBack => {
    switch(action.type) {
        case ActionType.SubmitGuess:
            return createFeedBack(colorPlacements, secret);
        default: return feedBack;
    }    
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
                colorPlacements: [
                        ... otherPlacements, 
                        { 
                            color: selectedColor.color,
                            position: payLoad.position
                        }]
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
                guess: GuessReducer(round.guess, action, selectedColor, secret),
                feedBack: round.feedBack
            };
        case ActionType.SubmitGuess:
            const roundId = (action as Action<number>).payLoad;
            if (round.sequenceNbr !== roundId)
                return round;
            return {
                sequenceNbr: round.sequenceNbr,
                guess: round.guess,
                feedBack: FeedBackReducer(round.feedBack, action, round.guess.colorPlacements, secret)
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
        case ActionType.SubmitGuess:
            return rounds.map(r => RoundReducer(r, action, selectedColor, secret));
        default:
            return rounds;
    }
}

const GameStateReducer = (gameState: GameState, action: ActionBase, rounds: Round[]) : GameState => {
    switch(action.type) {
        case ActionType.SubmitGuess:
            const roundId = (action as Action<number>).payLoad;
            if (rounds[roundId].feedBack.nbrColorAndPositionOk === 4)
                return GameState.Success;
            return roundId === 9 ? GameState.Failed : gameState;
        default: return gameState;
    }
}

const GameReducer = (game: Game = defaultGame(), action: ActionBase, selectedColor: ColorSelection, secret: Color[]) : Game => {
    switch(action.type) {
        /**
         * A color is placed in the context of a guess
         */
        case ActionType.ColorPlaced:
            const payLoad = (action as Action<ColorPlacedPayLoad>).payLoad;
            if (payLoad.roundId !== game.currentRoundNbr)
                return game;
            if (game.gameState !== GameState.Playing)
                    return game;
            return {
                currentRoundNbr:  game.currentRoundNbr,
                rounds: RoundsReducer(game.rounds, action, selectedColor, secret),
                gameState : game.gameState
            };
        /**
         * A guess is submitted
         */
            case ActionType.SubmitGuess:
                const roundId = (action as Action<number>).payLoad;
                // Prohibit guessing outside of the current round
                if (roundId !== game.currentRoundNbr)
                    return game;
                // Prohibit guessing when the game has stopped
                if (game.gameState !== GameState.Playing)
                    return game;
                if (game.rounds[game.currentRoundNbr].guess.colorPlacements.length < 4)
                    return game;
                const currentRoundNbr = game.currentRoundNbr + 1;
                const rounds = RoundsReducer(game.rounds, action, selectedColor, secret);
                // note that gamestate depends on the presence of feedback in the current round, so this needs to be passed in into the gamestateReducer ...
                const gameState = GameStateReducer(game.gameState, action, rounds);
                return {
                    currentRoundNbr: currentRoundNbr,
                    rounds: rounds,
                    gameState: gameState
                }
        default:
            return game;

    }
}

export default GameReducer;