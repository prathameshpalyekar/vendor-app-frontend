import Immutable from 'immutable';
// import { GET_FOOD_MENU_REQUEST, GET_FOOD_MENU_SUCCESS, GET_FOOD_MENU_FAILURE } from '../actions/foods.js';

const foodMenu = (state = Immutable.fromJS({
    bill: {},
    saving: {},
    saveError: {},
    fetching: {},
    fetchError: {},

}), action) => {
    switch (action.type) {
        // case GET_FOOD_MENU_REQUEST:
        //     return state;
        // case GET_FOOD_MENU_SUCCESS:
        //     return state.merge({
        //         foods: action.foods,
        //     });
        // case GET_FOOD_MENU_FAILURE:
        //     return state;

        default:
            return state
    }
}

module.exports = bill;
