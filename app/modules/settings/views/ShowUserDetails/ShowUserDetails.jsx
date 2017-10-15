import React, { Component, PropTypes } from 'react';
import { AwModal, AwFieldset } from 'components/ui';
import './ShowUserDetails.less';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import Config from '../../../config';
// import { AwFieldset } from 'components/ui';
// import { getUsers } from 'modules/settings/actions/users';
// import ShowUserDetails from './ShowUserDetails/ShowUserDetails';
// import '../Settings.less'

class ShowUserDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    editUser() {
        const { user } = this.props;
        const { router } = this.context;
        this.props.closePreview();
        router.push('/settings/edit-user/' + user.id);
    }

    deleteUser() {

    }
    
    render() {
        const { user, isOpen } = this.props;

        return (
            <AwModal.Modal
                isOpen={isOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={this.props.closePreview}
                contentLabel=""
                className="user-details">
                <AwModal.Body>
                    <div className="-title">
                        User Details
                    </div>
                    <div className="-data">
                        <div className="-name-section">
                            <span>Name : </span>
                            <span>{user.name}</span>
                        </div>
                        <div className="-user-status">
                            <span>User Status : </span>
                            <span>{user.admin ? 'Admin' : 'Regular User'}</span>
                        </div>
                    </div>
                    <div className="-submit">
                        <button type="button" className="btn btn-danger" onClick={this.deleteUser}>Delete User</button>
                        <button type="button" className="btn btn-primary -edit" onClick={this.editUser}>Edit User</button>
                    </div>
                </AwModal.Body>
            </AwModal.Modal>
        );
    }
}

ShowUserDetails.contextTypes = {
    router: React.PropTypes.object
};

export default ShowUserDetails;



// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
//         users: state.getIn(['settings', 'users']),
//     };
// };

// const mapDispatchtoProps = (dispatch) => {
//     return {
//         dispatch
//     };
// };

// export default connect(mapStateToProps, mapDispatchtoProps)(Settings);
