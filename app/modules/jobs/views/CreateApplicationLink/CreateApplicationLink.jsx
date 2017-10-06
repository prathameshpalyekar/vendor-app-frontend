import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Formsy from 'formsy-react'
import Alert from 'react-s-alert'
import Immutable from 'immutable'
import { Link } from 'react-router';
import { AwModal } from 'components/ui'
import FC from 'components/Formsy'
import Job from 'modules/jobs/models/Job'
import { createJob } from 'modules/jobs/actions/create';
import Helpers from 'components/helpers'
import LinkUrl from './LinkUrl'
import CandidateInfoFieldset from './CandidateInfoFieldset'
import AdditionalInfoFieldset from './AdditionalInfoFieldset'
import PreviewFieldset from '../JobForm/Preview/PreviewFieldset'

class CreateApplicationLink extends Component {

    constructor(props) {
        super(props);
        let {job} = this.props;
        job =  job ? new Job(job.toObject()) : {};

        this.state = {
            canSubmit: false,
            submitted: false,
            modalIsOpen: true,
            infoValues: {},
            preview: false,
            newJobData: job
        };

        // Bindings
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openPreview = this.openPreview.bind(this);
        this.closePreview = this.closePreview.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isSaving) {
            const { router } = this.context;

            // Error condition should be before
            if (nextProps.isSaveError){
                Alert.error(nextProps.isSaveError);
            } else {
                Alert.success('Link saved successfully.');
                router.push(this.getCloseUrl());
            }
            this.setState({ submitted: false });
        }

        let {job} = nextProps;
        job =  job ? new Job(job.toObject()) : {};
        this.setState({
            newJobData: job
        });
    }


    onSubmit(model) {
        const { dispatch, user } = this.props;
        let job = new Job(this.props.job.toObject());
        let newJob = this.state.newJobData;

        let updateModel = Object.assign({}, this.props.job.toObject(), newJob);
        delete updateModel.userId;
        delete updateModel.trashed;
        delete updateModel.trashedAt;
        delete updateModel.trashedBy;

        const targetToken = updateModel.urlToken.find((token) => {
            return token.userId === user.get('id');
        })

        updateModel.urlToken.forEach((token) => {
            if (token.token === targetToken.token) {
                token.isLinkCreated = true;
            }
        })

        dispatch(createJob(updateModel));
        this.setState({ submitted: true });
        return false;
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    getCloseUrl() {
        const { job } = this.props;

        if (job) {
            return '/jobs/' + job.get('id');
        }

        return '/jobs';
    }

    openPreview(infoValues) {
        this.setState({
            preview: true,
            infoValues: infoValues
        });
    }

    closePreview() {
        this.setState({
            preview: false
        });
    }

    closeModal() {
        const { router } = this.context;

        if (router && this.getCloseUrl()) {
            router.push(this.getCloseUrl());
        } else if (this.props.onRequestClose) {
            this.props.onRequestClose();
        } else {
            this.setState({
                modalIsOpen: false
            });
        }
    }

    onDataChange(value) {
        const { user } = this.props;
        const job = new Job(this.props.job.toObject());
        let { newJobData } = this.state;

        if (job.getUserVisibility(user) === 'supplier') {
            if (job.urlToken) {
                const targetTokenIndex = job.urlToken.findIndex((token) => {
                    return token.userId === user.get('id');
                })

                if (targetTokenIndex !== -1) {
                    newJobData.urlToken[targetTokenIndex] = value;
                }
            }
        } else {
            newJobData = value;
        }
        this.setState({
            newJobData: newJobData
        })
    }

    renderForm() {
        const job = new Job(this.props.job.toObject());
        const { user } = this.props;
        const { preview } = this.state;
        const formClassName = preview ? 'form-horizontal hide' : 'form-horizontal';  

        return (
            <Formsy.Form className={formClassName} onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                <AwModal.Body>
                    <LinkUrl job={job} user={user}/>
                    <CandidateInfoFieldset job={job} user={user} openPreview={this.openPreview} onDataChange={this.onDataChange}/>
                </AwModal.Body>

                <AwModal.Footer>
                    <button onClick={this.closeModal} className="btn btn-danger">Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Save</button>
                </AwModal.Footer>
            </Formsy.Form>
        );
    }

    render() {
        const { job } = this.props;
        const { infoValues, preview } = this.state; 
        const closeUrl = preview ? null : this.getCloseUrl();

        if (!job) {
            return (<span></span>);
        }

        return (
            <AwModal.Modal
                isOpen={this.state.modalIsOpen}
                headerTitle="Create application link"
                onRequestClose={this.closePreview} 
                shouldCloseOnOverlayClick={false}
                noCloseBtn={!preview}
                closeUrl={closeUrl}>
                {this.renderForm()}
                <PreviewFieldset infoState={infoValues} isOpen={preview} />
            </AwModal.Modal>
        );
    }
}

CreateApplicationLink.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const jobs = state.get('jobs');
    const candidates = state.get('candidates');

    if (!ownProps.params || !ownProps.params.id) {
        return {}
    }

    const { params } = ownProps;

    let aJob = jobs.getIn(['data', params.id]);

    if (!aJob) {
        return {
            jobId: params.id,
        };
    }

    let newCandidate = Immutable.Map({
        jobId: aJob.get('id')
    });

    let aCandidate = params.cid ? candidates.getIn(['data', params.id, params.cid]) || newCandidate: newCandidate;
    return {
        isSaving: candidates.getIn(['saving', params.cid || 'new']),
        isSaveError: candidates.getIn(['saveError', params.cid || 'new']),
        job: aJob,
        candidate: aCandidate,
        user: state.getIn(['auth', 'user']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(CreateApplicationLink);

