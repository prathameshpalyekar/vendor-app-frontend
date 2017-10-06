import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Formsy from 'formsy-react'
import Alert from 'react-s-alert'

import { AwModal, AwFieldset } from 'components/ui'

import Job from '../../models/Job'
import Description from './Description'
import Details from './Details'
import CandidateInfo from './CandidateInfo'
import Attachments from './Attachments'
import Header from './Header'

import { destroyJob } from '../../actions/destroy';
import "./JobDetail.less"

class JobDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            submitted: false
        };

        this.deleteJob = this.deleteJob.bind(this);
    }

    getJob() {
        return new Job(this.props.job.toObject());
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isSaving) {
            const { router } = this.context;
            const closeUrl = '/jobs';
            // Error condition should be before
            if (nextProps.isSaveError){
                Alert.error(nextProps.isSaveError);
            } else {
                Alert.success('Position deleted successfully.');
                router.push(closeUrl);
            }
            this.setState({ submitted: false });
        }
    }

    deleteJob() {
        const { dispatch, job } = this.props;

        dispatch(destroyJob(job.toObject()));
        this.setState({ submitted: true });
        return false;
    }

    render() {
        if (!this.props.job) {
            return (<span></span>);
        }

        const { user, isPremiumUser } = this.props;

        const job = this.getJob();

        const closeUrl = '/jobs/' + job.id;

        const editLink = {
            pathname: '/jobs/' + job.id + '/edit-job',
            state: {
                backUrl: '/jobs/' + job.id
            },
        };

        let canUserDelete = job.canUserDelete(user);
        let canUserEdit = job.canUserEdit(user);
        let isCompleted = job.isCompleted();
        
        return (
            <AwModal.Modal
                isOpen={true}
                shouldCloseOnOverlayClick={true}
                closeUrl={closeUrl}>

                <AwModal.Body>
                    <Header job={job}/>
                    <Attachments job={job}/>
                    <Details job={job}/>
                    <Description job={job}/>
                    <CandidateInfo job={job}/>
                </AwModal.Body>

                {canUserDelete || (!isCompleted && canUserEdit) ? 
                <AwModal.Footer>
                    {canUserDelete ? <button type="submit" className="btn btn-danger icon-trash" onClick={this.deleteJob} disabled={this.state.submitted}>{ this.state.submitted ? 'Deleting...' : 'Delete position'}</button> : '' }
                    {!isCompleted && canUserEdit ? <Link to={editLink} className="btn btn-primary icon-edit">Edit position</Link> : null}
                </AwModal.Footer> : null }
            </AwModal.Modal>
        );
    }
}


JobDetail.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {

    return {
        isSaving: state.getIn(['jobs', 'saving', ownProps.params.id]),
        isSaveError: state.getIn(['jobs', 'saveError', ownProps.params.id]),
        job: state.getIn(['jobs', 'data', ownProps.params.id]),
        user: state.getIn(['auth', 'user']),
        // isPremiumUser: state.getIn(['auth', 'user', 'subscriptionType']) === 'premium',
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(JobDetail);
