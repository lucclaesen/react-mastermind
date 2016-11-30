import {Store, createStore} from "redux";
import Reducer from "./reducers";
import * as React from "react";
import * as ReactDom from "react-dom";
import {Provider} from "react-redux";
import App from "./components/App";
import {loggingDispatch} from "./utils/loggingDispatch";

let store = createStore(Reducer);
if (process.env.NODE_ENV !== "production") {
    store.dispatch = loggingDispatch(store);
}

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("main")
);

