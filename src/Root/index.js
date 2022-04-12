import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { Provider, connect } from "react-redux";
import {HashRouter, Route } from "react-router-dom";
import Home from "../Home/Home";

const Root = props => {
    const { store } = props;

    return (
        <Provider store={store}>
            <IntlProvider>
                <HashRouter>
                    <Route key={1} path="/" element={<Home />} />
                </HashRouter>
            </IntlProvider>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default connect(
    state => ({}),
    dispatch => ({})
)(Home);