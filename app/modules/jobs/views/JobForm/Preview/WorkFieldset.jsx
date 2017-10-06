import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Formsy from 'formsy-react'

import { AwModal, AwFieldset } from 'components/ui';
import FC from 'components/Formsy';

export default class WorkFieldset extends Component {
    
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

    renderWorkForm() {
        
        if(!this.state.form){
            return null;
        }

        return (
            <div className="work-form-container" id="work-form">
                <FC.Input name="company-input" label="Company" type="text" placeholder="Company" ref="companyInput"  value="" disabled={true} />
                <FC.Input name="job-profile-input" label="Job profile" type="text" placeholder="Job profile" value="" disabled={true} />
                <div className="form-group date-row">
                    <span className="control-label col-sm-3">Employment period</span>
                    <div className="col-sm-9">
                      <div className="row">
                        <div className="col-sm-5">
                        <FC.DatePicker className="resume-work-start" name="work-start-date-input" layout="elementOnly" type="date" value="" disabled={true}/>
                        </div>
                        <span className="dash col-sm-2">-</span>
                        <div className="col-sm-5">
                          <FC.DatePicker className="resume-work-end" name="work-end-date-input" layout="elementOnly" type="date" value="" />
                        </div>
                      </div> 
                    </div>
                </div>
                <button type="button" className="btn btn-danger cancel-button" onClick={this.handleCancelButton}>Cancel</button>
                <button type="button" className="btn btn-primary save-button" >Save</button>
            </div>
        );
    }

    render() {
        const { form } = this.state;
        
        return (
             <AwFieldset title="Work experience" icon="icon-suitcase">
                <div className="add-work icon-plus" onClick={this.renderForm}>Add</div>
                {this.renderWorkForm()}
            </AwFieldset>
        );
    }    
}