import React, { Component, PropTypes } from 'react';
import { AwFieldset } from 'components/ui'
import FC from 'components/Formsy'
import AdditionalInfoFieldset from '../CreateApplicationLink/AdditionalInfoFieldset'

export default class CandidateInfoFieldset extends Component {

    constructor(props) {
        super(props);
        const { job } = this.props;
        this.toggleAdditionalInfo = this.toggleAdditionalInfo.bind(this);
        this.state = {
            showAdditionalInfo: job.requiredCandidateInfo ? job.requiredCandidateInfo.onlineResume : false
        }
    }

    toggleAdditionalInfo(){
        this.setState({showAdditionalInfo: !this.state.showAdditionalInfo});
    }

    setAddInfoToFalse(job){
        job.onlineResumeItems.introduction = false;
        job.onlineResumeItems.education = false;
        job.onlineResumeItems.workExperience = false;
        job.onlineResumeItems.languages = false;
        job.onlineResumeItems.skills = false;
        job.onlineResumeItems.otherSkills = false;
    }

    render() {
        const { job } = this.props;

        if (typeof job.onlineResumeItems === 'undefined'){
            job.onlineResumeItems = {};
        }

        if (typeof job.requiredCandidateInfo === 'undefined') {
            job.requiredCandidateInfo = {};
        }
     
        return (
            <AwFieldset title="Desired information about the candidate" icon="icon-documents">
                {<p>Choose what information to request from the candidates. Candidates will still be able to submit information even if the box is left unchecked.</p>}
                <div className="row">
                    <div className="col-sm-12">
                        <FC.Checkbox label="Resume" name="requiredCandidateInfo.uploadedResume" layout="elementOnly" value={job.requiredCandidateInfo.uploadedResume}/>
                    </div>
                    <div className="col-sm-12">
                        <FC.Checkbox label="Cover letter" name="requiredCandidateInfo.coverLetter" layout="elementOnly" value={job.requiredCandidateInfo.coverLetter}/>
                    </div>
                    <div className="col-sm-12">
                        <FC.Checkbox label="Candidate photo" name="requiredCandidateInfo.profilePicture" layout="elementOnly" value={job.requiredCandidateInfo.profilePicture}/>
                    </div>
                    <div className="col-sm-12">
                        <FC.Checkbox onClick={this.toggleAdditionalInfo} label="Online resume" name="requiredCandidateInfo.onlineResume" layout="elementOnly" value={job.requiredCandidateInfo.onlineResume}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.showAdditionalInfo ? <AdditionalInfoFieldset openPreview={this.props.openPreview} job={job}/> : this.setAddInfoToFalse(job)}
                    </div>
                </div>
            </AwFieldset>
        )
    }
}
