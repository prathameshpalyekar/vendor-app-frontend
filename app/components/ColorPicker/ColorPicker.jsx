import React, { Component, PropTypes } from 'react';
import { CompactPicker } from 'react-color'

export default class ColorPicker extends Component {

    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
            zIndex: '1',
        }

        const picker = {
            position: 'relative',
            zIndex: '4',
        }

        return (
            <div style={popover}>
                <div style={cover} onClick={ this.props.onClick }/>
                <div style={picker}>
                    <CompactPicker {...this.props} />
                </div>
            </div>
        )

    }
}
