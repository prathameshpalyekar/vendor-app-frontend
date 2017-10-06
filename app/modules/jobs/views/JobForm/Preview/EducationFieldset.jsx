import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Formsy from 'formsy-react'

import { AwModal, AwFieldset } from 'components/ui';
import FC from 'components/Formsy';

export default class EducationFieldset extends Component {
    
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

    renderEducationForm() {
        
        if(!this.state.form){
            return null;
        }

        return (
            <div className="education-form-container">
                <FC.Input name="country-input" label="Country" type="text" placeholder="Country" disabled={true} />
                <FC.Input name="school-input" label="School" type="text" placeholder="School" disabled={true} />
                <FC.Input name="field-of-studies-input" label="Field of studies" type="text" placeholder="Field of studies" disabled={true} />
                <div className="form-group date-row">
                <span className="control-label col-sm-3">Time of studies</span>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-5">
                            <FC.DatePicker name="education-start-date-input" className="resume-education-start" disabled={true} value="" layout="elementOnly" type="date" />
                        </div>
                        <span className="dash col-sm-2">-</span>
                        <div className="col-sm-5">
                            <FC.DatePicker name="education-end-date-input col-sm-5" className="resume-education-end  col-sm-5" disabled={true} layout="elementOnly" type="date" />
                        </div>
                    </div>
                </div>
                </div>
                <FC.Input name="education-description-input" label="Description" type="text" placeholder="Description"  disabled={true}  value="" />
                <button type="button" className="btn btn-danger cancel-button" onClick={this.handleCancelButton}>Cancel</button>
                <button type="button" className="btn btn-primary save-button">Save</button>
            </div>
        );
    }

    render() {
        const { form } = this.state;
        
        return (
            <AwFieldset title="Education" icon="icon-graduation-cap">
                <div className="add-education icon-plus" onClick={this.renderForm}>Add</div>
                {this.renderEducationForm()}
            </AwFieldset>
        );
    }    
}