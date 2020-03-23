import React from "react";
import ReactDOM from "react-dom";
import "../src/frontend/assets/desafioBridge.scss";
import App from "./frontend/App";
import * as serviceWorker from "./frontend//serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
