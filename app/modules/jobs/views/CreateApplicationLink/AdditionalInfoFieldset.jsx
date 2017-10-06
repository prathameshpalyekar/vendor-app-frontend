import React, { Component, PropTypes } from 'react';

import { AwFieldset } from 'components/ui'
import FC from 'components/Formsy'

export default class AdditionalInfoFieldset extends Component {
    constructor(props) {
        super(props);
        const {info} = this.props;
        this.openPreview = this.openPreview.bind(this);
        this.infoChange = this.infoChange.bind(this);
        this.state = {
            preview: false,
            infoState: {
                introduction: info.onlineResumeItems ? info.onlineResumeItems.introduction : false,
                education: info.onlineResumeItems ? info.onlineResumeItems.education : false,
                workExperience: info.onlineResumeItems ? info.onlineResumeItems.workExperience : false,
                languages: info.onlineResumeItems ? info.onlineResumeItems.languages : false,
                skills: info.onlineResumeItems ? info.onlineResumeItems.skills : false,
                otherSkills: info.onlineResumeItems ? info.onlineResumeItems.otherSkills : false 
            }
        };
    }

    openPreview (event) {
        const { infoState } = this.state;
        this.props.openPreview(infoState);
    }


    infoChange(name, target) {
        const { infoState } = this.state;
        infoState[name] = target;

        this.setState({
            infoState: infoState 
        });

        this.props.changeOnlineResumeInfo(name, target);
    }

    render() {
        const { info } = this.props;
        const { infoState } = this.state;
        
        return (
            <div className = "additionalInfoFieldset panel panel-default panel-body">
                {<p>Select what information to be populated in the online resume.</p>}
                <div className="row info-block">
                    <div className="col-sm-12">
                        <FC.Checkbox label="Introduction" name="introduction" layout="elementOnly" value={infoState.introduction} onChange={this.infoChange} />
                        <FC.Checkbox label="Education" name="education" layout="elementOnly" value={infoState.education} onChange={this.infoChange} />
                        <FC.Checkbox label="Work experience" name="workExperience" layout="elementOnly" value={infoState.workExperience} onChange={this.infoChange}/>
                        <FC.Checkbox label="Languages" name="languages" layout="elementOnly" value={infoState.languages} onChange={this.infoChange} />
                        <FC.Checkbox label="Skills" name="skills" layout="elementOnly" value={infoState.skills} onChange={this.infoChange} />
                        <FC.Checkbox label="Other skills" name="otherSkills" layout="elementOnly" value={infoState.otherSkills} onChange={this.infoChange} />
                    </div>
                    <span className="preview-info icon-preview-eye" onClick={this.openPreview}>Preview</span>
                </div>
            </div>
        )
    }
}
