import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import { Iterable } from 'immutable';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import DevTools from '../components/DevTools';

// const stateTransformer = (state) => {
//   if (Iterable.isIterable(state)) return state.toJS();
//   else return state;
// };

// const logger = createLogger({
//   stateTransformer,
// });



const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

module.exports = function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //                       store.replaceReducer(require('../reducers').default)
    //                      );
    // }

    return store;
}
