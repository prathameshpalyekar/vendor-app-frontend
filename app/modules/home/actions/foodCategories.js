import axios from 'axios';
import Config from '../../../config';

// Possible states
export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

function request() {
  return {
        type: GET_CATEGORY_REQUEST,
    }
}

function receive(categories) {
  return {
        type: GET_CATEGORY_SUCCESS,
        categories
    }
}

function error(message) {
  return {
        type: GET_CATEGORY_FAILURE,
        message
    }
}

export function getCategories() {
    return (dispatch) => {
        dispatch(request());
        return axios({
            url: Config.BASE_URL + 'food-category',
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
            dispatch(error(response.message));
        });
    }
}
