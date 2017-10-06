import React, { Component } from 'react';

import { AwFieldset } from 'components/ui';
import FC from 'components/Formsy';

const NOTIFICATION_OPTIONS = [{ 
    label: 'Yes', 
    value: true 
},{ 
    label: 'No', 
    value: false 
}]

export default class NotificationFieldset extends Component {

    render() {
        const { user } = this.props;
        return (
            <AwFieldset title="Email Notifications" icon="icon-info">
                <p className="-meta-description">Click no to stop receiving all e-mail notifications from Happo</p>
                <FC.ButtonGroup layout="vertical" label="" name="sendEmailNotification" options={NOTIFICATION_OPTIONS} value={user.sendEmailNotification} />
            </AwFieldset>
        )
    }
}
