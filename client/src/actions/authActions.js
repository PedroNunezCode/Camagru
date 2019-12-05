import axios from 'axios';
import authService from './authService';

import {
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOG_OUT,
    ACCOUNT_VERIFICATION_SUCCESS,
    PASSWORD_EMAIL_SENT,
    PASSWORD_EMAIL_ERROR,
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_SUCCESS,
    NOTIFICATION_FAILURE,
} from './types';

const notificationFailure = (errors) => {
    return {
        type: NOTIFICATION_FAILURE,
        errors
    }
}

export const changeEmailNotifications = (data) => {
    return dispatch => {
        return axios.post('/auth/change-email-notification-value', data)
            .then(res => res.data)
            .then(token => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(({ response }) => {
                dispatch(notificationFailure(response.data));
            })
    }
}

const passwordChangeSuccess = () => {
    return {
        type: PASSWORD_CHANGE_SUCCESS
    }
}

const passwordChangeErrorS = (errors) => {
    return {
        type: PASSWORD_CHANGE_ERROR,
        errors
    }
}

export const changeAccountInformation = (data) => {
    return dispatch => {
        return axios.post('/auth/change-account-details', data)
            .then((res) => {
                dispatch(passwordChangeSuccess());
                return res.status;
            })
            .catch(({ response }) => {
                dispatch(passwordChangeErrorS(response.data));
            });
    }
}

const accountVerificationSuccess = () => {
    const user_id = authService.getUserId();
    const username = authService.getUsername();

    return {
        type: ACCOUNT_VERIFICATION_SUCCESS,
        user_id,
        username,
    }
}

export const verifyAccount = (data) => {
    return dispatch => {
        return axios.post('/auth/confirm-account', data)
            .then((res) => res.data)
            .then((token) => {
                authService.saveToken(token);
                dispatch(accountVerificationSuccess());
            })
            .catch(({ response }) => {
                dispatch(loginFailure(response.data));
            });
    }
}

const sendPasswordResetTrigger = () => {
    return {
        type: PASSWORD_EMAIL_SENT
    }
}

const passwordChangeError = (errors) => {
    return {
        type: PASSWORD_EMAIL_ERROR,
        errors
    }
}

export const resetPassword = data => {
    return dispatch => {
        return axios.post('/auth/reset-password', data)
            .then((res) => res.data)
            .then((token) => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(({ response }) => {
                dispatch(passwordChangeError(response.data));
            })
    }
}

export const sendPasswordReset = data => {
    return dispatch => {
        return axios.post('/auth/send-password-reset-email', data)
            .then((res) => {
                console.log(res);
                dispatch(sendPasswordResetTrigger());
            })
            .catch(({ response }) => {
                dispatch(passwordChangeError(response.data));
            });
    }
}

export const logoutUser = () => {
    authService.invalidateUser();
    return dispatch => {
        dispatch({
            type: LOG_OUT
        });
    }
}

const loginSuccess = () => {
    const username = authService.getUsername();
    const user_id = authService.getUserId();
    const image_struct_id = authService.getImageStructId();
    const emailNotifications = authService.getEmailNotifications();
    return {
        type: LOGIN_SUCCESS,
        username,
        user_id,
        image_struct_id,
        emailNotifications
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const login = (data) => {
    return dispatch => {
        return axios.post('/auth/login', data)
            .then((res) => res.data)
            .then((token) => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(({ response }) => {
                dispatch(loginFailure(response.data));
            });
    }
}

const registerFailure = (errors) => {
    return {
        type: REGISTER_FAILURE,
        errors
    }
}

const registerSuccess = (errors) => {
    return {
        type: REGISTER_SUCCESS
    }
}

export const register = (data) => {
    return dispatch => {
        return axios.post('/auth/register', data)
            .then((res) => {
                dispatch(registerSuccess());
            })
            .catch(({ response }) => {
                dispatch(registerFailure(response.data))
            });
    }
}

export const checkAuthState = () => {
    return dispatch => {
        if (authService.isAuthenticated()) {
            // console.log("helloooo")
            dispatch(loginSuccess());
        }
    }
}