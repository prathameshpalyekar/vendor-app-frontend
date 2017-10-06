import React, { Component } from 'react';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import cx from 'classnames';

import List from '../List';

import './Board.less';

export default class Board extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const className = cx('funnel-board', this.props.className);

        return (
            <div className={className} ref="funnelBoard">
                <div className="funnel-lists">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

// module.exports = DragDropContext(HTML5Backend)(Board);
