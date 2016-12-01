import * as React from "react";

interface RulesSectionState {
    expanded: boolean
} 

/**
 * RulesSection is a component that has no bearings with the (possibly shared) application state. Therefore it's modelled as a statefull
 * component without props. Clicking the link causes a change in the value of the private state variabel "expanded", which automatically
 * causes the render function to be reevaluated.
 */

export default class RulesSection extends React.Component<any, RulesSectionState> {
    
    constructor(props: any) {
        super(props);
        this.state = { expanded: false };
    }

    public handleClicked(e: any) {
        this.setState({ expanded: !this.state.expanded });
    }

    public render() {
        let displayValue = this.state.expanded ? "block" : "none";
        return (
            <div className="rules">
                <a
                    href="#"
                    onClick = {
                        e => {
                            e.preventDefault();
                            this.handleClicked(e);
                        }
                    }
                >
                    Rules
                </a>
                <p style={{display: displayValue}}>
                    <p>
                    The goal of the game is to guess the combination of colors that was randomly choosen at a the outset. I.e. a player needs to determine the right color on the 
                    right position. A color may occur more than once in the target combination.
                    </p>
                    <p>
                    You loose the game if the solution cannot be guessed within 10 rounds.
                    </p>
                    <p>
                    After every guess, you'll get feedback on how your guess relates to the target solution:
                    <ul>
                        <li>
                            <span className="fed fed-exact"></span> means that you placed one color at the correct position.
                        </li>
                        <li><span className="fed"></span> indicates that a color occurs in the solution, but in a different location.
                        </li>
                        <li><span className="fed fed-miss"></span> means that a color that occurs in your guess does not occur in the solution.
                        </li>
                    </ul>
                    </p>                    

                </p>
            </div>   
        );
    }

}