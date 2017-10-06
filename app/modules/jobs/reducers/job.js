const job = (state = {}, action) => {
    switch (action.type) {
        case 'JOB_CREATE_SUCCESS':
            return Object.assign({}, action.job);
        case 'JOB_CHANGE_STATUS':
            console.log(status);
            // return Object.assign({}, action.job);
        default:
            return state
    }
}

module.exports = job;
