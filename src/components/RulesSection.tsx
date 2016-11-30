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
                    Rules ...
                </a>
                <p style={{display: displayValue}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum magnam reiciendis, qui veritatis id ducimus nam facilis molestias praesentium accusamus tempore nihil, ullam! Voluptate odit saepe, commodi accusantium voluptatem ducimus!
                </p>
            </div>   
        );
    }

}