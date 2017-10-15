import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './FoodItems.less';

class FoodItems extends Component {
    constructor(props) {
        super(props);
        this.editCategory = this.editCategory.bind(this);
    }

    editCategory() {
        this.props.editCategory(true);
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

    deleteItem(item) {
        this.props.deleteItem(item);
    }

    addItem(item) {
        this.props.addItem(item);
    }
    
    render() {
        const { category } = this.props;
        const foodList = this.getFoodList();

        return (
            <div className="food-items">
                {category.type ? 
                    <div className="-container">
                        <div className="-title">
                            <span>{category.type}</span>
                            <button className="btn icon-edit" onClick={this.editCategory}></button>
                            <button type="button" className="icon-trash btn-danger" onClick={this.props.deleteCategory}></button>
                        </div>
                        <div className="-list">
                            {foodList.filter((item) => item.categoryId === category.id).map((item) => {
                                console.log(item)
                                return (
                                    <div className="-food-item">
                                        <span className="-code">{item.code}</span>
                                        <span className="-name">{item.name}{item.addOn ? ' (Add On)' : null}</span>
                                        <span className="-price">{item.price}</span>
                                        <button type="button" className="icon-trash btn-danger" onClick={this.deleteItem.bind(this, item)}></button>
                                        <button type="button" className="icon-edit btn-edit btn" onClick={this.addItem.bind(this, item)}></button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="-new-item">
                            <button type="button" className="btn btn-primary" onClick={this.addItem.bind(this)}>Add New Item</button>
                        </div>
                    </div> : null
                }
            </div> 
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        foodMenu: state.getIn(['foodMenu', 'foods']),
        categories: state.getIn(['foodMenu', 'categories']),
    };
};

export default connect(mapStateToProps)(FoodItems);
