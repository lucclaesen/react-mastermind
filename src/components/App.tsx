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
                <ColorPicker/>
                <GameProgress />
            </div>
        </div>
        <div>
            <RulesSection />
        </div>
    </div>
);

export default App;