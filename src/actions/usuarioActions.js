import usuario from "../api/usuario";
import history from "../history";
import * as errorMessages from '../constants/MessageConstants';

//Actions
import {logout} from "../actions/AuthenticationActions";



//USUARIO CREATE
export const CREATE_USUARIO = 'CREATE_USUARIO';
export const REQUEST_CREATE_USUARIO = "REQUEST_CREATE_USUARIO";
export const SUCCESS_CREATE_USUARIO = "SUCCESS_CREATE_USUARIO";
export const ERROR_CREATE_USUARIO = "ERROR_CREATE_USUARIO";
export const RESET_CREATE_USUARIO = "RESET_CREATE_USUARIO";

//USUARIOLOGUEADO UPDATE
export const UPDATE_USUARIOLOGUEADO = 'UPDATE_USUARIOLOGUEADO';
export const REQUEST_UPDATE_USUARIOLOGUEADO = "REQUEST_UPDATE_USUARIOLOGUEADO";
export const SUCCESS_UPDATE_USUARIOLOGUEADO = "SUCCESS_UPDATE_USUARIOLOGUEADO";
export const ERROR_UPDATE_USUARIOLOGUEADO = "ERROR_UPDATE_USUARIOLOGUEADO";
export const RESET_UPDATE_USUARIOLOGUEADO = "RESET_UPDATE_USUARIOLOGUEADO";

//CREATE
function requestCreateUsuario() {
    return {
        type: REQUEST_CREATE_USUARIO,
    }
}

function receiveCreateUsuario() {
    return {
        type: SUCCESS_CREATE_USUARIO,
        receivedAt: Date.now()
    }
}

export function errorCreateUsuario(error) {
    return {
        type: ERROR_CREATE_USUARIO,
        error: error,
    }
}

export function resetCreateUsuario(error) {
    return {
        type: RESET_CREATE_USUARIO
    }
}

export function createUsuario(usuario) {
    return {
        type: CREATE_USUARIO,
        usuario
    }
}

function saveCreateUsuario() {
    return (dispatch, getState) => {
        dispatch(requestCreateUsuario());
        return usuario.saveCreate(getState().usuarios.byId.usuarioLogueado)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    dispatch(receiveCreateUsuario());
                    return response.json();
                }
            })
            .then((usuario) => {
                dispatch(resetCreateUsuario());
                history.push("/jugadores");
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorCreateUsuario(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        error.json()
                            .then((error) => {
                                if (error.message != "")
                                    dispatch(errorCreateUsuario(error.message));
                                else
                                    dispatch(errorCreateUsuario(errorMessages.GENERAL_ERROR));
                            })
                            .catch((error) => {
                                dispatch(errorCreateUsuario(errorMessages.GENERAL_ERROR));
                            });
                        return;
                }
            });
    }
}

//UPDATE
function requestUpdateUsuarioLogueado() {
    return {
        type: REQUEST_UPDATE_USUARIOLOGUEADO,
    }
}

function receiveUpdateUsuarioLogueado() {
    return {
        type: SUCCESS_UPDATE_USUARIOLOGUEADO,
        receivedAt: Date.now()
    }
}

function errorUpdateUsuarioLogueado(error) {
    return {
        type: ERROR_UPDATE_USUARIOLOGUEADO,
        error: error,
    }
}

export function resetUpdateUsuarioLogueado() {
    //todo buscar usuario
    return {
        type: RESET_UPDATE_USUARIOLOGUEADO
    }
}

export function updateUsuarioLogueado(usuario) {
    return {
        type: UPDATE_USUARIOLOGUEADO,
        usuario
    }
}

function saveUpdateUsuarioLogueado() {
    return (dispatch, getState) => {
        dispatch(requestUpdateUsuarioLogueado());

        return usuario.saveUpdate(getState().usuarios.byId.usuarioLogueado)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    dispatch(receiveUpdateUsuarioLogueado());
                    return response.json();
                }
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorUpdateUsuarioLogueado(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        dispatch(errorUpdateUsuarioLogueado(errorMessages.GENERAL_ERROR));
                        return;
                }
            });
    }
}

export function saveUsuarioLogueado() {
    return (dispatch, getState) => {
        if (!getState().usuarios.byId.usuarioLogueado.id)
            dispatch(saveCreateUsuario());
        else
            dispatch(saveUpdateUsuarioLogueado())

    }
}


export function changeUsuarioLogueado(usuario) {
    return (dispatch, getState) => {
        //Decidir si actualizar o modificar
        if (!getState().usuarios.byId.usuarioLogueado.id)
            dispatch(createUsuario(usuario));
        else
            dispatch(updateUsuarioLogueado(usuario));
    }
}