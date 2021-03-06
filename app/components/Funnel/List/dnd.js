import { findDOMNode } from 'react-dom';

const dragSource = {
    collect(connect, monitor) {
        return {
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging(),
        }
    },

    spec: {
        beginDrag(props) {
            return {
                index: props.index,
                id: props.list.id,
            };
        },

        isDragging(props, monitor) {
            return props.list.id === monitor.getItem().id;
        },
    },
};

const hover = {
    card(props, monitor, component) {
        if (monitor.isOver({shallow:true}) && monitor.canDrop()) {
            const item = monitor.getItem();
            const target = { list: props.index };
            const sameList = item.list === target.list;

            const titleRect = findDOMNode(component).firstChild.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();

            if (clientOffset.y <= titleRect.bottom) {
                target.index = 0;
            } else {
                target.index = Math.max(props.items.length-1, 0);
            }

            // if (item.list !== target.list || item.index !== target.index) {
            //     props.moveCard(item, target);
            // }
        }
    },

    // list(props, monitor, component) {
    //   const item = monitor.getItem();
    //   const target = { index: props.index };
    //   if (item.index !== target.index && monitor.canDrop()) {
    //     props.moveList(item, target);
    //   }
    // },
};

const dropTarget = {
    collect(connect, monitor) {
        const item = monitor.getItem();
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver(),
            itemListIndex: item ? item.list : null
        };
    },

    spec: {
        hover(props, monitor, component) {
            const type = monitor.getItemType();
            const handler = hover[type];
            if (typeof(handler) === 'function') {
                handler(props, monitor, component);
            } else {
                console.warn(`No hover handler found for drag source type ${type}`);
            }
        },
        drop (props, monitor, component) {
            if (monitor.didDrop()) {
                return;
            }
            const item = monitor.getItem();
            const target = { list: props.items, index: props.index, id: item.id };
            if (item.list !== target.list || item.index !== target.index) {
                props.moveCard(item, target);
            }
        }
    },
};

const arePropsEqual = (props, otherProps) => false;

module.exports = {
    dragSource: dragSource,
    dropTarget: dropTarget,
    arePropsEqual: arePropsEqual
};
