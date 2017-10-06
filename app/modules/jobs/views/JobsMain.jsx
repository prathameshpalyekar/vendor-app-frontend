import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import update from 'react/lib/update'
import moment from 'moment';
import { Link } from 'react-router';
import Alert from 'react-s-alert'
import ReactTooltip from 'react-tooltip'
import Joyride from  'react-joyride'

import { Canvas } from 'components/ui'
import Funnel from 'components/Funnel'
import socket from 'components/socket'

import { fetchJobs, unsubscribeJobs } from '../actions/fetch'
import { createJob } from '../actions/create'

import ListTypes from '../constants/ListTypes'
import JoyrideSteps from '../constants/JoyrideSteps'

import HeaderView from '../views/Header'
import JobCard from './JobCard.jsx'
import Job from '../models/Job'
import JobCompletedModal from './JobCompleteModal'

import { saveSettings } from '../../auth/actions/settings.js'

import '../job.less'
import '../tooltip.less'
class JobsMain extends Component {

    constructor (props) {
        super(props);

        this.jobLists = ListTypes;

        //this.state = {};
        const steps = JoyrideSteps;
        this.state = {
            joyrideOverlay: true,
            ready: false,
            steps: steps,
            joyrideType: 'continuous',
        };

        this.onClickStart = this.onClickStart.bind(this);
        this.addSteps = this.addSteps.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.addTooltip = this.addTooltip.bind(this);
        this.joyrideCallback = this.joyrideCallback.bind(this);
        this.closeJobCompletedModal = this.closeJobCompletedModal.bind(this);
    }

    componentDidMount() {
        const { dispatch, isAuthenticated } = this.props;

        if (isAuthenticated) {

            dispatch(fetchJobs());

            setTimeout(() => {
                this.setState({
                    ready : true
                });
            }, 1000);
            
        }
    }

    componentWillUnmount() {
        unsubscribeJobs();
    }

    componentDidUpdate(prevProps, prevState) {
        const joyride = this.joyride;
        const user = this.props.user.toObject();
        const joyrideData = user.joyride;

        if(joyride && joyrideData && user && prevState.ready && this.state.ready) {
            const jobPage = joyrideData.get('job');
            if(!jobPage){
                joyride.reset(true);
            }
        }
        
        if (!prevState.ready && this.state.ready && joyride) {
            joyride.start();
        }
    }

    getListJobs(status) {
        const { jobs } = this.props;
        // Sort jobs by last date
        return jobs.get('data').filter(job => job.get('status') === status).sort((a, b) => {
            var aDate = moment(a.get('lastDate')),
                bDate = moment(b.get('lastDate'));

            return aDate.isBefore(bDate) ? 1 : aDate.isAfter(bDate) ? -1 : 0;
        });
    }

    getNotificationsForJob(jobId) {
        const { notifications } = this.props;

        return notifications.get('latestData').some(notification => !notification.get('read') && notification.get('jobId') === jobId)
    }

    renderJobLists() {
        const { isPremiumUser } = this.props;
        const { jobLists } = this;

        return (
            jobLists.map((j, index) => {
                let jobs = this.getListJobs(j.id);
                return (
                    <Funnel.List classNames={j.classNames || ''} index={index} key={j.id} moveCard={this.moveCard} title={j.title} iconClass={j.icon} items={jobs}>
                        {j.id === 'draft' ? this.renderInvisibleIcon() : <div/>}
                        <ul>
                            {jobs.toArray().map((i, ind) => {
                                let job = new Job(i.toObject());
                                return (
                                    <Funnel.Card key={job.id} item={job} list={index} index={ind}>
                                        <JobCard job={job} disableEdit={!isPremiumUser} unreadNotification={this.getNotificationsForJob(job.id)}/>
                                    </Funnel.Card>
                                )
                            })}
                        </ul>
                        {j.id === 'draft' &&  isPremiumUser ? this.renderAddPositionLink() : <div/>}
                    </Funnel.List>
                )
            })
        );
    }

    renderAddPositionLink() {
        return (
            <div className="funnel-list-footer text-center">
                <Link to='/jobs/add' className="icon-plus -add-position">
                    Add Position
                </Link>
            </div>
        );
    }

    renderInvisibleIcon() {
        return (
            <span className="funnel-list-right-icon icon-eye-with-line" data-tip data-for="drafts-visibility"></span>
        );
    }

