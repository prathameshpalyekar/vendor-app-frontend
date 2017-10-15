import axios from 'axios';
import Config from '../../../config';

// Possible states
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

function request() {
  return {
        type: GET_USERS_REQUEST,
    }
}

function receive(users) {
  return {
        type: GET_USERS_SUCCESS,
        users
    }
}

function error(message) {
  return {
        type: GET_USERS_FAILURE,
        message
    }
}

export function getUsers() {
    return (dispatch) => {
        dispatch(request());
        return axios({
            url: Config.BASE_URL + 'user/all',
            method: 'get',
            responseType: 'json',
        }).then((xhrResponse) => {
            let response = xhrResponse.data;
            if (response.success) {
                dispatch(receive(response.data));
            } else {
                dispatch(error(response.message));
            }
        }).catch(xhrResponse => {
            let response = xhrResponse.data;
            console.log(xhrResponse)
            dispatch(error(response.message));
        });
    }
}
