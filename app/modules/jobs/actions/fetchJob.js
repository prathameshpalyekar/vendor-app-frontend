import axios from 'axios';
import socket from 'components/socket'
import { JOB_DESTROY_SUCCESS } from './destroy.js'
import { CANDIDATE_DESTROY_SUCCESS } from 'modules/candidates/actions/destroy.js'
import { CANDIDATE_SINGLE_FETCH_SUCCESS } from 'modules/candidates/actions/fetchCandidate.js'

import Config from '../../../config';

export const JOB_SINGLE_FETCH_REQUEST = 'JOB_SINGLE_FETCH_REQUEST'
export const JOB_SINGLE_FETCH_SUCCESS = 'JOB_SINGLE_FETCH_SUCCESS'
export const JOB_SINGLE_FETCH_FAILURE = 'JOB_SINGLE_FETCH_FAILURE'

function request(id) {
    return {
        type: JOB_SINGLE_FETCH_REQUEST,
        job: {
            id
        },
    }
}

function receive(job) {
    return {
        type: JOB_SINGLE_FETCH_SUCCESS,
        job,
    }
}

function error(id, message) {
  return {
      type: JOB_SINGLE_FETCH_FAILURE,
      job: {
          id
      },
      message,
    }
}

function receiveCandidates(candidates, jobId) {
    return {
        type: 'CANDIDATE_FETCH_SUCCESS',
        candidates,
        jobId
    }
}

function receiveCandidate(candidate) {
    return {
        type: CANDIDATE_SINGLE_FETCH_SUCCESS,
        candidate
    }
}


function destroy(job) {
    return {
        type: JOB_DESTROY_SUCCESS,
        job
    }
}

function destroyCandidate(candidate) {
    return {
        type: CANDIDATE_DESTROY_SUCCESS,
        candidate
    }
}

export function fetchJob(jobId, updateLastSeen) {
    const data = { updateLastSeen };

    return (dispatch) => {
        dispatch(request(jobId));
        return axios({
            url: Config.BASE_URL + 'job/' + jobId + '/candidate',
            method: 'get',
            responseType: 'json',
            params: data
        }).then((xhrResponse) => {
            let response = xhrResponse.data;
            let candidates = response.data.candidates || [];

            // FIXME: Remove candidates key from the
            // job object.
            subscribeJob(dispatch, jobId);
            dispatch(receive(response.data));
            dispatch(receiveCandidates(candidates, jobId));
        }).catch((response) => {
            dispatch(error(jobId, 'Failed to fetch jobs. API failure.'));
        });
    };
};

export function subscribeJob(dispatch, jobId) {
    socket.subscribe('/job/' + jobId, (message) => {
        console.log('Message received over socket', message);
        const { operation, data } = message;
        if (operation === 'update') {
            dispatch(receive(data));
            // dispatch(receiveCandidates(data.candidates || [], jobId));
        } else if (operation === 'delete') {
            dispatch(destroy(data));
            return false;
        }
    }, (err) => {
        if (err) {
            console.log(err);
            console.log('Job subscription request failed');
        }
    });

    socket.subscribe('/job/' + jobId + '/candidate', (message) => {
        console.log('Message received over socket', message);
        const { operation, data } = message;
        if (operation === 'update' || operation === 'insert') {
            dispatch(receiveCandidate(data));
        } else if (operation === 'delete') {
            dispatch(destroyCandidate(data));
            return false;
        }
    }, (err) => {
        if (err) {
            console.log(err);
            console.log('Job candidate subscription request failed');
        }
    });
}

export function unsubscribeJob(jobId) {
    socket.unsubscribe('/job/' + jobId, null, (err) => {
        if (err) {
            console.log(err);
            console.log('Job Unsubscription request failed');
        }
    });
    socket.subscribe('/job/' + jobId + '/candidate', null, (err) => {
        if (err) {
            console.log(err);
            console.log('Job candidate Unsubscription request failed');
        }
    });
}
