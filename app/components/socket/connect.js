import Alert from 'react-s-alert'
import axios from 'axios'
import socket from './index.js'

function connect(options) {
    socket.connect(options, (err) => {
        if (err) {
            // TODO: Autoretry
            console.log(err);
            Alert.error('Socket connection failed. Please refresh and try again.')
            return false;
        }
    });
}

export default function () {
    axios({
        url: '/nes/auth',
        method: 'GET'
    }).then((xhrResponse) => {
        connect({auth: xhrResponse.data.token });
    }, (err) => {
        console.log(err);
        Alert.error('Socket authentication failed. Please refresh and try again.')
    });
}
