import Immutable from 'immutable';
import { JOB_FETCH_REQUEST, JOB_FETCH_FAILURE, JOB_FETCH_SUCCESS } from '../actions/fetch.js';
import { JOB_CREATE_REQUEST, JOB_CREATE_FAILURE, JOB_CREATE_SUCCESS } from '../actions/create.js';
import { JOB_DESTROY_REQUEST, JOB_DESTROY_FAILURE, JOB_DESTROY_SUCCESS } from '../actions/destroy.js';
import { JOB_SINGLE_FETCH_REQUEST, JOB_SINGLE_FETCH_FAILURE, JOB_SINGLE_FETCH_SUCCESS } from '../actions/fetchJob.js';
import { CREATE_APPLICATION_URL_TOKEN_REQUEST, CREATE_APPLICATION_URL_TOKEN_SUCCESS, CREATE_APPLICATION_URL_TOKEN_FAILURE } from '../actions/createUrlToken.js';

const initialState = Immutable.fromJS({
    data: {},
    loaded: false, // indicates if overall job data has been loaded
    loading: false, // Overall data loading in progress
    error: null,

    // Single entry specific status track
    fetching: {}, // Use to store status of individual entry being fetched 
    fetchError: {},
    saving: {}, // Use to store status of individual entry being saved 
    saveError: {},
});

const jobs = (state = initialState, action) => {
    let aJob;
    let mappedJobs = {};
    switch (action.type) {
        case JOB_FETCH_REQUEST:
            return state.merge({
                loading: true,
                loaded: false,
                errorMessage: null
            });
        case JOB_FETCH_SUCCESS:
            mappedJobs = {};

            action.jobs.forEach((j) => {
                mappedJobs[j.id] = Immutable.Map(j);
            });

            return state.merge({
                loading: false,
                loaded: true,
                data: state.get('data').merge(mappedJobs),
                errorMessage: null
            });
        case JOB_FETCH_FAILURE:
            return state.merge({
                loading: false,
                loaded: false,
                error: action.message
            });

        // Job create/edit
        case JOB_CREATE_REQUEST:
            return state.merge({
                saving: state.get('saving').set(action.job.id || 'new', true)
            });

        case JOB_CREATE_SUCCESS:
            aJob = state.get('data').find((j) => { return j.get('id') === action.job.id });

            return state.merge({
                data: aJob ? state.get('data').mergeIn([action.job.id], Immutable.Map(action.job)) : state.get('data').set(action.job.id, Immutable.Map(action.job)),
                saving: state.get('saving').set(action.isNew ? 'new' : action.job.id, false),
                saveError: state.get('saveError').set(action.isNew ? 'new' : action.job.id, null),
            });
        case JOB_CREATE_FAILURE:
            return state.merge({
                saving: state.get('saving').set(action.isNew ? 'new' : action.job.id, false),
                saveError: state.get('saveError').set(action.isNew ? 'new' : action.job.id, action.message),
            });

        // Job create/edit
        case JOB_DESTROY_REQUEST:
            return state.merge({
                saving: state.get('saving').set(action.job.id, true),
                saveError: state.get('saveError').set(action.job.id, null),
            });

        case JOB_DESTROY_SUCCESS:
            return state.merge({
                data: state.get('data').delete(action.job.id),
                saving: state.get('saving').set(action.job.id, false),
                saveError: state.get('saveError').set(action.job.id, null),
            });
        case JOB_DESTROY_FAILURE:
            return state.merge({
                saving: state.get('saving').set(action.job.id, false),
                saveError: state.get('saveError').set(action.job.id, action.message),
            });

        // Token create
        case CREATE_APPLICATION_URL_TOKEN_REQUEST:
            return state.merge({
                saving: state.get('saving').set(action.jobId, true),
                saveError: state.get('saveError').set(action.jobId, null),
            });

        case CREATE_APPLICATION_URL_TOKEN_SUCCESS:
            return state.merge({
                data: state.get('data').mergeIn([action.job.id], Immutable.Map(action.job)),
                saving: state.get('saving').set(action.job.id, false),
                saveError: state.get('saveError').set(action.job.id, null),
            });
        case CREATE_APPLICATION_URL_TOKEN_FAILURE:
            return state.merge({
                saving: state.get('saving').set(action.jobId, false),
                saveError: state.get('saveError').set(action.jobId, action.message),
            });

        // Job single fetch
        case JOB_SINGLE_FETCH_REQUEST:
            if (action.job.id) {
                return state.merge({
                    fetching: state.get('fetching').set(action.job.id, true),
                    fetchError: state.get('fetchError').set(action.job.id, null),
                });
            }
            return state;
        case JOB_SINGLE_FETCH_SUCCESS:
            aJob = state.get('data').find((j) => { return j.get('id') === action.job.id });

            return state.merge({
                data: aJob ? state.get('data').mergeIn([action.job.id], Immutable.Map(action.job)) : state.get('data').set(action.job.id, Immutable.Map(action.job)),
                saving: state.get('fetching').set(action.job.id, false),
                saveError: state.get('fetchError').set(action.job.id, null),
            });

        case JOB_SINGLE_FETCH_FAILURE:
            return state.merge({
                fetching: state.get('fetching').set(action.job.id, false),
                fetchError: state.get('fetchError').set(action.job.id, action.message),
            });

        // Job actions
        case 'JOB_CHANGE_STATUS':
            return state.setIn(['data', action.id, 'status'], action.status);
        default:
            return state
    }
}

module.exports = jobs;
