import { combineReducers } from 'redux-immutable';

import routerReducer from './router-reducer.js';
import auth from 'modules/auth/reducers';
import settings from 'modules/settings/reducers';
import foodMenu from 'modules/food/reducers';

const rootReducer = combineReducers({
    routing: routerReducer,
    auth,
    settings,
    foodMenu,
});

export default rootReducer;
