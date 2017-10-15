import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Categories.less';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.addCategory = this.addCategory.bind(this);
    }

    openCategory(category) {
        this.props.openCategory(category);
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

    addCategory() {
        this.props.addCategory(true);
    }
    
    render() {
        const categories = this.getCategories();
        return (
            <div className="categories">
                <div className="-container">
                    {categories.map((category, index) => {
                        return (
                            <div className="-category-container" key={index} onClick={this.openCategory.bind(this, category)}>
                                {category.type}
                            </div>
                        )
                    })}
                    <div className="-category-container -add-new" onClick={this.addCategory}>
                        <span className="-add">+ </span>
                        Add New
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.getIn(['foodMenu', 'categories']),
    };
};

export default connect(mapStateToProps)(Categories);
