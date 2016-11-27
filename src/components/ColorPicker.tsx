import * as React from "react";
import ColorOptionContainer from "./ColorOptionContainer";
import {Color} from "../state";

const ColorPicker = () => {
    return (
        <div>
            <h5>Select current color</h5>
            <ColorOptionContainer color={Color.Yellow} />
            <ColorOptionContainer color={Color.Blue} />
            <ColorOptionContainer color={Color.Green} />
            <ColorOptionContainer color={Color.Purple} />
            <ColorOptionContainer color={Color.Red} />
        </div>
    );
} 

export default ColorPicker;