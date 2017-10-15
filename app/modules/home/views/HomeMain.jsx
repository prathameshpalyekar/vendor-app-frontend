import React, { Component, PropTypes } from 'react'
import axios from 'axios';
import Config from '../../../config';
import '../job.less'

class HomeMain extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
            pokemonId: 0
        }
    }

    componentDidMount() {
        // const url = Config.BASE_URL + 'pokemon-info'
        // axios({
        //     url: url,
        //     method: 'get',
        //     responseType: 'json',
        //     params: { limit: 0 }
        // }).then(function (xhrResponse) {
        //     console.log(xhrResponse.data)
        // }).catch(function (xhrResponse) {
        //     // let response = xhrResponse.data;
        //     // dispatch(error(response.message || 'Failed to save job due to Api failure.', job, jobModel.isNew()));
        // });
    }

    onChange(e) {
        this.setState({
            pokemonId: e.target.value
        })
    }

    searchByIndex() {
        const url = Config.BASE_URL + 'pokemon-search-by-index';
        const self = this;
        axios({
            url: url,
            method: 'get',
            responseType: 'json',
            params: { index: this.state.pokemonId }
        }).then(function (xhrResponse) {
            const response = xhrResponse.data;
            self.setState({
                data : response.data
            })
        }).catch(function (xhrResponse) {
            // let response = xhrResponse.data;
            // dispatch(error(response.message || 'Failed to save job due to Api failure.', job, jobModel.isNew()));
        });
    }

    
    render() {
        // console.log(this.state.data)
        const array1 = [1,2,3];
        const self = this;

        return (
            <div>
                home
            </div>
        );
    }
}


export default HomeMain;
