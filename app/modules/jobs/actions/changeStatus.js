import axios from 'axios';

import Config from '../../../config';

export const JOB_CHANGE_STATUS = 'JOB_CHANGE_STATUS'

function request(id) {
    return {
        type: JOB_SINGLE_FETCH_REQUEST,
        job: {
            id
        }
    }
}

function receive(job) {
    return {
        type: JOB_SINGLE_FETCH_SUCCESS,
        job
    }
}

function error(message) {
  return {
      type: JOB_SINGLE_FETCH_FAILURE,
      message
    }
}

export function fetchJob(jobId) {
    return (dispatch) => {
        dispatch(request(jobId));
        return axios({
            url: Config.BASE_URL + 'job/' + jobId,
            method: 'get',
            responseType: 'json'
        }).then((xhrResponse) => {
            let response = xhrResponse.data;
            dispatch(receive(response.data));
        }).catch((response) => {
            dispatch(error('Failed to fetch jobs. API failure.'));
        });
    };
};

