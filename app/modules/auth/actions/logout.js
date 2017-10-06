import axios from 'axios';

import Config from '../../../config';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())

        return axios({
            url: Config.BASE_URL + 'logout',
            method: 'post',
            responseType: 'json'
        }).then(function (response) {
            dispatch(receiveLogout())
        }).catch(function (response) {
            dispatch(receiveLogout())
        });
    }
}
