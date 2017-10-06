import React, { Component, PropTypes } from 'react';
import ReactQuill from 'react-quill';
import Formsy from 'formsy-react'
import Editor from './Editor.jsx'

import './less/base.less';
import './less/theme.less';
import './less/override.less';

const toolbar = [
    { label:'Text', type:'group', items: [
        { type:'bold', label:'Bold' },
        { type:'italic', label:'Italic' },
        // { type:'strike', label:'Strike' },
        { type:'underline', label:'Underline' },
        { type:'bullet', label:'Bullet' },
        // { type:'list', label:'List' }
    ]}
];

const formats = [
    // "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    // { name: "h1", tag: "H1", prepare: "heading", type: "line" },
    // { name: "h2", tag: "H2", prepare: "heading", type: "line" },
    // { name: "h3", tag: "H3", prepare: "heading", type: "line" }
];

export default React.createClass({

    mixins: [Formsy.Mixin],

    changeValue (value) {
        this.setValue(value);
    },

    render () {
        var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
        var errorMessage = this.getErrorMessage();

        return (
            <Editor
                {...this.props}
                onChange={this.changeValue}
                value={this.getValue()}>
            </Editor>
        );
    }
});

