import axios from 'axios';
import Config from '../../../config';

// Possible states
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

function request() {
  return {
        type: DELETE_ITEM_REQUEST,
    }
}

function receive(foods) {
  return {
        type: DELETE_ITEM_SUCCESS,
        foods
    }
}

function error(message) {
  return {
        type: DELETE_ITEM_FAILURE,
        message
    }
}

export function deleteItem(id) {
    return (dispatch) => {
        dispatch(request());
        return axios({
            url: Config.BASE_URL + 'food/delete/' + id,
            method: 'delete',
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
