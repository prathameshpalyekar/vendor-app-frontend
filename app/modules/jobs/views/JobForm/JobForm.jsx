import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import Formsy from 'formsy-react'
import Alert from 'react-s-alert'
import Immutable from 'immutable'

import { AwModal, AwFieldset } from 'components/ui';
import FC from 'components/Formsy'

import Job from '../../models/Job'
import { createJob } from '../../actions/create';

import DescriptionFieldset from './DescriptionFieldset'
import DetailsFieldset from './DetailsFieldset'
import DocumentsFieldset from './DocumentsFieldset'
import CandidateInfoFieldset from '../CreateApplicationLink/CandidateInfoFieldset'
import SpecificQuestionsFieldset from './SpecificQuestionsFieldset'
import VisibilityFieldset from './VisibilityFieldset'
import PreviewFieldset from './Preview/PreviewFieldset'

import './JobForm.less'

class JobForm extends Component {

    constructor(props) {
        super(props)
        let {job} = this.props;
        job =  job ? new Job(job.toObject()) : {};

        this.state = {
            canSubmit: true,
            submitted: false,
            infoValues: {},
            preview: false,
            newJobData: job
        };

        // Bindings
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.submitDraft = this.submitDraft.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openPreview = this.openPreview.bind(this);
        this.closePreview = this.closePreview.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
    }

    getCloseUrl() {
        const backUrl = this.props.backUrl;

        if (backUrl) {
            return backUrl;
        }

        return '/jobs';
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isSaving) {
            const { router } = this.context;
            // Error condition should be before
            if (nextProps.isSaveError){
                Alert.error(nextProps.isSaveError);
            } else {
                Alert.success('Position saved successfully.');
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

    componentDidMount() {
        const scrollTo = this.props.location.state ? this.props.location.state.scrollTo : null;
        if (scrollTo === 'collaborators') {
            const container = this.refs.containerModal.refs.reactModalPortal.node.firstChild;
            const collborator = ReactDOM.findDOMNode(this.refs.visibility);
            container.scrollTop = collborator.offsetTop;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.job !== this.props.job
            || nextState.submitted !== this.state.submitted
            || nextState.canSubmit !== this.state.canSubmit
            || nextProps.isSaveError !== this.props.isSaveError
            || nextProps.isSaving !== this.props.isSaving
            || nextState.preview !== this.state.preview) {
            return true;
        }
        return false;
    }

    onSubmit(model) {
        const { dispatch } = this.props;

        let job = new Job(this.props.job.toObject());

        let newJob = Object.assign({}, this.state.newJobData);
        newJob = Object.assign(newJob, model);

        if (job.isNew()) {
            newJob.status = 'draft';
        }

        if (newJob.visibility) {
            newJob.visibility = newJob.visibility.filter((v) => {
                return v.email && v.type
            });
        }

        if (newJob.questions) {
            newJob.questions = newJob.questions.filter((v) => {
                return v.question && v.type
            });
        }

        if(newJob.questions){
            newJob.questions.filter((question) => {
                return question.type === 'dropdown' || question.type === 'multiplechoice';
            }).forEach((question) => {
                question.options = Object.keys(question.options).map((v, i) => {
                    return question.options[v];
                });
            });
        }

        if (job.isNew()) {
            dispatch(createJob(Object.assign({}, newJob)));
        } else {

            let updateModel = Object.assign({}, this.props.job.toObject(), newJob);
            if(updateModel.questions)updateModel.questions = updateModel.questions.filter((question) => {return question._removed ? false : true});
            delete updateModel.userId;
            delete updateModel.trashed;
            delete updateModel.trashedAt;
            delete updateModel.trashedBy;
            // FIXME: This might be issue when we have
            // nested object and it is deleted
            dispatch(createJob(updateModel));
        }
        this.setState({ submitted: true });
        return false;
    }

    submitDraft() {
        this.setState({ saveAsDraft: true });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    closeModal() {
        const { router } = this.context;

        router.push(this.getCloseUrl());
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

    onDataChange(value) {
        this.setState({
            newJobData: value
        })
    }

    renderForm() {
        const { user } = this.props;
        const job = new Job(this.props.job.toObject());
        const {preview} = this.state;
        const formClassName = preview ? 'form-horizontal hide' : 'form-horizontal';  
        
        if (!job.isNew() && job.isCompleted()) {
            return (
                <div>
                    <AwModal.Body>
                        <div className="well">This job could not be edited.</div>
                    </AwModal.Body>
                    <AwModal.Footer>
                        <button type="submit" className="btn btn-danger" onClick={this.closeModal}>Close</button>
                    </AwModal.Footer>
                </div>
            );
        }

        return (
            <Formsy.Form className={formClassName} onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                <AwModal.Body>
                    <DetailsFieldset job={job}/>
                    <DescriptionFieldset job={job}/>
                    <DocumentsFieldset job={job}/>
                    <CandidateInfoFieldset job={job} user={user} openPreview={this.openPreview} onDataChange={this.onDataChange}/>
                    <SpecificQuestionsFieldset job={job}/>
                    <VisibilityFieldset job={job} ref="visibility"/>
                </AwModal.Body>

                <AwModal.Footer>
                    <button type="button" className="btn btn-danger" onClick={this.closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>{job.isNew() ? 'Add Position' : 'Save Position'}</button>
                </AwModal.Footer>
            </Formsy.Form>
        );
    }

    render() {
        const {infoValues, preview} = this.state; 
        const headerTitle = preview ? 'Open Preview' : 'Add position'; 
        const closeUrl = preview ? null : this.getCloseUrl();
        
        if (!this.props.job) {
            return (<span></span>);
        }

        return (
            <AwModal.Modal
                isOpen={true}
                headerTitle={headerTitle}
                onRequestClose={this.closePreview} 
                shouldCloseOnOverlayClick={false}
                closeUrl={closeUrl}
                noCloseBtn={!preview}
                ref="containerModal">
                {this.renderForm()}
                <PreviewFieldset infoState={infoValues} isOpen={preview} />
            </AwModal.Modal>
        );
    }
}

JobForm.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const jobs = state.get('jobs');

    // if (!ownProps.params || !ownProps.params.id) {
    //     return {
    //         isSaving: jobs.saving['new'],
    //         isSaveError: jobs.saveError['new'],
    //         job: new Job(Job.getDefaultValues)
    //     };
    // }

    let aJob = jobs.getIn(['data', ownProps.params.id]);

    return {
        isSaving: jobs.getIn(['saving', ownProps.params.id || 'new']),
        isSaveError: jobs.getIn(['saveError', ownProps.params.id || 'new']),
        job: aJob || Immutable.Map({}),
        backUrl: ownProps.location.state && ownProps.location.state.backUrl ? ownProps.location.state.backUrl : false
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(JobForm);

