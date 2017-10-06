import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SocketDisconnect from 'components/socket/disconnect'
import { AwModal, AwFieldset } from '../../../components/ui';
import { logoutUser } from '../actions/logout.js';
import Config from '../../../config';

class Logout extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(logoutUser());
    }

    componentWillUpdate(nextProps) {
        if (!nextProps.isAuthenticated) {
            // FIXME: Should we be doing this?
            SocketDisconnect();
   
            setTimeout(() => {
                window.location = '/login';
                // this.context.router.push('/login');
            }, 1000);
        }
    }

    render() {
        const { isAuthenticated, isFetching } = this.props;

        return (
            <AwModal.Modal
                isOpen={true}
                noCloseBtn={true}
                headerTitle="Logout">

                <AwModal.Body>
                    {!isAuthenticated ? <p>Logged out. Redirecting...</p> : isFetching ? <p>Logging out...</p> : <p>Something went wrong.</p>}
                </AwModal.Body>

            </AwModal.Modal>
        );
    }
}

Logout.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isFetching: state.getIn(['auth', 'isFetching']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Logout);
