/*jshint node:true */

'use strict';

const React = require('react');
const Formsy = require('formsy-react');
const ComponentMixin = require('./mixins/component');
const Row = require('./row');

const ButtonGroup = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function(item,event) {
        this.setValue(item.value);
        this.props.onChange(this.props.name, item.value);
    },

    render: function() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
        }

        return (
            <Row
                {...this.getRowProperties()}
                htmlFor={this.getId()}
            >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },
    renderElement: function() {
        
        const optionNodes = this.props.options.map((item, index) => {
            
            let className = "btn btn-default";
            if(this.getValue() !== undefined && this.getValue() === item.value){
                className += ' active';
            }
            return (
                <a href="#" className={className} key={index} {...item} onClick={this.changeValue.bind(this,item)}>{item.label}</a>
            );

        });
        return (
            <div
                ref="element"
                className="btn-group btn-group-justified form-control"
                {...this.props}
                id={this.getId()}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
            >
                {optionNodes}
            </div>
        );
    }
});

module.exports = ButtonGroup;