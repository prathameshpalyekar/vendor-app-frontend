import React, { Component, PropTypes } from 'react';

import './Header.less'

export default class Attachments extends Component {

    render() {
        const { job } = this.props;

        return (
            <div className="row job-details-header">
                <div className="col-md-12">
                    <h4 className="-title">{job.title}</h4>
                </div>
            </div>
        )
    }
}
