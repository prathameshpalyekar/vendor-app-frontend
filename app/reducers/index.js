import { combineReducers } from 'redux-immutable';

import routerReducer from './router-reducer.js';
import auth from 'modules/auth/reducers';

const rootReducer = combineReducers({
    routing: routerReducer,
    auth
});

export default rootReducer;
