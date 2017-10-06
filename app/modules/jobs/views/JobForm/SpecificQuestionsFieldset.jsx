import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AwFieldset } from 'components/ui'
import FC from 'components/Formsy'
import CreateQuestionFieldset from './CreateQuestionFieldset'
import CreateQuestionFieldsetRow from './CreateQuestionFieldsetRow'
import ShowQuestionsFieldsetRow from './ShowQuestionsFieldsetRow'
import Job from '../../models/Job'

const QuestionTypeTextMap = {
    previous: 'previous',
    batch: 'batch',
    new: 'new',
};

class SpecificQuestionsFieldset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createQuestionIsOpen: false,
            isEditing: false,
            questionToEdit: null,
            editIndex: null,
            form: false,
            createEdit: false, 
            questionType : QuestionTypeTextMap.previous,
            batchOfQuestions: [],
            singleQuestions: {},
            tempQuestions: [], 
            questions: props.job.questions ? props.job.questions.slice(0) : [],
        };
        //get previous questions
        this.getPreviousQuestions();

        //bindings
        this.addQuestion = this.addQuestion.bind(this);
        this.addPreviousQuestion = this.addPreviousQuestion.bind(this);
        this.addBatchOfQuestions = this.addBatchOfQuestions.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.mapOptionsToObject = this.mapOptionsToObject.bind(this);
        this.showCreateQuestion = this.showCreateQuestion.bind(this);
        this.closeCreateQuestion = this.closeCreateQuestion.bind(this);
        this.renderCreateQuestion = this.renderCreateQuestion.bind(this);
        this.setQuestionType = this.setQuestionType.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    getPreviousQuestions(){
        const {batchOfQuestions, singleQuestions} = this.state;
        let jobs = this.props.jobs.get('data').toArray();

        for(let i = 0; i < jobs.length; i++){
            let job = new Job(jobs[i].toObject())
            if(job.questions){
                    batchOfQuestions.push({title: job.title, questions: job.questions})
            }
        };

        for(let i = 0; i < batchOfQuestions.length; i++ ){
            for(let j = 0; j < batchOfQuestions[i].questions.length; j++)
                singleQuestions[batchOfQuestions[i].questions[j].question] = batchOfQuestions[i].questions[j];
        }
    }

    addQuestion(newQuestions, index) {
        let questions = [ ...this.state.questions];
        
        if(newQuestions.constructor === Array){
            for(let i = 0; i < newQuestions.length; i++){
                questions[index] = newQuestions[i];
                index++;
            }
        }else{
            questions[index] = newQuestions;    
        }
        
        var stateObject = { questions: questions};

        if(this.state.questionType === "new"){
            stateObject["createEdit"] = false;
        }

        this.setState(stateObject);
        this.closeCreateQuestion();
    }

    onSave() {
        const { questions, questionType } = this.state;
        switch(questionType){
            case "previous":
                this.addQuestion(this.state.tempQuestions, questions.length);
                break;

            case "batch":
                this.addQuestion(this.state.tempQuestions, questions.length);
                break;

            case "new":
                this.setState({
                    createEdit: true
                });
                break;
        }
    }

    addPreviousQuestion(name, value){
        const { singleQuestions, questions } = this.state;
        if(value != null){
            this.setState({
                tempQuestions: singleQuestions[value]
            });
        }
    }

    addBatchOfQuestions(name, value){
        const { batchOfQuestions, questions } = this.state;
        let questionToAdd = [];

        if(value != null){
            for(let i = 0; i < batchOfQuestions[value].questions.length; i++){
                questionToAdd.push(Object.assign({}, batchOfQuestions[value].questions[i]));
            }
            this.setState({
                tempQuestions: questionToAdd
            });
        }
    }

    removeRow(index) {
        const { questions } = this.state;
        questions[index]._removed = true;

        this.setState({
            questions: questions
        });
    }

    editQuestion(question, index){
        this.state.isEditing = true;
        this.state.editIndex = index;
        this.state.form = true;
        this.state.questionToEdit = Object.assign({}, question);
        this.showCreateQuestion();
    }

    getAddQuestionOptions() {
        const { singleQuestions } = this.state;
        let addQuestionOptions = [{label: 'Choose from previous positions', value: null}];
        Object.keys(singleQuestions).map((v, i) => {v != null ? addQuestionOptions.push({label: v, value: v}) : null});
        return addQuestionOptions;
    }

    getAddBatchQuestionOptions() {
        const { batchOfQuestions } = this.state;
        let addBatchQuestionOptions = [{label: 'Choose from previous positions',value: null}];
        batchOfQuestions.map((v, i) => {addBatchQuestionOptions.push({label: v.title, value: i})});
        return addBatchQuestionOptions;
    }

    showCreateQuestion(){
        this.setState({createQuestionIsOpen: true});
    }

    closeCreateQuestion(){
        this.setState({
            isEditing: false,
            createQuestionIsOpen: false,
            form: false
        });
    }

    renderCreateQuestion(){
        const { questions, isEditing, editIndex } = this.state;
        const createEdit  =  this.state.createEdit && this.state.questionType === "new";
        if(!isEditing){
            return(
                <CreateQuestionFieldset isNew={true} createEdit={createEdit} previousQuestions={this.state.previousQuestions} index={questions.length} key={questions.length} onAddQuestion={this.addQuestion} closeFunc={this.closeCreateQuestion}/> : null
                );
        }else{
            return(
                <CreateQuestionFieldset isNew={false} createEdit={createEdit} index={editIndex} key={editIndex} singleQuestion={this.state.questionToEdit} onAddQuestion={this.addQuestion} closeFunc={this.closeCreateQuestion}/> 
            );
        }
    }

    mapOptionsToObject(question){
        let newQuestion = {question: '', type: '', options: []};
        newQuestion.question = question.question;
        newQuestion.type = question.type;
        if(question._removed) newQuestion['_removed'] = true;
        for(let i = 0; i < question.options.length; i++){
            newQuestion.options.push({option: question.options[i]});
        }
        
        return newQuestion;
    }

    showForm(){
        this.setState({
            form : true
        });  
    }

    setQuestionType(name, value) {
        this.setState({
            questionType : value
        });
    }

    render() {
        const { questions } = this.state;

        return (
            <AwFieldset title="Killer questions about the candidate" icon="icon-bullets">
            {<p className = "description-label"><em>Add specific questions that can be answered about the candidate. </em></p>}
                {questions.map((v, i) => {
                    if(v.type == 'dropdown' || v.type == 'multiplechoice'){
                        if(typeof v.options[0] == 'string' && v.type == 'dropdown'){
                            v = this.mapOptionsToObject(v);
                        }
                        if(typeof v.options[0] == 'string' && v.type == 'multiplechoice'){
                            v = this.mapOptionsToObject(v);
                        }
                    }

                    if(v){
                        if (!v._removed) {
                            {return (<ShowQuestionsFieldsetRow singleQuestion={v} index={i} key={i} onRemove={this.removeRow} onEdit={this.editQuestion}/>)}
                        }
                    }
                })}

                {this.state.form ?
                    <div className="row">
                        <AwFieldset className="specific-questions-fieldset" noToggleButton={true} >
                            <FC.Radio  label="Add previously used question" name="question-type" onChange={this.setQuestionType} defaultValue="previous" value={this.state.questionType} radioId="previous-question-type" />
                            <div className="select-container">
                                <FC.Select label="Add question" layout="elementOnly" name="question" options={this.getAddQuestionOptions()} onChange={this.addPreviousQuestion} />
                                <span className="icon-chevron-small-down"></span>
                            </div>
                            <FC.Radio  label="Add all questions from a previous question" name="question-type" defaultValue="batch" onChange={this.setQuestionType}  value={this.state.questionType} radioId="batch-question-type" />
                            <div className="select-container">
                                <FC.Select label="Add batch of questions" layout="elementOnly" name="batch-of-questions" options={this.getAddBatchQuestionOptions()} onChange={this.addBatchOfQuestions} />
                                <span className="icon-chevron-small-down"></span>
                            </div>
                            <FC.Radio  label="Write a new question" name="question-type" defaultValue="new" onChange={this.setQuestionType} value={this.state.questionType} radioId="new-question-type" />
                            {this.renderCreateQuestion()} 
                            <div className="footer">
                                <button type="button" onClick = {this.closeCreateQuestion} className="btn btn-danger">Cancel</button>
                                <button type="button" onClick = {this.onSave} className="btn btn-primary">Save</button>
                            </div>
                        </AwFieldset>
                    </div>:
                    <div className="row">
                        <button type="button" className="btn btn-primary job-question-add-question" onClick={this.showForm.bind(this)} >Add question</button>
                    </div> 
                }

                {/*Add own question button*/}
             
            </AwFieldset>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        jobs: state.get('jobs'),
    };
};

export default connect(mapStateToProps)(SpecificQuestionsFieldset);
