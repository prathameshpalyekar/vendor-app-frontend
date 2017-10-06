import React, { Component, PropTypes } from 'react';

import { AwFieldset } from 'components/ui';
import FC from 'components/Formsy'

export default class DetailsFieldset extends Component {

    render() {
        const { user } = this.props;

        return (
            <AwFieldset title="Account details" icon="icon-info">
                <FC.Input layout="vertical" label="Name" name="name" placeholder="Name" value={user.name} required ref="nameInput"/>
                <FC.Input layout="vertical" label="E-mail" name="email" placeholder="Email" value={user.email} type="email" disabled/>
                <FC.Input layout="vertical" label="Company Name" name="companyName" placeholder="Company Name" value={user.companyName}/>
                <AwFieldset noToggleButton={true} className="settings-form-password">
                    <FC.Input layout="vertical" label="Current password" name="password" placeholder="" type="password" />
                    <FC.Input layout="vertical" label="New password" name="newPassword" placeholder="" type="password" />
                    <FC.Input layout="vertical" label="New password (repeat)" name="confirmNewPassword" placeholder="" type="password"/>
                </AwFieldset>
            </AwFieldset>
        )
    }
}
