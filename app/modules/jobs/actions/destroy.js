import axios from 'axios';

import Config from '../../../config';
import Job from '../models/Job'

// Possible states
export const JOB_DESTROY_REQUEST = 'JOB_DESTROY_REQUEST'
export const JOB_DESTROY_SUCCESS = 'JOB_DESTROY_SUCCESS'
export const JOB_DESTROY_FAILURE = 'JOB_DESTROY_FAILURE'

function request(job) {
    return {
        type: JOB_DESTROY_REQUEST,
        job
    }
}

function receive(job) {
    return {
        type: JOB_DESTROY_SUCCESS,
        job,
    }
}

function error(message, job) {
    return {
        type: JOB_DESTROY_FAILURE,
        job,
        message,
    }
}

export function destroyJob(job) {
    let jobModel = new Job(job);

    let url = Config.BASE_URL + 'job/' + job.id;

    return (dispatch) => {
        dispatch(request(job));
        return axios({
            url: url,
            method: 'DELETE',
            responseType: 'json',
        }).then(function (xhrResponse) {
            let response = xhrResponse.data;
            if (response.success) {
                dispatch(receive(job));
            } else {
                dispatch(error('Failed to delete job'), job);
            }
        }).catch(function (xhrResponse) {
            let response = xhrResponse.data;
            dispatch(error(response.message || 'Failed to delete job due to Api failure.', job));
        });
    }
}
