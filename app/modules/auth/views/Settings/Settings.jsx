import React, { Component } from 'react';
import { connect } from 'react-redux'
import Alert from 'react-s-alert'

import { AwModal, AwFieldset } from 'components/ui'

import PremiumAccount from './PremiumAccount'
import DetailsFieldset from './DetailsFieldset'
import CustomizationFieldset from './CustomizationFieldset'
import NotificationFieldset from './NotificationFieldset'

import { saveSettings } from '../../actions/settings.js'

import './Settings.less'
class ProfileMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: true,
            submitted: false,
        };

        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isFetching) {
            const { router } = this.context;
            // Error condition should be before
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                Alert.success('Settings updated successfully.');
            }
            this.setState({ submitted: false });
            this.props.onRequestClose();
        }
    }

    onSubmit(model, resetForm, invalidateForm) {
        const { dispatch, auth } = this.props;

        let user = Object.assign({}, model);

        if (user.password) {
            let inputWithErrors = {};

            if (!user.newPassword) {
                inputWithErrors.newPassword = 'This field is required.';
            }
            if (!user.confirmNewPassword) {
                inputWithErrors.confirmNewPassword = 'This field is required.';
            }
            if (user.newPassword !== user.confirmNewPassword) {
                inputWithErrors.confirmNewPassword = 'New password and confirm password are different.';
            }

            if (Object.keys(inputWithErrors).length > 0) {
                invalidateForm(inputWithErrors);
                return false;
            }
            
        } else {
            let inputWithErrors = {};

            if (user.newPassword && user.confirmNewPassword) {
                inputWithErrors.password = 'This field is required.';
            } else if (user.newPassword && !user.confirmNewPassword) {
                inputWithErrors.password = 'This field is required.';
                inputWithErrors.confirmNewPassword = 'This field is required.';
            } else if (!user.newPassword && user.confirmNewPassword) {
                inputWithErrors.password = 'This field is required.';
                inputWithErrors.newPassword = 'This field is required.';
            } else {
                delete user.password;
                delete user.newPassword;
                delete user.confirmNewPassword;
            }

            if (Object.keys(inputWithErrors).length > 0) {
                invalidateForm(inputWithErrors);
                return false;
            }
        }

        // if (user.profilePicture === undefined) {
        //     user.profilePicture = null;
        // }
        delete user.email;
        dispatch(saveSettings(user));
        this.setState({ submitted: true });
        return false;
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    render() {
        const user = this.props.user.toObject();

        return (
            <AwModal.Modal
                headerTitle="Settings"
                shouldCloseOnOverlayClick={true}
                {...this.props}>

                <Formsy.Form className="form-horizontal settings-form" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    <AwModal.Body>
                        {/* <PremiumAccount /> */}
                        <DetailsFieldset user={user}/>
                        <CustomizationFieldset user={user}/>
                        <NotificationFieldset user={user}/>
                    </AwModal.Body>

                    <AwModal.Footer>
                        <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit || this.state.submitted}>{this.state.submitted ? 'Saving...' : 'Save settings'}</button>
                    </AwModal.Footer>
                </Formsy.Form>
            </AwModal.Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.getIn(['auth', 'user']),
        isFetching: state.getIn(['auth', 'isFetching']),
        errorMessage: state.getIn(['auth', 'errorMessage']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileMenu);
