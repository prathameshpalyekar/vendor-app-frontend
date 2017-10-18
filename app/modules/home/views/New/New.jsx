import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import InsertItem from './InsertItem';
import BillSection from './BillSection';
import './New.less'

class New extends Component {
    constructor (props) {
        super(props);
        this.state = {
            billNo: 101,
            newItem: {},
            itemAdded: true
        };
        this.insertItem = this.insertItem.bind(this);
        this.itemInserted = this.itemInserted.bind(this);
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
    
    render() {
        const { billNo, newItem, itemAdded } = this.state;

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
                    <BillSection item={newItem} isNew={itemAdded} itemInserted={this.itemInserted}/>
                </div>
                <InsertItem addItemToList={this.insertItem}/>
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
