import axios from 'axios';
import Config from '../../../config';

// Possible states
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

function request() {
  return {
        type: ADD_USER_REQUEST,
    }
}

function receive(user) {
  return {
        type: ADD_USER_SUCCESS,
        user
    }
}

function error(message) {
  return {
        type: ADD_USER_FAILURE,
        message
    }
}

export function addUser(data, id) {
    let url = Config.BASE_URL + 'user/add';
    if (id) {
        url = Config.BASE_URL + 'user/edit/' + id;
    }

    return (dispatch) => {
        dispatch(request());
        return axios({
            url: url,
            method: id ? 'put' : 'post',
            responseType: 'json',
            data: data
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
