import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import cx from 'classnames'

import Job from '../models/Job'

import './JobCard.less'

class JobCard extends Component {
    constructor (props) {
        super(props);
        this.openJob = this.openJob.bind(this);
    }

    openJob() {
        const { job, disableEdit } = this.props;
        const { router } = this.context;

        if (job.isDraft()) {
            if (!disableEdit) {
                router.push('/jobs/' + job.id + '/edit');
            }
        } else {
            router.push('/jobs/' + job.id);
        }
    }

    renderEditJobLink() {
        const { job, disableEdit } = this.props;

        if (disableEdit) {
            return '';
        }

        const editJobLink = {
            pathname: '/jobs/' + job.id + '/edit'
        };

        return (
            // <Link to={editJobLink} className="-edit icon-edit"/>
            <span className="-edit icon-edit"/>
        );
    }

    renderCompanyLogo() {
        const { job } = this.props;
        const user = job._user;

        if (job.isDraft() || !user || !user.companyLogo) {
            return null;
        }
        return <img src={user.companyLogo} className="-company-logo" />
    }


    renderJobCandidateCount() {
        const { job } = this.props;

        let iconClassNames = cx('-candidate-count icon-candidate', {
            'text-muted': job.candidateCount === 0
        });
        
        return (
            <span className={iconClassNames}>{job.candidateCount}</span>
        );
    }

    render() {
        const { job, unreadNotification } = this.props;
        const type = job.getPositionType();
        const userName = job._user ? job._user.name : '';
        const createdAt = moment(job.createdAt);
        const jobTitle = job.title ? job.title : '...';

        return (
            <div className="job-card" onClick={this.openJob}>
                { job.isDraft() ? this.renderEditJobLink() : this.renderJobCandidateCount() }
                { this.renderCompanyLogo()}
                {unreadNotification ? <span className="-notification-unread-circle"></span> : null }
                <h5 className="-title">
                    {jobTitle}
                </h5>
                <ul className="-metas">
                    { type ? <li className="icon-clock">{type}
                    </li> : null }
                    { job.lastDate ? <li className="icon-calendar">{job.lastDate.format('YYYY-MM-DD')}
                    </li> : null }
                    <li className="icon-edit">{createdAt.format('YYYY-MM-DD')} by {userName}</li>
                </ul>
            </div>
        );
    }
}

JobCard.contextTypes = {
    router: React.PropTypes.object
};

JobCard.propTypes = {
    job: PropTypes.object.isRequired
    // dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        job: ownProps.job
    };
};

// const mapDispatchtoProps = (dispatch) => {
//     return {
//         dispatch
//     };
// };

export default connect(mapStateToProps)(JobCard);
