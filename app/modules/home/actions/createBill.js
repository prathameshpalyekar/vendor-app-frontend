import axios from 'axios';
import Config from '../../../config';

// Possible states
export const CREATE_BILL_REQUEST = 'CREATE_BILL_REQUEST';
export const CREATE_BILL_SUCCESS = 'CREATE_BILL_SUCCESS';
export const CREATE_BILL_FAILURE = 'CREATE_BILL_FAILURE';

function request() {
  return {
        type: CREATE_BILL_REQUEST,
    }
}

function receive(bill) {
  return {
        type: CREATE_BILL_SUCCESS,
        bill
    }
}

function error(message) {
  return {
        type: CREATE_BILL_FAILURE,
        message
    }
}

export function createBill(data) {
    // let url = Config.BASE_URL + 'food/add';
    // if (id) {
    //     url += '/' + id;
    // }
    return (dispatch) => {
        // dispatch(request());
        return axios({
            url: Config.BASE_URL + 'bill/add',
            method: 'post',
            responseType: 'json',
            data: data
        }).then((xhrResponse) => {
            let response = xhrResponse.data;
            console.log(response);
            if (response.success) {
                // dispatch(receive(response.data));
            } else {
                // dispatch(error(response.message));
            }
        }).catch(xhrResponse => {
            let response = xhrResponse.data;
            console.log(response)
            // dispatch(error(response.message));
        });
    }
}
