import auth from "../api/authentication"
import * as errorMessages  from '../constants/MessageConstants';
import history from '../history';
import jwt_decode from 'jwt-decode';


//LOGIN
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const ERROR_LOGIN= "ERROR_LOGIN";
export const CHANGE_LOGIN= "CHANGE_LOGIN";
export const CHANGE_USER= "CHANGE_USER";
export const RESET_LOGIN = 'RESET_LOGIN';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export function login(usuario) {
    return (dispatch) => {
        dispatch(sendingRequest(true));
        // If no username or password was specified, throw a field-missing error
        if (anyElementsEmpty(usuario)) {
            dispatch(sendingRequest(false));
            dispatch(errorLogin("Completa los campos"));
            return;
        }
        auth.login(usuario, (success, error) => {
            // When the request is finished, hide the loading indicator
            //dispatch(sendingRequest(false));

            if (success === true) {
                dispatch(receiveLogin(success));
                //guardo usuario logueado
                var datos = jwt_decode(localStorage.token);
                dispatch(changeUser(datos.nombreUsuario));
                // If the login worked, forward the user to the dashboard and clear the form
                dispatch(changeLogin({
                    nombreUsuario: "",
                    password: ""
                }));
                history.push("/jugadores");
            } else {
                switch (error.status) {
                    case 401:
                        dispatch(errorLogin(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        try {
                            error.json()
                                .then((error) => {
                                    if (error.message != "")
                                        dispatch(errorLogin(error.message));
                                    else
                                        dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                })
                                .catch((error) => {
                                    dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                });
                        }catch (e){}
                        return;
                }
            }
            // });
        });
    }
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
    };
}

export function logout() {
    return (dispatch) => {
        dispatch(requestLogout());
        //dispatch(resetCreateUsuario());
        //dispatch(resetUpdateUsuarioLogueado());
        localStorage.removeItem('token');
        document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        dispatch(receiveLogout());
        window.location.reload;


    };
}


export function sendingRequest(sending) {
    return {type: REQUEST_LOGIN, sending};
}

export function receiveLogin(token) {
    return {type: RECEIVE_LOGIN, token};
}

export function changeLogin(usuario) {
    return {type: CHANGE_LOGIN, usuario: usuario};
}

export function changeUser(nombreUsuario) {
    return {type: CHANGE_USER, nombreUsuario: nombreUsuario};
}
export function resetLogin() {
    return {
        type: RESET_LOGIN
    }
}
function errorLogin(error) {
    return {
        type: ERROR_LOGIN,
        error: error,
    }
}

function anyElementsEmpty(elements) {
    for (let element in elements) {
        if (!elements[element]) {
            return true;
        }
    }
    return false;
}

export function olvideMiPassword(usuario) {
    return (dispatch) => {
        dispatch(sendingRequest(true));
        // If no username or password was specified, throw a field-missing error
        if (usuario=="") {
            dispatch(sendingRequest(false));
            dispatch(errorLogin("Debe ingresar su usuario para iniciar el proceso de recuperación."));
            return;
        }
        auth.olvideMiPassword(usuario, (success, error) => {
            // When the request is finished, hide the loading indicator
            if (success === true) {
                dispatch(sendingRequest(false));
            } else {
                switch (error.status) {
                    case 401:
                        dispatch(errorLogin(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        try {
                            error.json()
                                .then((error) => {
                                    if (error.message != "")
                                        dispatch(errorLogin(error.message));
                                    else
                                        dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                })
                                .catch((error) => {
                                    dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                });
                        }catch (e){}
                        return;
                }
            }
            // });
        });
    }
}

export function resetPassword(usuario) {
    return (dispatch) => {
        dispatch(sendingRequest(true));
        auth.resetPassword(usuario, (success, error) => {
            // When the request is finished, hide the loading indicator
            dispatch(sendingRequest(false));
            if (success === true) {
                history.replace('/login', null);
            } else {
                switch (error.status) {
                    case 401:
                        dispatch(errorLogin(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        try {
                            error.json()
                                .then((error) => {
                                    if (error.message != "")
                                        dispatch(errorLogin(error.message));
                                    else
                                        dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                })
                                .catch((error) => {
                                    dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                });
                        }catch (e){}
                        return;
                }
            }
            // });
        });
    }
}

export function validarToken(token) {
    return (dispatch) => {
        //dispatch(sendingRequest(true));
        auth.validarToken(token, (success, error) => {
            // When the request is finished, hide the loading indicator
            //dispatch(sendingRequest(false));
            if (success === true) {

            } else {
                switch (error.status) {
                    case 401:
                        dispatch(errorLogin(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        try {
                            error.json()
                                .then((error) => {
                                    if (error.message != "")
                                        dispatch(errorLogin(error.message));
                                    else
                                        dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                })
                                .catch((error) => {
                                    dispatch(errorLogin(errorMessages.GENERAL_ERROR));
                                });
                        }catch (e){}
                        return;
                }
            }
            // });
        });
    }
}