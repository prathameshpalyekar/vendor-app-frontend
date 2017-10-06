import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Formsy from 'formsy-react'

import { AwModal, AwFieldset } from 'components/ui';
import FC from 'components/Formsy';

export default class LanguagesFieldset extends Component {
    
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

    getSelectOptions(){
        const selectOptions = [
            {label: 'Beginner', value: 'beginner'},
            {label: 'Intermediate', value: 'intermediate'},
            {label: 'Advanced', value: 'advanced'}
        ];

        return selectOptions;
    }

    renderLanguageForm() {
    
        if(!this.state.form){
            return null;
        }        

        return (
            <div className="language-form-container" id="language-form">
                <FC.Input name="language-input" label="Language" type="text" placeholder="Language"  value="" disabled={true} />
                <div className="form-group">
                    <span className="control-label col-sm-3">Experience level</span>
                    <div className="experience-select col-sm-4"><FC.Select name="experinece-input" layout="elementOnly" options={this.getSelectOptions()}  value="" disabled={true} /></div>

                    <div className="cancel-save-footer col-sm-5">
                        <button type="button" className="btn btn-danger" onClick={this.handleCancelButton}>Cancel</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { form } = this.state;
        return (
            <AwFieldset title="Languages" icon="icon-globe">
                <div className="add-work icon-plus" onClick={this.renderForm}>Add</div>
                {this.renderLanguageForm()}
            </AwFieldset>
        );
    }    
}