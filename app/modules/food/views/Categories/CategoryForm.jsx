import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import Alert from 'react-s-alert';
import { addCategory } from 'modules/food/actions/addCategory.js';
import './CategoryForm.less';

class CategoryForm extends Component {
    constructor(props) {
        super(props);
        const { id, type } = this.props.category;
        this.state = {
            name: type,
            id,
            submitted: false,
        };
        this.onChange = this.onChange.bind(this);
        this.closeCategoryForm = this.closeCategoryForm.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isSaving) {
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                const message = this.state.id ? 'Category edited successfully.' : 'Category added successfully.';
                Alert.success(message);
                this.setState({
                    name: '',
                    id: '',
                    submitted: false,
                });
                this.props.closeCategory(false);
            }
            this.setState({ submitted: false });
        }
    }

    onChange(name, value) {
        this.setState({
            name: value
        });
    }

    closeCategoryForm() {
        this.props.closeCategory(false);
    }

    addCategory() {
        const { dispatch } = this.props;
        const { name, id } = this.state;
        if (!name) {
            Alert.error('Provide proper name for category.');
            return;
        }
        const value = {
            type: name
        };
        dispatch(addCategory(value, id));
        this.setState({
            submitted: true
        });
        return false;
    }
    
    render() {
        const { name, id } = this.state;
        return (
            <div className="category-form">
                <div className="-title">
                    {id ? 'Edit' : 'Add New'} Category
                </div>
                <Formsy.Form className="-input">
                    <FC.Input layout="vertical" name="categoryName" placeholder="Name" type="name" onChange={this.onChange} value={name}/>
                </Formsy.Form>
                <div className="-form-footer">
                    <button type="button" className="btn btn-danger" onClick={this.closeCategoryForm}>Cancel</button>
                    <button type="button" className="btn btn-primary -edit" onClick={this.addCategory}>Submit</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSaving: state.getIn(['foodMenu', 'saving']),
        errorMessage: state.getIn(['foodMenu', 'saveError']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(CategoryForm);
