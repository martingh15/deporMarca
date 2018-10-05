import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router';
import history from './history';
import {Provider} from 'react-redux';
import {Route, BrowserRouter, Redirect, Router} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import appReducers from './reducers/index';

//CSS
import './assets/css/bootstrap.css';
import './assets/css/style.css';
import './assets/css/dropzone.css';
import './assets/css/image-gallery.css';
import './assets/css/fixed-data-table.min.css';
import './index.css';

//Components
import Layout from './components/Layout/Layout';

//Service worker
import registerServiceWorker from './registerServiceWorker';

//global
window.$ = window.jQuery = require("jquery");

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
// const loggerMiddleware = createLogger();
// const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware)(createStore);
// const store = createStoreWithMiddleware(appReducers);

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
var createStoreWithMiddleware = null;
if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleware)(createStore);
    console.log("hola estoy en debug")
}
else{
    console.log("hola estoy en produccion")
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    //chau console.los metodo 4 de esta pagina https://stapp.space/how-to-remove-javascript-console-log-pros-2/
    (function () {
        var method;
        var noop = function noop() { };
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];
            console[method] = noop;
        }
    }());
}
const store = createStoreWithMiddleware(appReducers);

//For auth
const PrivateRoute = ({component, ...rest}) => ( // eslint-disable-line
    <Route
        {...rest} render={props => (
        store.getState().auth.loggedIn ? (
                React.createElement(component, props)
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}, // eslint-disable-line
                    }}
                />
            )
    )}
    />
);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={Layout}/>
                </Switch>
            </Router>
        </BrowserRouter>
    </Provider>
    , document.getElementById('app'));

registerServiceWorker();
