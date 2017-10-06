import React, { Component } from 'react';

export default class Canvas extends Component {

    render() {
        return (
            <section className={ this.props && this.props.fluid ? 'container-fluid' : 'container'}>
                {this.props.children}
            </section>
        );
    }
}
