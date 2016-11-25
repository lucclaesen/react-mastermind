import * as React from "react";
import {Color, colorNames} from "../state";
import {SelectColor} from "../actions";


const ColorOption = (props: any) => {
    // destructuring the input
    const { selected, color, signalNewColorSelected } : {selected: boolean, color: Color, signalNewColorSelected: (Color) => void} = props; 
    
    // preparing style
    let pegstyle = selected? "peg peg-selected" : "peg";
    pegstyle += " peg-color-" + colorNames[color];

    return (<label 
                className={pegstyle}
                onClick={e => {signalNewColorSelected(color);}} 
            />);   
}

export default ColorOption;