import React, { Component, PropTypes } from 'react';
import ReactQuill from 'react-quill';

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

class Editor extends Component {

    render () {
        return (
            <ReactQuill
                {...this.props}
                toolbar={toolbar}
                formats={formats}
                styles={false}
                theme='snow'>
            </ReactQuill>
        );
    }
};

Editor.displayName = 'Editor';

export default Editor;
