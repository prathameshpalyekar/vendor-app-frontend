import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Formsy from 'formsy-react'
import Alert from 'react-s-alert'

import { AwModal, AwFieldset } from 'components/ui'
import FC from 'components/Formsy'

import Job from '../models/Job'

import { createJob } from '../actions/create';

class JobCompletedModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            submitted: false
        };

        this.updateJob = this.updateJob.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    getJob() {
        return new Job(this.props.job.toObject());
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isSaving) {
            const closeUrl = '/jobs';
            // Error condition should be before
            if (nextProps.isSaveError){
                Alert.error(nextProps.isSaveError);
            } else {
                Alert.success('Position moved to completed.');
            }
            this.setState({ submitted: false });
            this.props.onRequestClose();
        }
    }

    updateJob(model) {
        const { dispatch, job } = this.props;

        model.id = job.get('id');
        model.status = 'completed';
        dispatch(createJob(model));
        this.setState({ submitted: true });
        return false;
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    render() {
        if (!this.props.job) {
            return (<span></span>);
        }

        const { userId } = this.props;

        const job = this.getJob();

        const closeUrl = '/jobs';

        let radioGroupOptions = [{
            label: 'Filled',
            value: 'filled'
        }, {
            label: 'Didn\'t find candidate.',
            value: 'notfound'
        }, {
            label: 'Closed for other reasons',
            value: 'other'
        }];

        return (
            <AwModal.Modal
                headerTitle={'Move ' + job.title + ' to completed'}
                shouldCloseOnOverlayClick={true}
                {...this.props}>

                <Formsy.Form className="form-horizontal" onValidSubmit={this.updateJob} onValid={this.enableButton} onInvalid={this.disableButton} >
                    <AwModal.Body>
                        <p>Please specify the reason for marking this Position as completed.</p>
                        <FC.RadioGroup options={radioGroupOptions} value="filled" name="completedReason" layout="elementOnly"/>
                    </AwModal.Body>

                    <AwModal.Footer>
                        <button type="submit" className="btn btn-primary" disabled={this.state.submitted}>{ this.state.submitted ? 'Moving...' : 'Move'}</button>
                    </AwModal.Footer>
                </Formsy.Form>
            </AwModal.Modal>
        );
    }
}


JobCompletedModal.contextTypes = {
    router: React.PropTypes.object
};

// export default JobCompletedModal;
const mapStateToProps = (state, ownProps) => {

    if (!ownProps.id) {
        return {};
    }

    return {
        isSaving: state.getIn(['jobs', 'saving', ownProps.id]),
        isSaveError: state.getIn(['jobs', 'saveError', ownProps.id]),
        job: state.getIn(['jobs', 'data', ownProps.id])
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(JobCompletedModal);
