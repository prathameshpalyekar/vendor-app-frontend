import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Formsy from 'formsy-react'

import { AwModal, AwFieldset } from 'components/ui';
import FC from 'components/Formsy';

export default class SkillsFieldset extends Component {
    
    constructor(props) {
        super(props);
        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.renderForm = this.renderForm.bind(this);
        
        this.state = {
            form: false
        };
    }
    
    renderForm() {
        this.setState({
            form: true
        });
    }
 
    handleCancelButton() {
        this.setState({
            form: false
        });
    }

    renderLanguageForm() {
        
        if(!this.state.form){
            return null;
        }

        return (
            <div className="skill-form-container" id="skill-form">
                <FC.Input name="skill-input" label="Skill" type="text" placeholder="Skill" ref="skillInput"  value="" />
                <button type="button" className="btn btn-danger cancel-button" onClick={this.handleCancelButton}>Cancel</button>
                <button type="button" className="btn btn-primary save-button">Save</button>
            </div>
        );
    }

    render() {
        const { form } = this.state;

        return (
            <AwFieldset title="Skills" icon="icon-price-ribbon">
                <div className="add-work icon-plus" onClick={this.renderForm}>Add</div>
                {this.renderLanguageForm()}
            </AwFieldset>
        );
    }    
}