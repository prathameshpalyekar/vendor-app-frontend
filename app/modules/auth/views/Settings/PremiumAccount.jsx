import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { AwModal, AwFieldset } from 'components/ui';

import { saveSettings } from '../../actions/settings.js'

class PremiumAccount extends Component {

    constructor(props) {
        super(props);

        this.makePremium = this.makePremium.bind(this);
    }

    makePremium() {
        const { dispatch, user } = this.props;

        dispatch(saveSettings({
            subscriptionType: user.get('subscriptionType') === 'premium' ? 'basic' : 'premium'
        }));
        // this.setState({ submitted: true });
    }

    render() {
        const { user } = this.props;

        let messageText = <p>Do you want to create positions? Upgrade to a premium account! Monthly fee is <b>149 SEK</b>.</p>

        if (user.get('subscriptionType') === 'premium') {
            messageText = <p>Awesome! You now have premium account.</p>
        }

        return (
            <AwFieldset title="Premium account" isDark={true}>
                {messageText}
                <div className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.makePremium}>{user.get('subscriptionType') !== 'premium' ? 'Upgrade to premium account' : 'Downgrade to basic account'}</button>
                </div>
            </AwFieldset>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.getIn(['auth', 'user']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PremiumAccount);
