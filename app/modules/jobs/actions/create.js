import axios from 'axios';
import _ from 'lodash';

import Config from '../../../config';
import Job from '../models/Job'

// Possible states
export const JOB_CREATE_REQUEST = 'JOB_CREATE_REQUEST'
export const JOB_CREATE_SUCCESS = 'JOB_CREATE_SUCCESS'
export const JOB_CREATE_FAILURE = 'JOB_CREATE_FAILURE'

function request(job, isNew) {
    return {
        type: JOB_CREATE_REQUEST,
        job,
        isNew
    }
}

function receive(job, isNew) {
    return {
        type: JOB_CREATE_SUCCESS,
        job,
        isNew
    }
}

function error(message, job, isNew) {
    return {
        type: JOB_CREATE_FAILURE,
        job,
        message,
        isNew
    }
}

export function createJob(job) {
    let jobModel = new Job(job);

    let url = Config.BASE_URL + 'job';

    if (!jobModel.isNew()) {
        url += '/' + jobModel.id;
    }

    return (dispatch) => {
        dispatch(request(job, jobModel.isNew()));
        return axios({
            url: url,
            method: jobModel.isNew() ? 'post' : 'put',
            responseType: 'json',
            data: _.omit(job, ['userId', 'trashed', 'trashedAt', 'trashedBy'])
        }).then(function (xhrResponse) {
            let response = xhrResponse.data;
            if (response.success) {
                dispatch(receive(response.data, jobModel.isNew()));
            } else {
                dispatch(error('Failed to create job'), jobModel.isNew());
            }
        }).catch(function (xhrResponse) {
            let response = xhrResponse.data;
            dispatch(error(response.message || 'Failed to save job due to Api failure.', job, jobModel.isNew()));
        });
    }
}

export function createJobForApplicationLink(job){
    let jobModel = new Job(job);
    jobModel.externalApplication = true;
    return createJob(jobModel);
}
