import * as React from "react";
import {ColorOptionContainer} from "../containers";
import {Color} from "../state";

const ColorPicker = () => {
    return (
        <div>
            <ColorOptionContainer color={Color.Yellow} />
            <ColorOptionContainer color={Color.Blue} />
            <ColorOptionContainer color={Color.Green} />
            <ColorOptionContainer color={Color.Purple} />
            <ColorOptionContainer color={Color.Red} />
        </div>
    );
} 

export default ColorPicker;