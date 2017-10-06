import axios from 'axios';
import socket from 'components/socket'
import { JOB_DESTROY_SUCCESS } from './destroy.js'

import Config from '../../../config';

export const JOB_FETCH_REQUEST = 'JOB_FETCH_REQUEST'
export const JOB_FETCH_SUCCESS = 'JOB_FETCH_SUCCESS'
export const JOB_FETCH_FAILURE = 'JOB_FETCH_FAILURE'

function subscribe() {
}

function request() {
    return {
        type: JOB_FETCH_REQUEST,
    }
}

function receive(jobs) {
    return {
        type: JOB_FETCH_SUCCESS,
        jobs
    }
}

function error(message) {
  return {
      type: JOB_FETCH_FAILURE,
      message
    }
}

function destroy(job) {
    return {
        type: JOB_DESTROY_SUCCESS,
        job
    }
}

export function fetchJobs() {
    return (dispatch) => {
        dispatch(request());
        return axios({
            url: Config.BASE_URL + 'job',
            method: 'get',
            responseType: 'json'
        }).then((xhrResponse) => {
            let response = xhrResponse.data;
            subscribeJobs(dispatch);
            dispatch(receive(response.data));
        }).catch((response) => {
            dispatch(error('Failed to fetch jobs. API failure.'));
        });
    };
};

export function subscribeJobs(dispatch) {
    socket.subscribe('/job', (message) => {
        console.log('Message received over socket', message);
        const { operation, data } = message;
        if (operation === 'update' || operation === 'insert') {
            dispatch(receive([data]))
        } else if (operation === 'delete') {
            dispatch(destroy(data));
            return false;
        }
        // Delete operation might not happen, since we are using trash
    }, (err) => {
        if (err) {
            console.log(err);
            console.log('Jobs subscription request failed');
            return false;
        }
    });
}

export function unsubscribeJobs() {
    socket.unsubscribe('/job', null, (err) => {
        if (err) {
            console.log(err);
            console.log('Jobs Unsubscription request failed');
        }
    });
}

// export function fetchJob(jobId) {
//     return (dispatch) => {
//         dispatch(request());
//         return axios({
//             url: Config.BASE_URL + 'job/' + jobId,
//             method: 'get',
//             responseType: 'json'
//         }).then((xhrResponse) => {
//             let response = xhrResponse.data;
//             dispatch(receive(response.data));
//         }).catch((response) => {
//             dispatch(error('Failed to fetch jobs. API failure.'));
//         });
//     };
// };
//
