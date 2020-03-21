import React from "react";

import Header from "./frontend/components/Header";
import Home from "./frontend/views/Home";

const App = () => (
    <>
        <div id="app-wrapper-content">
            <Header />
            <div id="app">
                <Home />
            </div>
        </div>
    </>
);

export default App;
