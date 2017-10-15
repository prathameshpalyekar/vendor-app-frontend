import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import Config from 'config';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import GlobalHeader from 'components/GlobalHeader';

class App extends Component {
    componentDidMount() {
        const { router } = this.context;
        const { isAuthenticated, location } = this.props;
        const currentRoute = this.props.routes[this.props.routes.length - 1];

        if (!isAuthenticated) {
            router.replace('/login');
        } else {
            if (location.pathname === '/') {
                router.replace('/home');
            }
        }
    }

    render() {
        const { user, isAuthenticated } = this.props;
        const currentRoute = this.props.routes[this.props.routes.length - 1];

        return (
            <div className="app-inner-inner">
                {isAuthenticated ? <GlobalHeader/> : null}
                {this.props.children}
                <Alert stack={{limit: 3}} effect="slide" position="bottom-left" timeout={5000} />
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};

App.displayName = 'App';

const mapStateToProps = (state, di) => {
    return {
        user: state.getIn(['auth', 'user']),
        isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
    };
};

export default (connect(mapStateToProps)(App));
