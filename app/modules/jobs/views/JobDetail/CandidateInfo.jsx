import React, { Component, PropTypes } from 'react';

import { AwFieldset } from 'components/ui';

export default class CandidateInfo extends Component {
    render() {
        const { job } = this.props;
        const requiredCandidateInfo = job.requiredCandidateInfo || {};
        return (
            <AwFieldset title="Desired information about the candidate" icon="icon-job-description" className="job-details-candidate-info">
                <div className="row">
                    <div className="col-sm-6">
                        <span className={requiredCandidateInfo.uploadedResume ? 'icon-check' : 'icon-cross'}>Resume</span>
                    </div>
                    <div className="col-sm-6">
                        <span className={requiredCandidateInfo.coverLetter ? 'icon-check' : 'icon-cross'}>Cover letter</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <span className={requiredCandidateInfo.onlineResume ? 'icon-check' : 'icon-cross'}>Online resume</span>
                    </div>
                     <div className="col-sm-6">
                        <span className={requiredCandidateInfo.profilePicture ? 'icon-check' : 'icon-cross'}>Candidate Photo</span>
                    </div>
                </div>
            </AwFieldset>
        )
    }
}
