import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AwFieldset } from 'components/ui';
import { getFoodMenu } from 'modules/food/actions/foods.js';
import { deleteItem } from 'modules/food/actions/deleteItem.js';
import { getCategories } from 'modules/food/actions/foodCategories.js';
import ItemForm from './ItemForm/ItemForm';
import DeleteForm from './DeleteForm/DeleteForm';
import Categories from './Categories/Categories';
import CategoryForm from './Categories/CategoryForm';
import FoodItems from './FoodItems/FoodItems';
import '../Food.less'

class FoodMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            categoryForm: false,
            itemForm: false,
            category: {},
            showDeleteForm: false,
        };
        this.addItem = this.addItem.bind(this);
        this.closeItemForm = this.closeItemForm.bind(this);
        this.closeDeleteForm = this.closeDeleteForm.bind(this);
        this.openFoodMenu = this.openFoodMenu.bind(this);
        this.toggleCategoryForm = this.toggleCategoryForm.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getFoodMenu());
        dispatch(getCategories());
    }

    openFoodMenu(category) {
        this.setState({
            categoryForm: false,
            category,
        });
    }

    toggleCategoryForm(value) {
        this.setState({
            categoryForm: value,
            category: value ? this.state.category : {},
        });
    }

    addItem(item) {
        this.setState({
            itemForm: true,
            item: item ? item : null
        });
    }

    deleteItem(item) {
        const { dispatch } = this.props;
        dispatch(deleteItem(item.id));
    }

    closeItemForm() {
        this.setState({
            itemForm: false
        });
    }

    closeDeleteForm(value) {
        this.setState({
            showDeleteForm: false,
            category: value ? {} : this.state.category,
        });
    }

    addCategory() {
        this.setState({
            categoryForm: true,
            category: {},
        });
    }

    deleteCategory() {
        this.setState({
            showDeleteForm: true
        });
    }
    
    render() {
        const { categories } = this.props;
        const { categoryForm, itemForm, item, category, showDeleteForm } = this.state;
        if (!this.props.foodMenu) {
            return null;
        }

        return (
            <div className="food-menu">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="-menu">
                            <Categories openCategory={this.openFoodMenu} addCategory={this.addCategory}/>
                            <div className="-binding"></div>
                            <div className="-details">
                                {categoryForm ?
                                    <CategoryForm category={category} closeCategory={this.toggleCategoryForm}/>
                                    : <FoodItems category={category} editCategory={this.toggleCategoryForm} deleteCategory={this.deleteCategory} addItem={this.addItem} deleteItem={this.deleteItem}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <ItemForm isOpen={itemForm} closePreview={this.closeItemForm} category={category} item={item}/>
                <DeleteForm isOpen={showDeleteForm} closePreview={this.closeDeleteForm} category={category}/>
            </div>
        );
    }
}

FoodMenu.contextTypes = {
    router: React.PropTypes.object
};

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

export default connect(mapStateToProps, mapDispatchtoProps)(FoodMenu);