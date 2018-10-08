import merge from "lodash/merge";
import {
    RECEIVE_LOGIN,
    REQUEST_LOGIN,
    ERROR_LOGIN,
    CHANGE_LOGIN,
    CHANGE_USER,
    RESET_LOGIN,
    LOGOUT_SUCCESS
} from '../actions/AuthenticationActions';
import auth from '../api/authentication';

const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
    usuario: {
        nombreUsuario: '',
        password: ''
    },
    currentlySending: false,
    token: auth.loggedIn(),
    errorMessage: null,
    idUsuario: auth.idUsuario(),
};

// Takes care of changing the application state
const authentication = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN:
            return assign({}, state, {
                usuario: merge({}, state.usuario, action.usuario),
            });
        case RECEIVE_LOGIN:
            return assign({}, state, {
                token: action.token,
                errorMessage: null,
                currentlySending: false
            });
        case REQUEST_LOGIN:
            return assign({}, state, {
                currentlySending: action.sending,
                errorMessage: null,
            });
        case ERROR_LOGIN:
            return assign({}, state, {
                errorMessage: action.error,
                currentlySending: false,
                token: false
            });
        case CHANGE_USER:
            return assign({}, state, {
                nombreUsuario: action.nombreUsuario
            });
        case RESET_LOGIN:
            return assign({}, state, {
                usuario: {nombreUsuario: '', password: ''},
                currentlySending: false,
                token: false,
                errorMessage: null,

            });
        case LOGOUT_SUCCESS:
            return assign({}, state, {
                usuario: {nombreUsuario: '', password: ''},
                currentlySending: false,
                token: false,
                errorMessage: null,
            });
        default:
            return state;
    }
};

export default authentication;
