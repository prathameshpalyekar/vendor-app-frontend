import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'
import Formsy from 'formsy-react'
import Alert from 'react-s-alert'

import FC from 'components/Formsy'
import { AwModal, AwFieldset } from 'components/ui';
import { loginUser } from '../actions/login.js';
import Config from '../../../config';
const Logo = '/assets/' + require('assets/images/logo.jpg');

import './Login.less'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { router } = this.context;
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            router.replace(Config.LANDING_URL);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { router } = this.context;

        if (this.state.submitted && !nextProps.isFetching) {
            const { router } = this.context;
            // Error condition should be before
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                if (nextProps.isAuthenticated) {
                    router.replace(Config.LANDING_URL);
                }
            }
            this.setState({ submitted: false });
        }
    }

    onSubmit(model) {
        const { dispatch } = this.props;

        dispatch(loginUser(model));
        this.setState({ submitted: true });
        return false;
    }

    render() {
        return (
            <AwModal.Modal
                isOpen={true}
                overlay = {{overlay: {backgroundColor: 'transparent'}}}
                noCloseBtn={true}
                shouldCloseOnOverlayClick={false}
                className="login-form">

                <Formsy.Form className="form" onValidSubmit={this.onSubmit}>
                    <AwModal.Body>
                        <div className="-logo-container">
                            <img src={Logo} className="-logo" />
                        </div>
                        <div className="-inputs">
                            <FC.Input layout="vertical" name="name" placeholder="Name" type="name"/>
                            <FC.Input layout="vertical" name="password" placeholder="Password" type="password"/>
                        </div>
                        <div className="-submit">
                            <button type="submit" className="btn btn-primary login-form-button">Login</button>
                        </div>
                    </AwModal.Body>
                </Formsy.Form>
            </AwModal.Modal>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isFetching: state.getIn(['auth', 'isFetching']),
        errorMessage: state.getIn(['auth', 'errorMessage']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Login);
