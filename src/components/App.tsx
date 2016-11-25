import * as React from "react";
import {RulesSection, ColorPicker, Game} from ".";
import GameContainer from "../containers/GameContainer";

const App = () => (
    <div>
        <div className="grid">
            <GameContainer />
            <ColorPicker/>
        </div>
        <RulesSection />
    </div>
);

export default App;