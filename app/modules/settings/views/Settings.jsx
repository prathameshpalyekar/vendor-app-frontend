import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Config from '../../../config';
import { AwFieldset } from 'components/ui';
import { getUsers } from 'modules/settings/actions/users';
import ShowUserDetails from './ShowUserDetails/ShowUserDetails';
import '../Settings.less'

class Settings extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showPreview: false,
            selectedUser: {}
        };
        this.addUser = this.addUser.bind(this);
        this.closePreview = this.closePreview.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getUsers());
    }

    addUser() {
        const { router } = this.context;
        router.push('/settings/add-user');
    }

    getUsersList(users) {
        return users.toArray().map((user) => {
            return user.toObject();
        });

    }

    showDetails(user) {
        this.setState({
            selectedUser: user,
            showPreview: true
        })
    }

    closePreview() {
        this.setState({
            selectedUser: {},
            showPreview: false
        })
    }
    
    render() {
        const { users } = this.props;
        const { showPreview, selectedUser } = this.state;
        const userList = this.getUsersList(users);

        return (
            <div className="settings">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <div className="-container">
                            <div className="-title">
                                Settings
                            </div>
                            <AwFieldset title="Users">
                                <span className="-note">Click on user for more details.</span>
                                <div className="-users">
                                    {userList.map((user, index) => {
                                        const { name, admin, id } = user;
                                        return (
                                            <div className="-user-tile" onClick={this.showDetails.bind(this, user)} key={index}>
                                                <span>{name}</span>
                                                <span className="-status">{admin ? 'Admin' : ''}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </AwFieldset>
                            <div className="-add-user">
                                <button type="button" className="btn btn-primary" onClick={this.addUser}>Add User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ShowUserDetails isOpen={showPreview} user={selectedUser} closePreview={this.closePreview}/>
            </div>
        );
    }
}

Settings.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        users: state.getIn(['settings', 'users']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Settings);
