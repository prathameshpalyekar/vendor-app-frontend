import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Config from '../../../config';
import cx from 'classnames';
import New from './New/New';
import { getFoodMenu } from 'modules/food/actions/foods.js';
import { getCategories } from 'modules/food/actions/foodCategories.js';
import '../Home.less';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeTab: 'new'
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getFoodMenu());
        dispatch(getCategories());
    }

    switchTab(value) {
        this.setState({
            activeTab: value
        })
    }
    
    render() {
        const { activeTab } = this.state;
        const newTabClass = cx('-new', {
            '-active': activeTab === 'new'
        });
        const editTabClass = cx('-edit', {
            '-active': activeTab === 'edit'
        });

        return (
            <div className="home">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="-container">
                            <div className="-tab-section">
                                <div className={newTabClass} onClick={this.switchTab.bind(this, 'new')}> NEW </div>
                                <div className={editTabClass} onClick={this.switchTab.bind(this, 'edit')}> EDIT </div>
                            </div>
                            <div className="-content">
                                {activeTab === 'new' ? <New/> : <div>Edit Section</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapDispatchtoProps)(Home);
