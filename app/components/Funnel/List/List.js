import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import cx from 'classnames';

import { dragSource, dropTarget, arePropsEqual } from './dnd';
import Card from '../Card';

import './List.less';

class List extends Component {

    constructor (props) {
        super(props);
    }

    static propTypes = {
        // list: PropTypes.object.isRequired,
        // moveList: PropTypes.func.isRequired,
        moveCard: PropTypes.func.isRequired,
    }

    render() {
        const {connectDropTarget, isOver, itemListIndex } = this.props;

        const className = cx('funnel-list', this.props.classNames, {
            '-empty': this.props.items.size === 0,
            '-is-over': isOver && this.props.index !== itemListIndex
        });

        if (Array.isArray(this.props.children)) {
            return connectDropTarget(
                <div className={className}>
                    <header className="funnel-list-header">
                        <h3 className={this.props.iconClass}>{this.props.title}</h3>
                    </header>
                    <div className="funnel-card -empty">
                        <div className="funnel-card-inner" />
                    </div>
                    {this.props.children}
                </div>
            );
        }
    }

    renderList() {
        const {items} = this.props.list;

        return (
            <ul>
            {items.map((item, index) => (
                <Card key={item.id}
                item={item}
                index={index}
                list={this.props.index}
                moveCard={this.props.moveCard} />
            ))}
            </ul>
        );
    }

    renderEmpty() {
        return (
            <div className="funnel-list-empty">
                <span>Empty</span>
            </div>
        );
    }

}
// List = DragSource('list', dragSource.spec, dragSource.collect, {arePropsEqual})(List);

module.exports = DropTarget(['card', 'list'], dropTarget.spec, dropTarget.collect, {arePropsEqual})(List);
