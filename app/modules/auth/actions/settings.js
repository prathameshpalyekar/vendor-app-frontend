import axios from 'axios';

import Config from '../../../config';

// Possible states
export const SETTINGS_REQUEST = 'SETTINGS_REQUEST'
export const SETTINGS_SUCCESS = 'SETTINGS_SUCCESS'
export const SETTINGS_FAILURE = 'SETTINGS_FAILURE'
export const JOYRIDE_RESET = 'JOYRIDE_RESET'
function requestSaveSettings(user) {
  return {
      type: SETTINGS_REQUEST,
      user
    }
}

function receiveSaveSettings(user) {
  return {
      type: SETTINGS_SUCCESS,
      user
    }
}

function saveSettingsError(message) {
  return {
      type: SETTINGS_FAILURE,
      message
    }
}

export function saveSettings(user) {

    return (dispatch) => {

        dispatch(requestSaveSettings(user));

        return axios({
            url: Config.BASE_URL + 'user/me',
            method: 'PUT',
            responseType: 'json',
            data: user
        }).then(function (xhrResponse) {
            let response = xhrResponse.data;
            if (response.success) {
                dispatch(receiveSaveSettings(response.data));
            } else {
                dispatch(saveSettingsError('Failed to save account settings.'));
            }
        }).catch(function (xhrResponse) {
            let response = xhrResponse.data;
            dispatch(saveSettingsError((response && response.message) || 'Failed to save account settings. API failure.'));
        });
    }
}
