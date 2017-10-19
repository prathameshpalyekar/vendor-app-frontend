import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import { AwFieldset } from 'components/ui';
import './CustomerSection.less'

class CustomerSection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            phone: null,
            address: '',
            customer: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(name, value) {
        const customer = Object.assign({}, this.state.customer);
        customer[name] = value;

        this.setState({
            [name]: value,
            customer
        });
        this.props.updateCustomer(customer);
    }
    
    render() {
        const { name, phone, address } = this.state;

        return (
            
            <div className="customer">
                <AwFieldset title="Customer Data">
                    <Formsy.Form className="-input">
                        <div className="-name">
                            <FC.Input layout="vertical" name="name" placeholder="Name" type="name" onChange={this.onChange} value={name}/>
                        </div>
                        <div className="-phone">
                            <FC.Input layout="vertical" name="phone" placeholder="Phone" type="number" onChange={this.onChange} value={phone}/>
                        </div>
                        <div className="-address">
                            <FC.Textarea layout="vertical" name="address" placeholder="Address" type="text" onChange={this.onChange} value={address}/>
                        </div>
                    </Formsy.Form>
                </AwFieldset>
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

export default connect(mapStateToProps, mapDispatchtoProps)(CustomerSection);
