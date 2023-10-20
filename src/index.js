import React from "react";
import ReactDOM  from "react-dom";

import './index.css';
import App from './App';
import { ContextProvider } from "./contexts/ContextProvider";


// make sure to hook our react app to the root div
ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>,
    document.getElementById('root')
);
