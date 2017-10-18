import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './BillSection.less'

class BillSection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            itemList: this.getItemList(this.props.list)
        };
    }

    componentWillReceiveProps(nextProps) {
        const { list } = nextProps;
        const itemList = this.getItemList(list);
        this.setState({
            itemList
        })
    }

    getItemList(list) {
        return list.filter((item, index, self) => self.findIndex(i => i.name === item.name) === index);
    }
    
    render() {
        const { itemList } = this.state;
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
                        {itemList.map((item, index) => {
                            return (
                                <div>
                                    <div className="-index">{index}</div>
                                    <div className="-code">{item.code}</div>
                                    <div className="-name">{item.name}</div>
                                    <div className="-quantity">1</div>
                                    <div className="-price">{item.price}</div>
                                    <div className="-action">
                                        <div className="-remove">x</div>
                                    </div>
                                </div>
                            )
                        })}
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
