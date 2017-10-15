import Immutable from 'immutable';
import { GET_FOOD_MENU_REQUEST, GET_FOOD_MENU_SUCCESS, GET_FOOD_MENU_FAILURE } from '../actions/foods.js';
import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE } from '../actions/foodCategories.js';
import { ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from '../actions/addCategory.js';
import { ADD_ITEM_REQUEST, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE } from '../actions/addItem.js';
import { DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE } from '../actions/deleteItem.js';
import { DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE } from '../actions/deleteCategory.js';

const foodMenu = (state = Immutable.fromJS({
    foods: {},
    categories: {},
    saving: {},
    saveError: {},
    deleting: {},
    deleteError: {},

}), action) => {
    switch (action.type) {
        case GET_FOOD_MENU_REQUEST:
            return state;
        case GET_FOOD_MENU_SUCCESS:
            return state.merge({
                foods: action.foods,
            });
        case GET_FOOD_MENU_FAILURE:
            return state;

        case GET_CATEGORY_REQUEST:
            return state;
        case GET_CATEGORY_SUCCESS:
            return state.merge({
                categories: action.categories,
            });
        case GET_CATEGORY_FAILURE:
            return state;

        case ADD_CATEGORY_REQUEST:
            return state.merge({
                saving: true,
                saveError: false,
            });
        case ADD_CATEGORY_SUCCESS:
            return state.merge({
                saving: false,
                saveError: false,
                categories: action.categories
            });
        case ADD_CATEGORY_FAILURE:
            return state.merge({
                saving: false,
                saveError: action.message,
            });

        case ADD_ITEM_REQUEST:
            return state.merge({
                saving: true,
                saveError: false,
            });
        case ADD_ITEM_SUCCESS:
            return state.merge({
                saving: false,
                saveError: false,
                foods: action.foods,
            });
        case ADD_ITEM_FAILURE:
            return state.merge({
                saving: false,
                saveError: action.message,
            });

        case DELETE_ITEM_REQUEST:
            return state.merge({
                deleting: true,
                deleteError: false,
            });
        case DELETE_ITEM_SUCCESS:
            return state.merge({
                deleting: false,
                deleteError: false,
                foods: action.foods,
            });
        case DELETE_ITEM_FAILURE:
            return state.merge({
                deleting: false,
                deleteError: action.message,
            });

        case DELETE_CATEGORY_REQUEST:
            return state.merge({
                deleting: true,
                deleteError: false,
            });
        case DELETE_CATEGORY_SUCCESS:
            return state.merge({
                deleting: false,
                deleteError: false,
                foods: action.foods,
                categories: action.categories,
            });
        case DELETE_CATEGORY_FAILURE:
            return state.merge({
                deleting: false,
                deleteError: action.message,
            });

        default:
            return state
    }
}

module.exports = foodMenu;
