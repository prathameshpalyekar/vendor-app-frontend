import axios from 'axios';
import Config from '../../../config';

// Possible states
export const GET_FOOD_MENU_REQUEST = 'GET_FOOD_MENU_REQUEST';
export const GET_FOOD_MENU_SUCCESS = 'GET_FOOD_MENU_SUCCESS';
export const GET_FOOD_MENU_FAILURE = 'GET_FOOD_MENU_FAILURE';

function request() {
  return {
        type: GET_FOOD_MENU_REQUEST,
    }
}

function receive(foods) {
  return {
        type: GET_FOOD_MENU_SUCCESS,
        foods
    }
}

function error(message) {
  return {
        type: GET_FOOD_MENU_FAILURE,
        message
    }
}

export function getFoodMenu() {
    return (dispatch) => {
        dispatch(request());
        return axios({
            url: Config.BASE_URL + 'food',
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
