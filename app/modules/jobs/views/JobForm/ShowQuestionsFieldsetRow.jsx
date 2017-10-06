import React, { Component, PropTypes } from 'react';
import cx from 'classnames'
import { connect } from 'react-redux'
import axios from 'axios'
import FC from 'components/Formsy'
import Config from '../../../../config.js';

export default class ShowQuestionsFieldsetRow extends Component {
    
    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onRemove() {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.index);
        }
    }

    onEdit(){
        if(this.props.onEdit){
            this.props.onEdit(this.props.singleQuestion, this.props.index);
        }
    }
    
    renderQuestion(){
        const { index, singleQuestion } = this.props;
        let fieldName = 'questions[' + index + '].' + 'question';
        return (
            <FC.Input type='hidden' name={fieldName} key={index} value={singleQuestion.question} layout="elementOnly" />
            );
    }

    renderType(){
        const { index, singleQuestion } = this.props;
        let fieldName = 'questions[' + index + '].' + 'type';
        return (
            <FC.Input type='hidden' name={fieldName} value={singleQuestion.type} layout="elementOnly" />
            );
    }

    renderOptions(){
        const { index, singleQuestion } = this.props;

        if(typeof singleQuestion.options != 'undefined'){
            return(
                singleQuestion.options.map((v, i) => {
                    let fieldName = 'questions[' + index + '].options.' + i ;
                    if (v && !v._removed) {
                        return (
                            <FC.Input type='hidden' name={fieldName} value={v.option} layout="elementOnly" />
                        );
                    }
                })
            );    
        }
    }

    renderQuestionField() {
        const { singleQuestion } = this.props;
        let type = singleQuestion.type[0].toUpperCase() + singleQuestion.type.slice(1);
        return (
            <div className="row">
                <div className="col-sm-8 -question">
                    {singleQuestion.question}
                    {this.renderQuestion()}
                </div>
                <div className="col-sm-4">
                    <i>{type}</i>
                    {this.renderType()}
                </div>
                <div>
                    {type == 'Dropdown' || type == 'Multiplechoice' ? this.renderOptions() : null}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="job-question-row">
                <div className="-actions edit-container">
                    <span className="icon-edit" onClick={this.onEdit}></span>
                    <span className="icon-cross text-danger" onClick={this.onRemove}></span>
                </div>
                <div className="-fields">
                    {this.renderQuestionField()}
                </div>
            </div>
        );
    }
}
