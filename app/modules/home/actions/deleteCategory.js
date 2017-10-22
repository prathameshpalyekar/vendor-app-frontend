import axios from 'axios';
import Config from '../../../config';

// Possible states
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

function request() {
  return {
        type: DELETE_CATEGORY_REQUEST,
    }
}

function receive(data) {
  return {
        type: DELETE_CATEGORY_SUCCESS,
        foods: data.foods,
        categories: data.categories,
    }
}

function error(message) {
  return {
        type: DELETE_CATEGORY_FAILURE,
        message
    }
}

export function deleteCategory(id) {
    return (dispatch) => {
        dispatch(request());
        return axios({
            url: Config.BASE_URL + 'food-category/delete/' + id,
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
