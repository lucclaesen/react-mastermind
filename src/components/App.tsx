import * as React from "react";
import RulesSection from "./RulesSection";
import ColorPicker from "./ColorPicker";
import GameContainer from "./GameContainer";

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