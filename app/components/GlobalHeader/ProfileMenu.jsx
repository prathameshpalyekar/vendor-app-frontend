import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import cx from 'classnames';

import { logoutUser } from 'modules/auth/actions/logout';

import Settings from 'modules/auth/views/Settings';

const DEFAULT_PROFILE_PIC = '/assets/' + require('assets/images/candidate_default_profile_pic.png');

class ProfileMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showSubMenu: false,
            openSettings: false,
            openHelp: false,
        };

        this.toggleSubMenu = this.toggleSubMenu.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.openHelp = this.openHelp.bind(this);
        this.closeSettings = this.closeSettings.bind(this);
        this.closeSubMenu = this.closeSubMenu.bind(this);
        this.closeHelp = this.closeHelp.bind(this);
    }
    
    componentWillUpdate(){
        if(this.state.showSubMenu){
            window.app.removeEventListener('click', this.closeSubMenu)
        }
        else{
            window.app.addEventListener('click', this.closeSubMenu)
        }
    }
    
    closeSubMenu(e){
        const area = ReactDOM.findDOMNode(this.refs.profileMenu);

        if (!area.contains(e.target)) {
            this.setState({
                showSubMenu: false
            });
            return false;
        }
    }
    
    toggleSubMenu(e) {
        e.preventDefault();
        this.setState({
            showSubMenu: this.state ? !this.state.showSubMenu : true
        });
        return false;
    }

    openSettings(e) {
        e.preventDefault();
        this.toggleSubMenu(e);
        this.setState({
            openSettings: true
        });
        return false;
    }

    openHelp(e) {
        e.preventDefault();
        this.toggleSubMenu(e);
        this.setState({
            openHelp: true
        });
        return false;
    }

    closeSettings() {
        this.setState({
            openSettings: false
        });
    }

    closeHelp() {
        this.setState({
            openHelp: false
        });
    }

    render() {
        const { user } = this.props;

        let subMenuClassNames = cx('nav nav-pills nav-stacked -sub-menu', {
            hide: !this.state.showSubMenu
        });

        return (
            <li ref="profileMenu">
                <a href="#" className="-profile" onClick={this.toggleSubMenu}>
                    <img src={user.get('profilePicture') || DEFAULT_PROFILE_PIC} className="-profile-pic" />
                    <span className="-profile-name">{user.get('name')}</span>
                    <div className="-profile-menu-icon">
                        <span className="-text"/>
                    </div>
                </a>
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.getIn(['auth', 'user'])
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileMenu);
