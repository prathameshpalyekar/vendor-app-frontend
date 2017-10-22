import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AwModal } from 'components/ui';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import { createBill } from 'modules/home/actions/createBill';
import Alert from 'react-s-alert';
import './BillPreview.less';

class BillPreview extends Component {
    constructor (props) {
        super(props);
        this.state = {
            submitted: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.closePreview = this.closePreview.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     const { router } = this.context;
    //     if (this.state.submitted && !nextProps.isSaving) {
    //         const { router } = this.context;
    //         if (nextProps.errorMessage){
    //             Alert.error(nextProps.errorMessage);
    //         } else {
    //             Alert.success('User added successfully.');
    //             router.push('/settings');
    //         }
    //         this.setState({ submitted: false });
    //     }
    // }

    closePreview() {
        this.props.closePreview();
    }

    onSubmit() {
        const { dispatch, bill } = this.props;
        console.log(bill)
        const { router } = this.context;
        // window.open('www.google.com', '_blank');
        // const { name, password, confirmPassword, admin } = this.state;
        // const userData = {
        //     name,
        //     password,
        //     admin
        // };
        dispatch(createBill(bill));
        // this.setState({
        //     submitted: true
        // });
        // return false;
    }
    
    render() {
        const { show, bill } = this.props;
        const { submitted } = this.state;
        if (!bill.customer || !bill.order) {
            return null;
        }

        let totalPrice = 0;
        bill.order.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });

        return (
            <AwModal.Modal
                isOpen={show}
                shouldCloseOnOverlayClick={false}
                onRequestClose={this.closePreview}
                contentLabel=""
                className="bill-preview">
                <Formsy.Form className="form">
                    <AwModal.Body>
                        <div className="-container">
                            <div className="-title">
                                ** Chakal FC **
                            </div>
                            <div className="-top">
                                <div className="-number">
                                    #{bill.info.number}
                                </div>
                                <div className="-date">
                                    {bill.info.date}
                                </div>
                            </div>
                            <div className="-customer">
                                <div className="-name">
                                    {bill.customer.name}
                                </div>
                                <div className="-address">
                                    {bill.customer.address}
                                </div>
                                <div className="-phone">
                                    {bill.customer.phone}
                                </div>
                            </div>
                            <div className="-order">
                                <div className="-order-head">
                                    <div className="-number">#</div>
                                    <div className="-name">Name</div>
                                    <div className="-quantity">Qty</div>
                                    <div className="-price">Price</div>
                                </div>
                                <div className="-order-body-container">
                                    {bill.order.map((item, index) => {
                                        return (
                                            <div className="-order-body">
                                                <div className="-number">{index + 1}</div>
                                                <div className="-name">{item.name}</div>
                                                <div className="-quantity">{item.quantity}</div>
                                                <div className="-price">{item.quantity * item.price}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="-order-total">
                                    <div className="-label">Total</div>
                                    <div className="-price">{totalPrice}</div>
                                </div>
                            </div>
                        </div>
                        <div className="-submit">
                            <button type="button" className="btn btn-danger" onClick={this.closePreview}>Cancel</button>
                            <button type="button" className="btn btn-primary" disabled={submitted} onClick={this.onSubmit}>Save</button>
                        </div>
                    </AwModal.Body>
                </Formsy.Form>
            </AwModal.Modal>
        );
    }
}

BillPreview.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        // isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        // isSaving: state.getIn(['settings', 'saving']),
        // errorMessage: state.getIn(['settings', 'saveError']),
        // users: state.getIn(['settings', 'users']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(BillPreview);
