import React, { Component, PropTypes } from 'react';

import { AwFieldset } from 'components/ui';
import FC from 'components/Formsy'
import Job from '../../models/Job'

export default class DetailsFieldset extends Component {
    // getOptionForPositions() {
    //     return Array(11).fill(0).map((n, i) => {
    //         if (i === 0) {
    //             return {
    //                 label: '[Select available positions]',
    //                 value: ''
    //             }
    //         }
    //         return {
    //             label: i,
    //             value: i
    //         }
    //     });
    // }

    getOptionForPositionTypes() {
        let positionTypes = [];

        Object.keys(Job.PositionTypes).forEach(function (key) {
            positionTypes.push({
                label: Job.PositionTypes[key],
                value: key
            })
        });

        return positionTypes;
    }

    render() {
        const { job } = this.props;
//      <FC.Select layout="vertical" label="Position type" name="positionType" options={this.getOptionForPositionTypes()} value={job.positionType} required/>


        return (
            <AwFieldset title="Job details" icon="icon-info">
                <FC.Input layout="vertical" label="Title" name="title" placeholder="Title" value={job.title}  maxLength="100" />
                <FC.Input layout="vertical" label="Location" name="location" placeholder="Location" value={job.location} />
                <FC.DatePicker layout="vertical" value={job.lastDate} name="lastDate" label="To be filled by"  type="date"/>
                <FC.ButtonGroup layout="vertical" label="Position Type" name="positionType" options={this.getOptionForPositionTypes()} value={job.positionType} />
                <FC.Input layout="vertical" type="number" min="0" step="1" label="Number to hire" name="noOfPositions" value={job.noOfPositions} />
                <FC.Input layout="vertical" label="Link to job ad" name="linkToJob" type="text" value={job.linkToJob}/>
            </AwFieldset>
        )
    }
}
