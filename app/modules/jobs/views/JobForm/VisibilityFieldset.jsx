import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { AwFieldset } from 'components/ui'

import VisibilityRow from './VisibilityFieldsetRow'

class VisibilityFieldset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibilities: props.job.visibility ? props.job.visibility.slice(0) : []
        };

        this.removeRow = this.removeRow.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    addRow(row, index) {
        let visibilities = [ ...this.state.visibilities, {}];

        visibilities[index] = row;

        this.setState({
            visibilities: visibilities
        });
    }

    removeRow(index) {
        const { visibilities } = this.state;

        visibilities[index]._removed = true;

        this.setState({
            visibilities: visibilities
        });
    }

    render() {
        const { job, user } = this.props;

        const owner = {
            userId: job.isNew() ? user.get('id') : job.userId,
            email: job.isNew() ? user.get('email') : job._user ? job._user.email : '',
            type: 'premium'
        };

        const { visibilities } = this.state;

        return (
            <AwFieldset title="Collaborators" icon="icon-published-candidates" className="job-collabarator-fieldset">
                {<p><i>Here you can add people you want to collaborate with for this recruitment process. You can add colleagues, suppliers and clients.</i></p>}
                <div className="job-visbility">
                    <VisibilityRow visibilities={visibilities} owner={owner} />
                </div>
            </AwFieldset>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.getIn(['auth', 'user'])
    };
};

export default connect(mapStateToProps)(VisibilityFieldset);
