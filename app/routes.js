import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import App from './App.jsx';
import AuthRoutes from 'modules/auth/routes';
import HomeRoutes from 'modules/home/routes';

import configureStore from 'store/ConfigureStore';

import DevTools from 'components/DevTools';

const store = configureStore(Immutable.Map());

// Create an enhanced history that syncs navigation events with the store
//
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
})

const rootRoute = {
    path: '/',
    component: App,
    childRoutes: [
        ...AuthRoutes,
        HomeRoutes
    ]
}

render(
    <Provider store={store}>
        <div className="app-inner">
            <Router history={history} routes={rootRoute} />
            {process.env.NODE_ENV === 'production' ? <div/> : <DevTools/>}
        </div>
    </Provider>,
    document.getElementById('app')
);
