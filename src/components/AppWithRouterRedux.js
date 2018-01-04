import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
//import createHistory from 'history/createBrowserHistory';
import createHistory from "history/createHashHistory";
import { Route, Link } from "react-router-dom";
import {
	ConnectedRouter,
	routerReducer,
	routerMiddleware,
	push
} from "react-router-redux";

import reducers from "../reducers/";

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		...reducers,
		router: routerReducer
	}),
	applyMiddleware(middleware)
);

// Sample Routes
const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);

const Admin = () => {
	store.dispatch({type: 'FOO', payload: 'bar'});
	return (
	<div>
		<h2>Admin</h2>
	</div>
	);
};

// Main App
const AppWithRouterRedux = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <div className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Admin</Link>
                </div>
                <Route exact path="/" component={Home} />
                <Route path="/admin" component={Admin} />
            </div>
        </ConnectedRouter>
    </Provider>
);


export default AppWithRouterRedux;
