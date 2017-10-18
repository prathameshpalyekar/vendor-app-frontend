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
            list: []
        };
        this.addItemToList = this.addItemToList.bind(this);
    }

    addItemToList(item) {
        const list = this.state.list.slice();
        list.push(item);
        this.setState({
            list
        });
    }
    
    render() {
        const { billNo, list } = this.state;

        return (
            <div className="new">
                <div className="-top">
                    <div className="-bill-number">
                        Bill 
                        <span className="-number"> #{billNo}</span>
                    </div>
                    <div className="-bill-date">
                        <span>{moment().format('DD-MM-YYYY')}</span>
                    </div>
                </div>
                <BillSection list={list}/>
                <InsertItem addItemToList={this.addItemToList}/>
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
