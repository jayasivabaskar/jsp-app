import React from "react";
import { render } from "react-dom";
import Root from "./Root";
import configureStore from "./ConfigureStore";
import "./Assets/Less/Source.less";

const store = configureStore();
const rootElement = document.getElementById("app");

const renderDom = () => {
    render(
        <React.StrictMode>
            <Root store={store} />
        </React.StrictMode>, 
        rootElement
    );
};

renderDom();