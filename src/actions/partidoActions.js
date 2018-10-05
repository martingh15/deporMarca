//utils
import partidos from "../api/partido";

import history from '../history';

//normalizer
import normalizeDatos from "../normalizers/normalizePartidos";

//constants
import * as errorMessages from '../constants/MessageConstants';


//Partidos
export const REQUEST_PARTIDOS = 'REQUEST_PARTIDOS';
export const RECEIVE_PARTIDOS = 'RECEIVE_PARTIDOS';
export const INVALIDATE_PARTIDOS = 'INVALIDATE_PARTIDOS';
export const ERROR_PARTIDOS = "ERROR_PARTIDOS";
export const RESET_PARTIDOS = "RESET_PARTIDOS";

//Recuperar partido
export function invalidatePartidos() {
    return {
        type: INVALIDATE_PARTIDOS
    }
}

function requestPartidos() {
    return {
        type: REQUEST_PARTIDOS,
    }
}

function receivePartidos(json) {
    return {
        type: RECEIVE_PARTIDOS,
        partidos: normalizeDatos(json),
        receivedAt: Date.now()
    }
}

function errorPartidos(error) {
    return {
        type: ERROR_PARTIDOS,
        error: error,
    }
}

function fetchPartidos() {
    return dispatch => {
        dispatch(requestPartidos());
        return partidos.getAll()
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    var data = response.json();
                    return data;
                }
            })
            .then(function (data) {
                dispatch(receivePartidos(data));
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorPartidos(errorMessages.UNAUTHORIZED_TOKEN));
                        return;
                    default:
                        dispatch(errorPartidos(errorMessages.GENERAL_ERROR));
                        return;
                }
            });
    }
}

function shouldFetchPartidos(state) {
    const partidos = state.partidos.byId;
    if (!partidos) {
        return true
    } else if (partidos.isFetching) {
        return false
    } else {
        return partidos.didInvalidate;
    }
}

export function fetchPartidosIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPartidos(getState(), )) {
            return dispatch(fetchPartidos())
        }
        else
            return Promise.resolve();
    }
}


export function resetPartidoss() {
    return {
        type: RESET_PARTIDOS
    }
}

//Alta partido
export const CREATE_PARTIDO = 'CREATE_PARTIDO';
export const REQUEST_CREATE_PARTIDO = "REQUEST_CREATE_PARTIDO";
export const SUCCESS_CREATE_PARTIDO = "SUCCESS_CREATE_PARTIDO";
export const ERROR_CREATE_PARTIDO = "ERROR_CREATE_PARTIDO";
export const RESET_CREATE_PARTIDO = "RESET_CREATE_PARTIDO";

function requestCreatePartido() {
    return {
        type: REQUEST_CREATE_PARTIDO,
    }
}

function receiveCreatePartido() {
    return {
        type: SUCCESS_CREATE_PARTIDO,
        receivedAt: Date.now()
    }
}

function errorCreatePartido(error) {
    return {
        type: ERROR_CREATE_PARTIDO,
        error: error,
    }
}

export function resetCreatePartido(error) {
    return {
        type: RESET_CREATE_PARTIDO,
        error: error,
    }
}

export function createPartido(partido) {
    return {
        type: CREATE_PARTIDO,
        partido
    }
}

export function saveCreatePartido(partido) {
    return dispatch => {
        dispatch(requestCreatePartido());
        return partidos.saveCreate(partido)
            .then(function (response) {

                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    return response.json();
                }
            })
            .then(function (data) {
                dispatch(receiveCreatePartido());
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorCreatePartido(errorMessages.UNAUTHORIZED_TOKEN));
                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorCreatePartido(error));
                                else
                                    dispatch(errorCreatePartido(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}

//Eliminar partido
export const DELETE_PARTIDO = 'DELETE_PARTIDO';
export const REQUEST_DELETE_PARTIDO = "REQUEST_DELETE_PARTIDO";
export const SUCCESS_DELETE_PARTIDO = "SUCCESS_DELETE_PARTIDO";
export const ERROR_DELETE_PARTIDO = "ERROR_DELETE_PARTIDO";
export const RESET_DELETE_PARTIDO = "RESET_DELETE_Partido";

export function fetchAndDelete(idPartido) {
    return (dispatch, getState) => {
        dispatch(fetchPartidosIfNeeded())
            .then(() => dispatch(deletePartido(getState().Partidos.byId.Partidos[idPartido])))
    }
}

function requestDeletePartido() {
    return {
        type: REQUEST_DELETE_PARTIDO,
    }
}

function receiveDeletePartido() {
    return {
        type: SUCCESS_DELETE_PARTIDO,
        receivedAt: Date.now()
    }
}

function errorDeletePartido(error) {
    return {
        type: ERROR_DELETE_PARTIDO,
        error: error,
    }
}

export function resetDeletePartido(error) {
    return {
        type: RESET_DELETE_PARTIDO,
        error: error,
    }
}

export function deletePartido(partido) {
    return {
        type: DELETE_PARTIDO,
        partido
    }
}

export function saveDeletePartido(idPartido) {
    return dispatch => {
        dispatch(requestDeletePartido());
        return partidos.saveDelete(idPartido)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    //Borra al Partido
                    dispatch(receiveDeletePartido());
                }
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorDeletePartido(errorMessages.UNAUTHORIZED_TOKEN));                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorDeletePartido(error));
                                else
                                    dispatch(errorDeletePartido(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}

//Modificacion partido
export const UPDATE_PARTIDO = 'UPDATE_PARTIDO';
export const REQUEST_UPDATE_PARTIDO = "REQUEST_UPDATE_PARTIDO";
export const SUCCESS_UPDATE_PARTIDO = "SUCCESS_UPDATE_PARTIDO";
export const ERROR_UPDATE_PARTIDO = "ERROR_UPDATE_PARTIDO";
export const RESET_UPDATE_PARTIDO = "RESET_UPDATE_PARTIDO";

export function fetchAndUpdatePartido(idPartido) {
    return (dispatch, getState) => {
        dispatch(fetchPartidosIfNeeded({id:idPartido}))
            .then(() => dispatch(updatePartido(getState().partidos.byId.partidos[idPartido])))
    }
}

function requestUpdatePartido() {
    return {
        type: REQUEST_UPDATE_PARTIDO,
    }
}

function receiveUpdatePartido() {
    return {
        type: SUCCESS_UPDATE_PARTIDO,
        receivedAt: Date.now()
    }
}

function errorUpdatePartido(error) {
    return {
        type: ERROR_UPDATE_PARTIDO,
        error: error,
    }
}

export function resetUpdatePartido(error) {
    return {
        type: RESET_UPDATE_PARTIDO,
        error: error,
    }
}

export function updatePartido(partido) {
    return {
        type: UPDATE_PARTIDO,
        partido
    }
}

export function saveUpdatePartido(partido) {
    return dispatch => {
        dispatch(requestUpdatePartido());
        return partidos.saveUpdate(partido)
            .then(function (response) {
                //Refresco token
                //auth.addToken(response.headers);
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    dispatch(receiveUpdatePartido());
                    dispatch(invalidatePartidos());
                    dispatch(fetchPartidosIfNeeded({id: partido.id}));
                    history.push("/configuracion/partido/");
                }
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorUpdatePartido(errorMessages.UNAUTHORIZED_TOKEN));
                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorUpdatePartido(error));
                                else
                                    dispatch(errorUpdatePartido(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}