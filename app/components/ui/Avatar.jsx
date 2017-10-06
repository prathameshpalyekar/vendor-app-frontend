import React, { Component, PropTypes } from 'react'
const DEFAULT_PROFILE_PIC = '/assets/' + require('assets/images/candidate_default_profile_pic.png');
import './Avatar.less';
const avatarColors = [
    '#f8f7f5', '#f3f5f6', '#f8f6f2', '#f6f7f8', '#faf8ee', '#f5f6f7', '#f7f9f3', '#f7f4f2', '#f6f8f4', '#f4f5f2'
]

class Avatar extends Component {
    getInitials(username) {
        if (username) {
           const names = username.split(' ');
           const firstInitial = names[0] ? names[0][0] : '';
           const secondInitial = names[1] ? names[1][0] : '';
           return (firstInitial + secondInitial).toUpperCase();
        } 
        return '';
    }

    render () {
        const { name, profilePicture } = this.props;
        const picStyle = {}
        if (profilePicture) {
            picStyle.backgroundImage = 'url("' + profilePicture + '")';
        } else {
            picStyle.backgroundColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
        }
        return (
            <div className="-avatar-pic" style={picStyle}>
                <span className="-initials">{profilePicture ? null : this.getInitials(name)}</span>
            </div>
        )
    }
}

export default Avatar;
