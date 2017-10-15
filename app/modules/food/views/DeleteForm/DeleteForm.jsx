import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AwModal } from 'components/ui';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import { deleteCategory } from 'modules/food/actions/deleteCategory';
import Alert from 'react-s-alert';
import './DeleteForm.less';

class DeleteForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            submitted: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.closePreview = this.closePreview.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.deleting) {
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                Alert.success('Category deleted successfully.');
                this.props.closePreview(true);
            }
            this.setState({ submitted: false });
        }
    }

    closePreview() {
        this.props.closePreview();
    }

    onSubmit() {
        const { dispatch, category } = this.props;
        dispatch(deleteCategory(category.id));
        this.setState({
            submitted: true
        });
        return false;
    }
    
    render() {
        const { submitted } = this.state;
        return (
            <AwModal.Modal
                isOpen={this.props.isOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={this.closePreview}
                contentLabel=""
                className="user-form">
                <Formsy.Form className="form">
                    <AwModal.Body>
                        <div className="-title">
                            Delete Category
                        </div>
                        <div className="-note">
                            Are you sure want to delete <b>{this.props.category.type}</b> ?
                            <div className="-details">All Food items in this category will be deleted.</div>
                        </div>
                        <div className="-submit">
                            <button type="button" className="btn btn-danger" onClick={this.closePreview}>Cancel</button>
                            <button type="button" disabled={submitted} className="btn btn-primary" onClick={this.onSubmit}>Continue</button>
                        </div>
                    </AwModal.Body>
                </Formsy.Form>
            </AwModal.Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        deleting: state.getIn(['foodMenu', 'deleting']),
        errorMessage: state.getIn(['foodMenu', 'deleteError']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(DeleteForm);
