import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AwModal } from 'components/ui';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import { addItem } from 'modules/food/actions/addItem';
import Alert from 'react-s-alert';
import './ItemForm.less';

class ItemForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            price: '',
            addOn: false,
            submitted: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closePreview = this.closePreview.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isSaving) {
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                Alert.success('Item added successfully.');
                this.setState({
                    name: '',
                    code: '',
                    price: '',
                    addOn: false,
                    submitted: false 
                });
                this.props.closePreview();
            }
            this.setState({ submitted: false });
        }

        if (nextProps.item) {
            const { name, code, price, addOn } = nextProps.item;
            this.setState({
                name,
                code,
                price,
                addOn
            });
        }
    }

    closePreview() {
        this.props.closePreview();
    }

    onSubmit() {
        const { dispatch, item } = this.props;
        const { name, code, price, addOn } = this.state;
        const categoryId = this.props.category.id;

        const itemData = {
            name,
            code,
            price,
            categoryId,
            addOn
        };

        dispatch(addItem(itemData, item.id));
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
        const { item } = this.props;
        const title = item && item.id ? 'Edit Food Item' : 'Add Food Item';
        const { name, code, price, addOn, submitted } = this.state;

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
                            {title}
                        </div>
                        <div>
                            <FC.Input layout="vertical" label="Name" name="name" placeholder="Name" type="name" value={name} onChange={this.onChange}/>
                            <FC.Input layout="vertical" label="Code" name="code" placeholder="Code" type="name" value={code} onChange={this.onChange}/>
                            <FC.Input layout="vertical" label="Price" name="price" placeholder="Price" type="number" value={price} onChange={this.onChange}/>
                            <FC.Checkbox label="Add On" name="addOn" layout="elementOnly" value={addOn} onChange={this.onChange}/>
                        </div>
                        <div className="-submit">
                            <button type="submit" disabled={submitted} className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                        </div>
                    </AwModal.Body>
                </Formsy.Form>
            </AwModal.Modal>
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

export default connect(mapStateToProps, mapDispatchtoProps)(ItemForm);
