import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import FC from 'components/Formsy'
import CreateQuestionFieldsetRow from './CreateQuestionFieldsetRow'

export default class CreateQuestionFieldset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            row: {},
            options: (typeof props.singleQuestion != 'undefined' && props.singleQuestion.options) ? props.singleQuestion.options.slice(0) : [],
            singleQuestion: typeof props.singleQuestion != 'undefined' ? Object.assign({}, props.singleQuestion) : {}
        };

        this.onTypeChange = this.onTypeChange.bind(this);
        this.onQuestionChange = this.onQuestionChange.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.getSelectOptions = this.getSelectOptions.bind(this);
        this.getNotRemovedOptions = this.getNotRemovedOptions.bind(this);
    }

    onAddQuestion(){
        const { singleQuestion, row} = this.state;
        let { options } = this.state;
        
        //set default question type
        typeof singleQuestion.type == 'undefined' ? singleQuestion.type = 'dropdown' : null;

        //add last option(row) if it's not empty
        row.option ? options[options.length] = row : null;

        this.setState({
            singleQuestion: Object.assign(singleQuestion, {
                options: options
            })
        });

        if (this.props.onAddQuestion && singleQuestion) {
            this.props.onAddQuestion(singleQuestion, this.props.index);
        }
    }

    componentWillReceiveProps(nextProps) { 
        if(nextProps.createEdit){
            this.onAddQuestion();
        }
    }

    addRow(row, index) {
        let options = [ ...this.state.options, {}];
        options[index] = row;

        this.setState({
            options: options,
            row: {}
        });
    }

    removeRow(index) {
        const { options } = this.state;

        options[index]._removed = true;

        this.setState({
            options: options
        });
    }

    getSelectOptions() {
        let selectOptions = [{label: 'Dropdown', value: 'dropdown'}, {label: 'Freeform', value: 'freeform'}, {label: 'Multiple Choice', value: 'multiplechoice'}];

        return selectOptions;
    }

    getNotRemovedOptions(option){
        return option._removed ? false : true;
    }

    renderDropdown(){
        const { row } = this.state;
        const { index } = this.props;

        //get only not removed options
        this.state.options = this.state.options.filter(this.getNotRemovedOptions);

        return (
            <div>
                {this.state.options.map((v, i) => {
                    if (v) {
                        return (<CreateQuestionFieldsetRow questionIndex={index} row={v} index={i} key={i} isNew={false} edit={true} onRemove={this.removeRow}/>)
                    }
                })}
                <CreateQuestionFieldsetRow questionIndex={index} row={row} index={this.state.options.length} key={this.state.options.length} isNew={true} onAdd={this.addRow} />
            </div>
        );
    }

    onQuestionChange(name, value){
        this.setState({
            singleQuestion: Object.assign(this.state.singleQuestion, {
                question: value
            })
        });
    }

    onTypeChange(name, value){
        this.setState({
            singleQuestion: Object.assign(this.state.singleQuestion, {
                type: value
            })
        })
    };

    render() {
        const { index } = this.props;
        const { singleQuestion } = this.state;
        let questionField = 'questions[' + index + '].' + 'question';
        let questionType = 'questions[' + index + '].' + 'type';

        let singleQuestionType = singleQuestion.type;
        const singleQuestionOptions = this.getSelectOptions();
        if(typeof(singleQuestionType) === 'undefined') {
            singleQuestionType = singleQuestionOptions[0].value;
        }

        return(
            <div className = "additionalInfoFieldset panel panel-default panel-body">
                <div className="row">
                    <div className="col-sm-12">
                        <FC.Input layout="elementOnly" type='text' label="Write a new question" name={questionField} value={singleQuestion.question} onChange={this.onQuestionChange}/>
                        <FC.ButtonGroup layout="vertical" label="Question Type" name={questionType} onChange={this.onTypeChange}  options={singleQuestionOptions} value={singleQuestionType} />
                    </div>
                </div>

                { singleQuestion.type == 'freeform' ? null : this.renderDropdown() }
            </div>
        );
    }
}