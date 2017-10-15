import Immutable from 'immutable';
import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../actions/addUser.js';
import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../actions/users.js';

const settings = (state = Immutable.fromJS({
    saving: {},
    saveError: {},
    data: {},
    users: {},
    fetching: {},
    fetchError: {},

}), action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return state.merge({
                saving: true,
                saveError: false,
            });
        case ADD_USER_SUCCESS:
            return state.merge({
                saving: false,
                saveError: false,
                data: action.user,
            });
        case ADD_USER_FAILURE:
            return state.merge({
                saving: false,
                saveError: action.message,
            });
        case GET_USERS_REQUEST:
            return state.merge({
                fetching: true,
                fetchError: false,
            });
        case GET_USERS_SUCCESS:
            return state.merge({
                fetching: false,
                fetchError: false,
                users: action.users,
            });
        case GET_USERS_FAILURE:
            return state.merge({
                fetching: false,
                fetchError: action.message,
            });
        default:
            return state
    }
}

module.exports = settings;
