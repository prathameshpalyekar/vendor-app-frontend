import React, { Component, PropTypes } from 'react';

import { AwFieldset } from 'components/ui';

class DetailsRow extends Component {
    render() {
        const { label, value } = this.props;

        return (
            <div className="row">
                <p className="col-md-4"><b>{label}</b></p>
                <p className="col-md-8">{value}</p>
            </div>
        )
    }
}

class DetailsLinkRow extends Component {
    render() {
        const { label, value } = this.props;

        let link = value ? <a href={value} target="_blank">{value}</a> : '';

        return (
            <div className="row">
                <p className="col-md-4"><b>{label}</b></p>
                <p className="col-md-8">{link}</p>
            </div>
        )
    }
}

export default class Details extends Component {
    render() {
        const { job } = this.props;
        return (
            <AwFieldset title="Job details" icon="icon-info">
                { job.title ? <DetailsRow label="Title" value={job.title} /> : null }
                { job.location ? <DetailsRow label="Location" value={job.location}  /> : null }
                <DetailsRow label="To be filled by" value={job.lastDate.format('YYYY-MM-DD')} />
                { job.getPositionType() ? <DetailsRow label="Position type" value={job.getPositionType()} /> : null }
                { job.noOfPositions ? <DetailsRow label="Amount of positions" value={job.noOfPositions} /> : null }
                {job.linkToJob && <DetailsLinkRow label="Link to job ad" value={job.linkToJob} /> }
            </AwFieldset>
        )
    }
}
