import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import './InsertItem.less'

class InsertItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            item: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    selectItem(item) {
        this.props.addItemToList(item);
    }

    getCategories() {
        const { categories } = this.props;
        return categories.toArray().map((category) => {
            return category.toObject();
        }).sort((a, b) => {
            const aMoment = moment(a.createdAt);
            const bMoment = moment(b.createdAt);
            if (aMoment.isAfter(bMoment)) {
                return 1;
            } else if (bMoment.isAfter(aMoment)) {
                return -1;
            }
            return 0;
        });
    }

    getFoodList() {
        return this.props.foodMenu.toArray().map((item) => {
            return item.toObject();
        }).sort((a, b) => {
            const aMoment = moment(a.createdAt);
            const bMoment = moment(b.createdAt);
            if (aMoment.isAfter(bMoment)) {
                return 1;
            } else if (bMoment.isAfter(aMoment)) {
                return -1;
            }
            return 0;
        });
    }
    
    render() {
        const { code, name, item, quantity } = this.state;
        const categories = this.getCategories();
        const foodList = this.getFoodList();
        const self = this;
        let foodListByName = [];
        let foodListByCode = [];

        if (name.length > 2) {
            foodListByName = foodList.filter((food) => {
                return food.name.toLowerCase().includes(name.toLowerCase());
            });
        }

        if (code.length > 1) {
            foodListByCode = foodList.filter((food) => {
                return food.code.toLowerCase().includes(code.toLowerCase());
            });
        }

        return (
            <div className="insert-item">
                <div className="-seatch-item">
                    <Formsy.Form className="-search-input">
                        <div className="-title">Search criterias</div>
                        <div className="-code">
                            <FC.Input layout="vertical" name="code" placeholder="Code" type="name" onChange={this.onChange} value={code}/>
                        </div>
                        <div className="-name">
                            <FC.Input layout="vertical" name="name" placeholder="Name" type="name" onChange={this.onChange} value={name}/>
                        </div>
                        <div className="-category">
                            <button type="button" className="btn btn-primary">Category</button>
                        </div>
                    </Formsy.Form>
                    <div className="-search-result">
                        <div className="-result-name">
                            <div className="-title">Results for search by <b>Name</b> : </div>
                            {foodListByName.map((item) => {
                                return (
                                    <div className="-item" onClick={this.selectItem.bind(this, item)}>
                                        <span className="-code">{item.code}</span>
                                        <span className="-name">{item.name}</span>
                                        <span className="-price">{item.price}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="-result-name">
                            <div className="-title">Results for search by <b>Code</b> : </div>
                            {foodListByCode.map((item) => {
                                return (
                                    <div className="-item" onClick={this.selectItem.bind(this, item)}>
                                        <span className="-code">{item.code}</span>
                                        <span className="-name">{item.name}</span>
                                        <span className="-price">{item.price}</span>
                                    </div>
                                )
                            })}
                        </div> 
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

export default connect(mapStateToProps, mapDispatchtoProps)(InsertItem);
