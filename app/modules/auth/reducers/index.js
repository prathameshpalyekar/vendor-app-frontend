import Immutable from 'immutable';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/login.js';
import { SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../actions/signup.js';
import { SETTINGS_REQUEST, SETTINGS_FAILURE, SETTINGS_SUCCESS, JOYRIDE_RESET } from '../actions/settings.js';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/logout.js';

function getUser() {
    const { __shortlist_user } = window;

    if (!__shortlist_user || typeof __shortlist_user !== 'object') {
        return false;
    }

    let user = Object.assign({}, __shortlist_user);
    // delete window.__shortlist_user;
    return user;
}

const auth = (state = Immutable.fromJS({
    isFetching: false,
    isAuthenticated: !!getUser(),
    user: getUser()
}), action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state.merge({
                isFetching: true,
                isAuthenticated: false,
                errorMessage: '',
                user: action.creds
            });
        case LOGIN_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user
            });
        case LOGIN_FAILURE:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message,
                user: null
            });
        case LOGOUT_REQUEST:
            return state.merge({
                isFetching: true
            });
        case LOGOUT_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                user: null,
                errorMessage: ''
            });
        case SIGNUP_REQUEST:
            return state.merge({
                isFetching: true,
                isAuthenticated: false,
                errorMessage: null,
                user: action.creds
            });
        case SIGNUP_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: null,
                user: action.user
            });
        case SIGNUP_FAILURE:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message,
                user: null
            });
        case SETTINGS_REQUEST:
            return state.merge({
                isFetching: true,
                errorMessage: null
            });
        case SETTINGS_SUCCESS:
            return state.merge({
                isFetching: false,
                user: action.user
            });
        case SETTINGS_FAILURE:
            return state.merge({
                isFetching: false,
                errorMessage: action.message
            });

        case JOYRIDE_RESET:
            return state.merge({
                user: state.get('user').merge({joyride: {job: false, jobDetail: false}}),
                isFetching: false
            });
        default:
            return state
    }
}

module.exports = auth;
