import React, { Component, PropTypes } from 'react';
import { AwModal } from 'components/ui';

export default class Attachments extends Component {
    
    getFileName() {
        const { uploads }  = this.props.job;
        let fileName = uploads.substr(uploads.lastIndexOf('/') + 1);

        return fileName.substring(0, fileName.lastIndexOf('-')) + uploads.substr(uploads.lastIndexOf('.'));
    }

    render() {
        const { job } = this.props;
        
        if (!job.uploads) {
            return null;
        }

        return (
            <AwModal.Band>
                <div className="row">
                    <div className="col-md-12">
                        <span className='icon-attachment'>
                            <a href={job.uploads} target="_blank">{this.getFileName()}</a>
                        </span>
                    </div>
                </div>
            </AwModal.Band>
        )
    }
}
