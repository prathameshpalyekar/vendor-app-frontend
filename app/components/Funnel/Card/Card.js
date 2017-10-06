import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import cx from 'classnames';

import { dragSource, dropTarget } from './dnd';

import './Card.less';

class Card extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        moveCard: PropTypes.func,
    }

    render() {
        const {connectDragSource, isDragging} = this.props;
        const {item} = this.props;
        const classNames = cx('funnel-card', { 'dragging': isDragging });

        return (
            <li className={classNames}>
            {
                connectDragSource(
                    <div className="funnel-card-inner">
                        {this.props.children}
                    </div>
                )
            }
            </li>
        );
    }

}

// Set card as target
// Card = DropTarget('card', dropTarget.spec, dropTarget.collect)(Card);

// Set card as source as well
module.exports = DragSource('card', dragSource.spec, dragSource.collect)(Card);
