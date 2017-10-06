import axios from 'axios';

import Config from '../../../config';

// Possible states
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
      type: LOGIN_REQUEST,
      // isFetching: true,
      // isAuthenticated: false,
      creds
    }
}

function receiveLogin(user) {
  return {
      type: LOGIN_SUCCESS,
      // isFetching: false,
      // isAuthenticated: true,
      user
    }
}

function loginError(message) {
  return {
      type: LOGIN_FAILURE,
      // isFetching: false,
      // isAuthenticated: false,
      message
    }
}

export function loginUser(creds) {
    return (dispatch) => {

        dispatch(requestLogin(creds));

        return axios({
            url: Config.BASE_URL + 'login',
            method: 'post',
            responseType: 'json',
            data: creds
        }).then((xhrResponse) => {
            let response = xhrResponse.data;
            if (response.success) {
                dispatch(receiveLogin(response.data));
            } else {
                dispatch(loginError('Failed to login'));
            }
        }).catch(xhrResponse => {
            let response = xhrResponse.data;
            dispatch(loginError(response.message || 'Incorrect Username or password.'));
        });
    }
}
