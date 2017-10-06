import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

import './Header.less';

class JobHeader extends Component {

    showAddPosition () {
        const { isPremiumUser } = this.props;

        if (!isPremiumUser) {
            return '';
        }

        return (
            <div className="col-md-4 text-right job-header-add">
                <Link to='/jobs/add' className="icon-plus">
                    Add Position
                </Link>
            </div>
        );
    }

    render () {
        return (
            <header className="row job-header">
                <div className="col-md-8">
                    <h1>Positions</h1>
                </div>
                { this.showAddPosition() }
            </header>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isPremiumUser: state.getIn(['auth', 'user', 'subscriptionType']) === 'premium',
    };
};


export default connect(mapStateToProps)(JobHeader);
