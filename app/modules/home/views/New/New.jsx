import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import InsertItem from './InsertItem';
import BillSection from './BillSection';
import CustomerSection from './CustomerSection';
import BillPreview from './BillPreview';
import './New.less'

class New extends Component {
    constructor (props) {
        super(props);
        this.state = {
            billNo: 101,
            newItem: {},
            itemAdded: true,
            customer: {},
            showPreview: false,
            order: [],
            bill: {},
        };
        this.insertItem = this.insertItem.bind(this);
        this.itemInserted = this.itemInserted.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.closePreview = this.closePreview.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
    }

    insertItem(item) {
        this.setState({
            newItem: item,
            itemAdded: false
        });
    }

    itemInserted() {
        this.setState({
            itemAdded: true,
            newItem: {}
        })
    }

    updateCustomer(data) {
        this.setState({
            customer: data
        });
    }

    closePreview() {
        this.setState({
            showPreview: false
        });
    }

    showPreview() {
        const { customer, order, billNo } = this.state;
        const info = Object.assign({}, {number: billNo}, {date: moment().format('DD-MM-YYYY')});
        const bill = Object.assign({}, {customer}, {order}, {info});
        this.setState({
            showPreview: true,
            bill
        });
    }

    updateOrder(order) {
        this.setState({
            order
        });
    }
    
    render() {
        const { billNo, newItem, itemAdded, showPreview, bill, order } = this.state;

        return (
            <div className="new">
                <div className="-bill-section">
                    <div className="-top">
                        <div className="-bill-number">
                            Bill 
                            <span className="-number"> #{billNo}</span>
                        </div>
                        <div className="-bill-date">
                            <span>{moment().format('DD-MM-YYYY')}</span>
                        </div>
                    </div>
                    <CustomerSection updateCustomer={this.updateCustomer}/>
                    <BillSection item={newItem} isNew={itemAdded} itemInserted={this.itemInserted} updateOrder={this.updateOrder}/>
                    <div className="-submit">
                        <button type="button" className="btn btn-primary" disabled={order.length === 0} onClick={this.showPreview}>Proceed</button>
                    </div>
                </div>
                <InsertItem addItemToList={this.insertItem}/>
                <BillPreview show={showPreview} closePreview={this.closePreview} bill={bill}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        foodMenu: state.getIn(['foodMenu', 'foods']),
        categories: state.getIn(['foodMenu', 'categories']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(New);
