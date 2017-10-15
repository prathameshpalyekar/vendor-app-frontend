import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AwModal } from 'components/ui';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import { addUser } from 'modules/settings/actions/addUser';
import Alert from 'react-s-alert';
import './UserForm.less';

class UserForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            confirmPassword: '',
            admin: false,
            submitted: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { router } = this.context;
        if (this.state.submitted && !nextProps.isSaving) {
            const { router } = this.context;
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                Alert.success('User added successfully.');
                router.push('/settings');
            }
            this.setState({ submitted: false });
        }
    }

    componentDidMount() {
        const { userId } = this.props;
        if (this.props.userId) {
            const { users } = this.props;
            const userList = this.getUsersList(users);
            const user = userList.find((userNode) => userNode.id === userId);
            this.setState({
                name: user.name,
                password: user.password,
                confirmPassword: user.password,
                admin: user.admin
            })
        }
    }

    getUsersList(users) {
        return users.toArray().map((user) => {
            return user.toObject();
        });
    }

    closePreview() {

    }

    onSubmit() {
        const { dispatch, userId } = this.props;
        const { name, password, confirmPassword, admin } = this.state;
        const userData = {
            name,
            password,
            admin
        };
        dispatch(addUser(userData, userId));
        this.setState({
            submitted: true
        });
        return false;
    }

    onChange(name, value) {
        this.setState({
            [name]: value
        });
    }
    
    render() {
        const closeUrl = '/settings';
        const title = 'Add User';
        const { name, password, confirmPassword, admin, disabled } = this.state;

        return (
            <AwModal.Modal
                isOpen={true}
                shouldCloseOnOverlayClick={false}
                onRequestClose={this.closePreview}
                contentLabel=""
                className="user-form"
                closeUrl={closeUrl}>
                <Formsy.Form className="form">
                    <AwModal.Body>
                        <div className="-title">
                            {title}
                        </div>
                        <div>
                            <FC.Input layout="vertical" label="Name" name="name" placeholder="Name" type="name" value={name} onChange={this.onChange}/>
                            <FC.Input layout="vertical" label="Password" name="password" placeholder="Password" type="password" value={password} onChange={this.onChange}/>
                            <FC.Input layout="vertical" label="Confirm Password" name="confirmPassword" placeholder="Password" type="password" value={confirmPassword} onChange={this.onChange}/>
                            <FC.Checkbox label="Add as a Admin" name="admin" layout="elementOnly" value={admin} onChange={this.onChange}/>
                        </div>
                        <div className="-submit">
                            <button type="submit" disabled={disabled} className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                        </div>
                    </AwModal.Body>
                </Formsy.Form>
            </AwModal.Modal>
        );
    }
}

UserForm.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isSaving: state.getIn(['settings', 'saving']),
        errorMessage: state.getIn(['settings', 'saveError']),
        users: state.getIn(['settings', 'users']),
        userId: ownProps.params.id,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(UserForm);
