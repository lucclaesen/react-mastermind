import * as React from "react";
import {Color} from "../state";
import {SelectColor} from "../actions";


const ColorOption = (props: any) => {
    // destructuring the input
    const { selected, color, signalNewColorSelected } : {selected: boolean, color: Color, signalNewColorSelected: (Color) => void} = props; 
    return (
        <label style={{backgroundColor : selected? "yellow": "red"}}>
        <input 
            type="radio" 
            checked={selected}
            value={color.toString()} 
            onClick= { 
                e => {
                    // e.preventDefault();
                    signalNewColorSelected(color);
                }
            } 
        />
        {"Foo"}
        </label>
    );
}

export default ColorOption;