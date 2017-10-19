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
            item: {},
            showCategory: false,
            showCategoryFoods: false,
            selectedCategory: null
        };
        this.onChange = this.onChange.bind(this);
        this.showCategory = this.showCategory.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    onChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    selectItem(item) {
        this.props.addItemToList(item);
    }

    showCategory() {
        this.setState({
            showCategory: !this.state.showCategory,
            showCategoryFoods: false,
            selectedCategory: null
        });
    }

    goBack() {
        this.setState({
            showCategory: true,
            showCategoryFoods: false,
            selectedCategory: null
        });
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

    selectCategory(category) {
        this.setState({
            showCategoryFoods: true,
            selectedCategory: category,
        })
    }
    
    render() {
        const { code, name, item, quantity, showCategory, showCategoryFoods, selectedCategory } = this.state;
        const categories = this.getCategories();
        const foodList = this.getFoodList();
        const self = this;
        let foodListByName = [];
        let foodListByCode = [];
        let foodListByCategory = [];

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

        if (selectedCategory) {
            foodListByCategory = foodList.filter((food) => {
                return food.categoryId === selectedCategory.id;
            });
        }

        return (
            <div className="insert-item">
                <div className="-seatch-item">
                    <Formsy.Form className="-search-input">
                        <div className="-title">
                            <span className="-label">Search criterias</span>
                            <div className="-category">
                                <button type="button" className="btn btn-primary" onClick={this.showCategory}>{showCategory ? 'Hide Categories': 'Show Categories'}</button>
                            </div>
                        </div>
                        <div className="-code">
                            <FC.Input layout="vertical" name="code" placeholder="Code" type="name" onChange={this.onChange} value={code}/>
                        </div>
                        <div className="-name">
                            <FC.Input layout="vertical" name="name" placeholder="Name" type="name" onChange={this.onChange} value={name}/>
                        </div>
                    </Formsy.Form>
                    {showCategory ? 
                        <div className="-search-result">
                            {selectedCategory ?  
                                <div className="-selected-category">
                                    <span className="-header">{selectedCategory.type}</span>
                                    <button type="button" className="btn btn-hide" onClick={this.goBack}>Back</button>
                                </div>
                                : null
                            }
                            {showCategoryFoods ? 
                                <div className="-result-name">
                                    {foodListByCategory.map((item) => {
                                        return (
                                            <div className="-item" onClick={this.selectItem.bind(this, item)}>
                                                <span className="-code">{item.code}</span>
                                                <span className="-name">{item.name}</span>
                                                <span className="-price">{item.price}</span>
                                            </div>
                                        )
                                    })}
                                    {foodListByCategory.length === 0 ?
                                        <div className="-no-items">Currently no food items are present in this category.</div>
                                        : null
                                    }
                                </div>
                                : <div>
                                    {categories.map((category) => {
                                        return (
                                            <div className="-result-category" onClick={this.selectCategory.bind(this, category)}>
                                                {category.type}
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                        : <div className="-search-result">
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
                    }
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
