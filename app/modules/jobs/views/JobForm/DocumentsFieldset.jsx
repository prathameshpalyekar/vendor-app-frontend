import React, { Component, PropTypes } from 'react';

import { AwFieldset, AwImageHolder } from 'components/ui';
import FC from 'components/Formsy'

const DefaultProfilePic = '/assets/' + require('assets/images/candidate_default_profile_pic.png');

export default class Documents extends Component {
    render() {
        const { job } = this.props;

        return (
            <AwFieldset title="Attachments" icon="icon-attachment">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <FC.FileUpload name="uploads" roundImage={false} isDoc={true} value={job.uploads} acceptedFileTypes="documents"/>
                    </div>
                </div>
            </AwFieldset>
        )
    }
}
