import React, { Component, PropTypes } from 'react';
import cx from 'classnames'
import { connect } from 'react-redux'
import axios from 'axios'
import FC from 'components/Formsy'
import Config from '../../../../config.js';

export default class CreateQuestionFieldsetRow extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            row: props.row
        };

        this.optionChangeTimeout = false;
        this.onOptionChange = this.onOptionChange.bind(this);
        this._onOptionChange = this._onOptionChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    _onOptionChange(value) {
        this.setState({
            row: Object.assign(this.state.row, {
                option: value,
            })
        });
    }

    onOptionChange(name, value) {
        if (this.optionChangeTimeout) {
            clearTimeout(this.optionChangeTimeout);
        }

        this.optionChangeTimeout = setTimeout(() => {
            this._onOptionChange(value);
        }, 100);
    }

    renderOptionField() {
        const { questionIndex, index, row } = this.props;
        let fieldName = 'questions['+ questionIndex +'].options.' + index;
        let labelName = "";

        //Add options label should be located only at the first row
        (index == 0) ? labelName = "Options" : '';
        return (
            <FC.Input type='text' layout="elementOnly" label={labelName} name={fieldName} value={row.option} onChange={this.onOptionChange } />
        );
    }

    onRemove() {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.index);
        }
    }

    onAdd() {
        const { row } = this.state;
        if (this.props.onAdd && row) { 
            this.props.onAdd(row, this.props.index);
        }
    }

    canAddMore() {
        const { row } = this.state;

        return row;
    }

    render() {
        const { isNew } = this.props;

        let canAddMore = this.canAddMore();
        let addClassNames = cx('icon-plus', canAddMore ? 'text-primary' : 'text-muted');

        // <div className="-actions col-sm-1">
        //     { isNew ? <span className={addClassNames} onClick={this.onAdd} disabled={!canAddMore}></span> : <span className="icon-cross text-danger" onClick={this.onRemove}></span> }
        // </div>


        return (
            <div className="create-question-row">
                <div className="row">
                    <div className="-fields col-sm-12">
                        <div className="-input-container">
                            {this.renderOptionField()}
                        </div>
                        { isNew ? <span className={addClassNames} onClick={this.onAdd} disabled={!canAddMore}></span> : <span className="icon-cross text-danger" onClick={this.onRemove}></span> }
                    </div>
                </div>
            </div>
        );
    }
}
