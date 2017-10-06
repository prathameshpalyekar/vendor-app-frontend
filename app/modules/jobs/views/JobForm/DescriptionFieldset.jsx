import React, { Component, PropTypes } from 'react';

import { AwFieldset } from 'components/ui';
import FormsyEditor from 'components/Editor/FormsyEditor'

export default class DescriptionFieldset extends Component {
    render() {
        const { job } = this.props;
        return (
            <AwFieldset title="Job description" icon="icon-job-description">
                {/* <p>Describe the position lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. See example descriptions <a href="#">here</a>.</p> */}
                <FormsyEditor name="description" value={job.description || ''}/>
            </AwFieldset>
        )
    }
}
