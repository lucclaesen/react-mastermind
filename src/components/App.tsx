import * as React from "react";
import RulesSection from "./RulesSection";
import ColorPicker from "./ColorPicker";
import GameContainer from "./GameContainer";
import {GameProgress} from "./GameProgress";

const App = () => (
    <div>
        <div className="grid">
            <div className="col col-3-4">
                <GameContainer />
            </div>
            <div className="col col-1-4">
                <GameProgress />
                <ColorPicker/>
            </div>
        </div>
        <div className="col col-1-4">
            <RulesSection />
        </div>
    </div>
);

export default App;