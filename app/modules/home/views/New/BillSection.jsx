import React, { Component, PropTypes } from 'react';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import { connect } from 'react-redux';
import './BillSection.less'

class BillSection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: []
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { item, isNew } = nextProps;

        if (!isNew && item.name) {
            const list = this.getUpdatedList(item);
            this.setState({
                list
            });
            this.props.itemInserted();
        }
    }

    getUpdatedList(newItem) {
        const { list } = this.state;
        const existingItemIndex = list.findIndex((item) => item.name === newItem.name);

        if (existingItemIndex !== -1) {
            list[existingItemIndex].quantity = parseInt(list[existingItemIndex].quantity);
            list[existingItemIndex].quantity += 1;
            return list;
        } else {
            list.push(Object.assign({}, newItem, {quantity: 1}))
            return list;
        }
    }

    removeItem(item) {
        const { list } = this.state;
        const existingItemIndex = list.findIndex((itemNode) => itemNode.name === item.name);
        if (existingItemIndex !== -1) {
            list.splice(existingItemIndex, 1);
            this.setState({
                list
            });
        }
    }

    onChange(name, value) {
        const { list } = this.state;
        const existingItemIndex = list.findIndex((itemNode) => itemNode.name === name);
        if (existingItemIndex !== -1) {
            list[existingItemIndex].quantity = value;
            this.setState({
                list
            });
        }
    }
    
    render() {
        const { list } = this.state;
        let totalPrice = 0;
        list.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });

        return (
            <div className="bill-section">
                <div className="-container">
                    <div className="-header">
                        <div className="-index">#</div>
                        <div className="-code">Code</div>
                        <div className="-name">Name</div>
                        <div className="-quantity">Qty</div>
                        <div className="-price">Price</div>
                        <div className="-action"></div>
                    </div>
                    <div className="-body-content">
                        {list.map((item, index) => {
                            return (
                                <div>
                                    <div className="-index">{index + 1}</div>
                                    <div className="-code">{item.code}</div>
                                    <div className="-name">{item.name}</div>
                                    <div className="-quantity">
                                        <Formsy.Form className="-input">
                                            <FC.Input layout="vertical" name={item.name} placeholder="Qty" type="number" onChange={this.onChange} value={item.quantity}/>
                                        </Formsy.Form>
                                    </div>
                                    <div className="-price">{item.price * item.quantity}</div>
                                    <div className="-action">
                                        <div className="-remove" onClick={this.removeItem.bind(this, item)}>
                                            <span>x</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {list.length > 0 ?
                            <div className="-total">
                                <div className="-label">Total</div>
                                <div className="-total-price">{totalPrice}</div>
                            </div> : null
                        }
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchtoProps)(BillSection);
