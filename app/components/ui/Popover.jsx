import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import './Popover.less';

export default class Popover extends Component {
    constructor (props) {
        super(props);
        this.state = {
            show: false,
            close: false
        };
        this.toggle = this.toggle.bind(this);
        this.closePopover = this.closePopover.bind(this);
    }

    toggle(e) {
        const area = ReactDOM.findDOMNode(this.refs.popover);
        if (area && !area.contains(e.target)) {
            this.setState({
                show: !this.state.show
            });
            return false;
        }
    }

    componentWillUpdate() {
        if (this.state.show) {
            window.app.removeEventListener('click', this.closePopover);
        } else{
            window.app.addEventListener('click', this.closePopover);
        }
    }

    componentWillUnmount() {
        window.app.removeEventListener('click', this.closePopover);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.closePopover) {
            this.setState({
                show: false
            })
        }
    }

    closePopover(e) {
        const area = ReactDOM.findDOMNode(this);
        if (area && !area.contains(e.target)) {
            this.setState({
                show: false
            });
            return false;
        }
    }

    render() {
        const { style, title, children, position, content } = this.props;
        const { show } = this.state;

        let className = cx('popover', position, {
            hide: !show
        });

        return (
            <span onClick={this.toggle} className="popover-container">
                {children}
                <div className={className} style={style} ref="popover">
                    <div className="arrow "></div>
                    {title ? 
                        <div className="popover-title">
                            title
                        </div> : null
                    }
                    <div className="popover-content">
                        {content}
                    </div>
                </div>
            </span>
        );
    }
}
