import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AwFieldset } from 'components/ui';
import { Link } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import { createUrlToken } from 'modules/jobs/actions/createUrlToken';

class LinkUrl extends Component {

    constructor(props) {
        super(props)
        this.state = {
            copiedValue: "",
        };
    }

    componentWillMount() {
        const { dispatch, job } = this.props;

        dispatch(createUrlToken({
            jobId: job.id,
            type: 'APPLICATION'
        }, (message) => {
            Alert.error(message);
        }));
    }

    renderApplicationLink() {
        const { job, user } = this.props;
        const { urlToken } = job;
        let addApplicationLinkToken = null;

        if (urlToken) {
            addApplicationLinkToken = urlToken.find((token) => {
                return token.userId === user.get('id');
            });
        } 

        const addApplicationLink = {
            pathname: addApplicationLinkToken ? addApplicationLinkToken.token : ''
        };

        let applicationLinkPath = window.location.origin + addApplicationLink.pathname;
        if (addApplicationLink.pathname === '') {
            applicationLinkPath = 'Please refresh to genrate application link.'
        }
        this.state.copiedValue = applicationLinkPath;

        return (
            <Link to={addApplicationLink} target="_blank">
                {applicationLinkPath}
            </Link>
        );
    }


    render() {
        const { job } = this.props;

        return (
            <AwFieldset title="LinkUrl" icon="icon-link">
                { <p>This URL leads directly to a public application form for the position and can be distributed via e-mail or published in your own social media channels.</p> }
                <div className="row">
                    <div className="col-sm-8">
                        {this.renderApplicationLink()}
                    </div>
                    <div className="col-sm-4">
                        <CopyToClipboard text={this.state.copiedValue}>
                            <button type="button" className="btn btn-info icon-clipboard">Copy to clipboard</button>
                        </CopyToClipboard>
                    </div>
                </div>
            </AwFieldset>
        )
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapDispatchtoProps)(LinkUrl);
