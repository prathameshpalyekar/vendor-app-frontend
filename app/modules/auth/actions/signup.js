import axios from 'axios';

import Config from '../../../config';

// Possible states
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

function requestSignup(user) {
  return {
      type: SIGNUP_REQUEST,
      isFetching: true,
      user
    }
}

function receiveSignup(user) {
  return {
      type: SIGNUP_SUCCESS,
      isFetching: false,
      user
    }
}

function signUpError(message) {
  return {
      type: SIGNUP_FAILURE,
      isFetching: false,
      message
    }
}

export function signUpUser(creds) {

    return (dispatch) => {

        dispatch(requestSignup(creds));

        return axios({
            url: Config.BASE_URL + 'signup',
            method: 'post',
            responseType: 'json',
            data: creds
        }).then(function (xhrResponse) {
            let response = xhrResponse.data;
            if (response.success) {
                dispatch(receiveSignup(response.data));
            } else {
                dispatch(signUpError('Failed to create account'));
            }
        }).catch(function (xhrResponse) {
            let response = xhrResponse.data;
            dispatch(signUpError(response.message || 'Failed to create account. API failure.'));
        });
    }
}
