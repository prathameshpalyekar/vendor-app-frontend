import axios from 'axios';
import Config from '../../../config';

// Possible states
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

function request() {
  return {
        type: ADD_ITEM_REQUEST,
    }
}

function receive(foods) {
  return {
        type: ADD_ITEM_SUCCESS,
        foods
    }
}

function error(message) {
  return {
        type: ADD_ITEM_FAILURE,
        message
    }
}

export function addItem(data, id) {
    let url = Config.BASE_URL + 'food/add';
    if (id) {
        url += '/' + id;
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
            dispatch(error(response.message));
        });
    }
}
