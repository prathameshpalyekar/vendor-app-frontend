import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { Canvas } from '../ui';
import Logo from './Logo';
import ProfileMenu from './ProfileMenu';
import './GlobalHeader.less';

class GlobalHeader extends Component {

    render() {
        const { menuColor, isAuthenticated } = this.props;

        let style = {};


        if (menuColor) {
            style.backgroundColor = menuColor;
        }

        return (
            <header className="navbar navbar-default global-header" style={style}>
                <Canvas>
                    <ul className="nav nav-pills global-header-bars -position">
                        <li>
                            <Link to="/home" className="icon-briefcase -position-bar">Home</Link>
                        </li>
                        <li>
                            <Link to="/food-menu" className="icon-job-description -position-bar">Food</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="icon-archive -position-bar">Settings</Link>
                        </li>
                    </ul>
                    <div className="pull-right">
                        {isAuthenticated? this.renderProfileSection() : null}
                    </div>
                </Canvas>
            </header>
        );
    }

    renderProfileSection() {
        return (
            <ul className="nav nav-pills global-header-bars">
                <ProfileMenu/>
            </ul> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuColor: state.getIn(['auth', 'user', 'menuColor']),
        isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
    };
};

export default connect(mapStateToProps)(GlobalHeader);
