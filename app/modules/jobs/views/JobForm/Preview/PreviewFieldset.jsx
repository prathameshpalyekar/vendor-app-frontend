import React, { Component, PropTypes } from 'react';
import { AwModal, AwFieldset } from 'components/ui'
import Formsy from 'formsy-react'
import FC from 'components/Formsy'

import EducationFieldset from './EducationFieldset';
import WorkFieldset from './WorkFieldset';
import LanguagesFieldset from './LanguagesFieldset';
import SkillsFieldset from './SkillsFieldset';

export default class PreviewFieldset extends Component {
    
    renderIntroduction() {
        return (
            <AwFieldset title="Introduction" icon="icon-candidate">
                <FC.Textarea name="preview-introduction" className="introduction-input" type="text" placeholder="Introduction" layout="elementOnly" disabled={true} />
                <div className="char-counter">500 characters left</div>
            </AwFieldset>
        );
    }
  
    renderOtherSkills() {
        return (
            <AwFieldset title="Other Skills" icon="icon-price-ribbon">
                <FC.Textarea name="preview-otherskills" className="skill-description-input" type="text" placeholder="Other Skills" layout="elementOnly" disabled={true} />
                <div className="char-counter">500 characters left</div>
            </AwFieldset>
        );
    }

    render() {
        const { infoState, isOpen } = this.props;

        return (
            <div className={!isOpen ? 'hide' : ''}>
                <Formsy.Form className="form-horizontal">
                    <AwModal.Body>
                        { infoState.introduction ? this.renderIntroduction() : null }
                        { infoState.education ? <EducationFieldset /> : null }
                        { infoState.workExperience ? <WorkFieldset /> : null }
                        { infoState.languages ? <LanguagesFieldset /> : null }
                        { infoState.skills ? <SkillsFieldset /> : null }
                        { infoState.otherSkills ? this.renderOtherSkills() : null }
                    </AwModal.Body>
                </Formsy.Form>
            </div>
        );
    }
}