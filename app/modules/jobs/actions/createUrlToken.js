import axios from 'axios';
import _ from 'lodash';
import Config from '../../../config';

// Possible states
export const CREATE_URL_TOKEN_REQUEST = {
    APPLICATION: 'CREATE_APPLICATION_URL_TOKEN_REQUEST',
    ONLINE_RESUME: 'CREATE_ONLINE_RESUME_URL_TOKEN_REQUEST',
};

export const CREATE_URL_TOKEN_SUCCESS = {
    APPLICATION: 'CREATE_APPLICATION_URL_TOKEN_SUCCESS',
    ONLINE_RESUME: 'CREATE_ONLINE_RESUME_URL_TOKEN_SUCCESS',
};

export const CREATE_URL_TOKEN_FAILURE = {
    APPLICATION: 'CREATE_APPLICATION_URL_TOKEN_FAILURE',
    ONLINE_RESUME: 'CREATE_ONLINE_RESUME_URL_TOKEN_FAILURE',
};

function request(data) {
    return {
        type: CREATE_URL_TOKEN_REQUEST[data.type],
        jobId: data.jobId,
        candidateId: data.candidateId
    }
}

function receive(data, type) {
    return {
        type: CREATE_URL_TOKEN_SUCCESS[type],
        job: data.job,
        candidate: data.candidate
    }
}

function error(message, data) {
    return {
        type: CREATE_URL_TOKEN_FAILURE[data.type],
        jobId: data.jobId,
        candidateId: data.candidateId,
        message
    }
}

export function createUrlToken(data) {
    const url = Config.BASE_URL + 'urltokens/create-url-token';
    return (dispatch) => {
        dispatch(request(data));
        return axios({
            url: url,
            method: 'POST',
            responseType: 'json',
            data: data
        }).then(function (xhrResponse) {
            let response = xhrResponse.data;
            if (response.success) {
                dispatch(receive(response.data, data.type));
            } else {
                dispatch(error('Failed to create job'), data);
            }
        }).catch(function (xhrResponse) {
            let response = xhrResponse.data;
            dispatch(error(response.message || 'Failed to save job due to Api failure.', job));
        });
    }
}