import React, { Component, PropTypes } from 'react';

import { AwFieldset } from 'components/ui';

export default class Description extends Component {
    render() {
        const { job } = this.props;
        return (
            <AwFieldset title="Job description" icon="icon-job-description">
                <div className="-html-content" dangerouslySetInnerHTML={{__html: job.description}}></div>
            </AwFieldset>
        )
    }
}
