
'use strict';

const React = require('react');
const Formsy = require('formsy-react');
const ComponentMixin = require('./mixins/component');
const Row = require('./row');

const Radio = React.createClass({

	mixins: [Formsy.Mixin, ComponentMixin],
	
	clickRadio: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function(){
    	const checked = (this.getValue() === this.props.defaultValue);
    	return (
    		<div className="radio-container">
    			<input 
    				type="radio" 
    				name={this.props.name} 
    				checked={checked}
    				value={this.props.defaultValue}
    				onClick={this.clickRadio}
    				id={this.props.radioId} />
    			<label className="control-label" htmlFor={this.props.radioId} >{this.props.label}</label>
    		</div>
    	);
    }
});

module.exports = Radio;