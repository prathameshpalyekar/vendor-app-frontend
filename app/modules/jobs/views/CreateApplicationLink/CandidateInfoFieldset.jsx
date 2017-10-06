import React, { Component, PropTypes} from 'react';
import { AwFieldset } from 'components/ui';
import FC from 'components/Formsy';
import AdditionalInfoFieldset from './AdditionalInfoFieldset'

export default class CandidateInfoFieldset extends Component {

    constructor(props) {
        super(props);
        const { job } = this.props;
        this.onChange = this.onChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.changeOnlineResumeInfo = this.changeOnlineResumeInfo.bind(this);

        const info = this.getInfo();

        this.state = {
            name: info.requiredCandidateInfo ? info.requiredCandidateInfo.name : false,
            personalNumber : info.requiredCandidateInfo ? info.requiredCandidateInfo.personalNumber : false,
            email : info.requiredCandidateInfo ? info.requiredCandidateInfo.email : false,
            uploadedResume : info.requiredCandidateInfo ? info.requiredCandidateInfo.uploadedResume : false,
            coverLetter : info.requiredCandidateInfo ? info.requiredCandidateInfo.coverLetter : false,
            onlineResume: info.requiredCandidateInfo ? info.requiredCandidateInfo.onlineResume : false, 
            candidateInfo: info
        }
    }

    getInfo() {
        const { job, user } = this.props;

        if (typeof job.requiredCandidateInfo === 'undefined') {
            job.requiredCandidateInfo = {};
        }

        if (typeof job.onlineResumeItems === 'undefined') {
            job.onlineResumeItems = {};
        }

        if (job.getUserVisibility(user) === 'supplier') {
            if (job.urlToken) {
                const targetToken = job.urlToken.find((token) => {
                    return token.userId === user.get('id');
                })

                if (targetToken) {
                    if (typeof targetToken.requiredCandidateInfo === 'undefined') {
                        targetToken.requiredCandidateInfo = {};
                        Object.keys(job.requiredCandidateInfo).forEach(function (key) {
                            targetToken.requiredCandidateInfo[key] = job.requiredCandidateInfo[key];
                        });

                    }

                    if (typeof targetToken.onlineResumeItems === 'undefined') {
                        targetToken.onlineResumeItems = {};
                        Object.keys(job.onlineResumeItems).forEach(function (key) {
                            targetToken.onlineResumeItems[key] = job.onlineResumeItems[key];
                        });
                    }
                    return targetToken;
                }
            }
        }

        return job;
    }

    setAddInfoToFalse(info) {
        info.onlineResumeItems.introduction = false;
        info.onlineResumeItems.education = false;
        info.onlineResumeItems.workExperience = false;
        info.onlineResumeItems.languages = false;
        info.onlineResumeItems.skills = false;
        info.onlineResumeItems.otherSkills = false;
    }

    changeOnlineResumeInfo(name, value) {
        const info = this.state.candidateInfo;
        info.onlineResumeItems[name] = value;
        this.setState({
            andidateInfo: info
        })
        this.props.onDataChange(info);
    }

    onChange(name, value) {
        const info = this.state.candidateInfo;
        info.requiredCandidateInfo[name] = value;

        this.setState({
            [name] : value,
            candidateInfo: info
        })
        

        if (name == 'onlineResume' && !value) {
            this.setAddInfoToFalse(info);
        }

        this.props.onDataChange(info);
    }

    render() {
        const { name, personalNumber, email, uploadedResume, coverLetter, onlineResume } = this.state;

        return (
            <AwFieldset title="Required information from candidates" icon="icon-documents">
                {<p>Choose which fields that candidate will be required to fill out. You can always add more information manually later.</p>}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-4">
                            <FC.Checkbox label="Name" onChange={this.onChange} name="name" layout="elementOnly" value={name}/>
                        </div>
                        <div className="col-sm-4">
                            <FC.Checkbox label="Phone Number" onChange={this.onChange} name="personalNumber" layout="elementOnly" value={personalNumber}/>
                        </div>
                        <div className="col-sm-4">
                            <FC.Checkbox label="E-mail" onChange={this.onChange} name="email" layout="elementOnly" value={email}/>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="col-sm-4">
                            <FC.Checkbox label="Uploaded resume (PDF/Word)" onChange={this.onChange} name="uploadedResume" layout="elementOnly" value={uploadedResume}/>
                        </div>
                        <div className="col-sm-4">
                            <FC.Checkbox label="Cover letter (PDF/Word)" onChange={this.onChange} name="coverLetter" layout="elementOnly" value={coverLetter}/>
                        </div>
                        <div className="col-sm-4">
                            <FC.Checkbox label="Online resume" onChange={this.onChange} name="onlineResume" layout="elementOnly" value={onlineResume}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {onlineResume ? <AdditionalInfoFieldset changeOnlineResumeInfo={this.changeOnlineResumeInfo} openPreview={this.props.openPreview} info={this.getInfo()}/> : null}
                    </div>
                </div>
            </AwFieldset>
        )
    }
}