    moveCard(item, target) {
        const { dispatch, isPremiumUser } = this.props;
        const { jobLists } = this;

        const currentJobList = jobLists[item.list];
        const targetJobList = jobLists[target.index]

        if (targetJobList.id === currentJobList.id) {
            // Do nothing
            return false;
        }

        if (!isPremiumUser) {
            Alert.error('You need to be a premium user to be able to move this position.');
            return false;
        }

        if (targetJobList.id === 'draft') {
            Alert.error('This position could not be moved to drafts.');
            return false;
        }

        // Show popup when completed
        if (targetJobList.id === 'completed') {
            this.setState({
                openCompletedModal: true,
                movingJobId: item.id
            });
            return false;
        }

        // Optimistic update
        dispatch({
            type: 'JOB_CHANGE_STATUS',
            id: item.id,
            status: targetJobList.id
        });
        // Save to server
        dispatch(createJob({
            id: item.id,
            status: targetJobList.id,
        }));
    }

    onClickStart(e) {
        e.preventDefault();
        const el = e.currentTarget;
        const state = {};

        if (el.dataset.key === 'joyrideType') {
          this.joyride.reset();

          setTimeout(() => {
            this.joyride.start();
          }, 300);

          state.joyrideType = e.currentTarget.dataset.type;
        }

        if (el.dataset.key === 'joyrideOverlay') {
          state.joyrideOverlay = el.dataset.type === 'active';
        }

        this.setState(state);
    }
    addTooltip(data) {
        this.joyride.addTooltip(data);
    }

    addSteps(steps) {
        const joyride = this.joyride;
        let newSteps = steps;
        if (!Array.isArray(newSteps)) {
          newSteps = [newSteps];
        }

        if (!newSteps.length) {
          return;
        }

        this.setState(currentState => {
          currentState.steps = currentState.steps.concat(joyride.parseSteps(newSteps));
          return currentState;
        });
     }   

    closeJobCompletedModal() {
        this.setState({
            openCompletedModal: false,
            movingJobId: false
        });
    }

    joyrideCallback(joyride) {
        const dispatch = this.props.dispatch;
        if(joyride.type === "finished") {
            let user = this.props.user.toObject();
            let userJoyride = {};
            if(typeof(user.joyride) === 'undefined') {
                userJoyride = {'job': true,'jobDetail': false};
            }else {
                userJoyride = {'job': true, 'jobDetail': user.joyride.get('jobDetail')};
            }
            
            dispatch(saveSettings({
                joyride: userJoyride
            }));
        }
    }

    render() {
        const { openCompletedModal, movingJobId } = this.state;
        const user = this.props.user.toObject();
        const joyride = user.joyride;
        
        let showJoyride = true;
        
        if(typeof(joyride) !== 'undefined') {
            let jobPage = joyride.get('job');
            let jobDetailPage = joyride.get('jobDetail');
            if(jobPage){
                showJoyride = false;
            }
        }

        return (
            <div className="jobs-wrap">
            <Canvas>
                <HeaderView/>
            </Canvas>
            <Funnel.Board className="container job-board-list">
                    {this.renderJobLists()}
                </Funnel.Board>
                <JobCompletedModal isOpen={openCompletedModal} id={movingJobId} onRequestClose={this.closeJobCompletedModal}/>
                {  this.state.ready && showJoyride ?
                    <Joyride ref={c => (this.joyride = c)} debug={true}  steps={this.state.steps}
                    scrollToFirstStep={true}
                    showSkipButton={true}
                    showStepsProgress={true}
                    callback={this.joyrideCallback}
                    type={this.state.joyrideType}
                    showOverlay={this.state.joyrideOverlay}
                    debug={false} /> : null }
                {this.props.children}
                <ReactTooltip place="top" id="drafts-visibility" type="dark" effect="solid">
                    <i>This column is only visible to your colleagues</i>
                </ReactTooltip>
            </div>
        );
    }
}

JobsMain.propTypes = {
    jobs: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        notifications: state.get('notifications'),
        jobs: state.get('jobs'),
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        user: state.getIn(['auth', 'user']),
        isPremiumUser: state.getIn(['auth', 'user', 'subscriptionType']) === 'premium',
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(JobsMain);
