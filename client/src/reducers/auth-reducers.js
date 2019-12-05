import {
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGIN_FAILURE,
    LOG_OUT,
    ACCOUNT_VERIFICATION_SUCCESS,
    PASSWORD_EMAIL_ERROR,
    PASSWORD_EMAIL_SENT,
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_SUCCESS,
    NOTIFICATION_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    isAuth: false,
    errors: [],
    username: '',
    userId: '',
    successfullRegister: false,
    passwordResetEmailSent: false,
    verifiedAccount: false,
    changedEmailAddress: false,
    imageStructId: '',
    passwordChange: false,
    emailNotifications: true,
    notificationFailure: false,
}

export const authReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { isAuth: true, errors: [], username: action.username, userId: action.user_id, 
                imageStructId: action.image_struct_id, emailNotifications: action.emailNotifications});
        case LOGIN_FAILURE:
            return Object.assign({}, state, { isAuth: false, errors: action.errors })
        case REGISTER_FAILURE:
            return Object.assign({}, state, { errors: action.errors });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, { errors: [], successfullRegister: true });
        case ACCOUNT_VERIFICATION_SUCCESS:
            return Object.assign({}, state, { errors: [], isAuth: true, username: action.username, userId: action.userId, verifiedAccount: true });
        case LOG_OUT:
            return state;
        case PASSWORD_EMAIL_SENT:
            return Object.assign({}, state, { passwordResetEmailSent: true, errors: [] });
        case PASSWORD_EMAIL_ERROR:
            return Object.assign({}, state, { errors: action.errors });
        case PASSWORD_CHANGE_SUCCESS:
            return Object.assign({}, state, { passwordChange: true, errors: [] });
        case PASSWORD_CHANGE_ERROR:
            return Object.assign({}, state, { errors: action.errors });
        case NOTIFICATION_FAILURE:
            return Object.assign({}, state, {errors: action.errors, notificationFailure: true});
        default:
            return state;
    }
}