//utils
import jugadores from "../api/jugador";

import history from '../history';

//normalizer
import normalizeDatos from "../normalizers/normalizeJugadores";

//constants
import * as errorMessages from '../constants/MessageConstants';


//Jugadores
export const REQUEST_JUGADORES = 'REQUEST_JUGADORES';
export const RECEIVE_JUGADORES = 'RECEIVE_JUGADORES';
export const INVALIDATE_JUGADORES = 'INVALIDATE_JUGADORES';
export const ERROR_JUGADORES = "ERROR_JUGADORES";
export const RESET_JUGADORES = "RESET_JUGADORES";

//Recuperar jugador
export function invalidateJugadores() {
    return {
        type: INVALIDATE_JUGADORES
    }
}

function requestJugadores() {
    return {
        type: REQUEST_JUGADORES,
    }
}

function receiveJugadores(json) {
    return {
        type: RECEIVE_JUGADORES,
        jugadores: normalizeDatos(json),
        receivedAt: Date.now()
    }
}

function errorJugadores(error) {
    return {
        type: ERROR_JUGADORES,
        error: error,
    }
}

export function resetJugadores() {
    return {
        type: RESET_JUGADORES
    }
}

function fetchJugadores() {
    return dispatch => {
        dispatch(requestJugadores());
        return jugadores.getAll()
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
                dispatch(receiveJugadores(data));
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorJugadores(errorMessages.UNAUTHORIZED_TOKEN));
                        return;
                    default:
                        dispatch(errorJugadores(errorMessages.GENERAL_ERROR));
                        return;
                }
            });
    }
}

function shouldFetchJugadores(state) {
    const jugadores = state.jugadores.byId;
    if (!jugadores) {
        return true
    } else if (jugadores.isFetching) {
        return false
    } else {
        return jugadores.didInvalidate;
    }
}

export function fetchJugadoresIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchJugadores(getState(), )) {
            return dispatch(fetchJugadores())
        }
        else
            return Promise.resolve();
    }
}

//Jugadores
export const REQUEST_JUGADOR = 'REQUEST_JUGADOR';
export const RECEIVE_JUGADOR = 'RECEIVE_JUGADOR';
export const INVALIDATE_JUGADOR = 'INVALIDATE_JUGADOR';
export const ERROR_JUGADOR = "ERROR_JUGADOR";
export const RESET_JUGADOR = "RESET_JUGADOR";

//Recuperar jugador
export function invalidateJugador() {
    return {
        type: INVALIDATE_JUGADOR
    }
}

function requestJugador() {
    return {
        type: REQUEST_JUGADOR,
    }
}

function receiveJugador(jugador) {
    return {
        type: RECEIVE_JUGADOR,
        jugador: jugador,
        receivedAt: Date.now()
    }
}

function errorJugador(error) {
    return {
        type: ERROR_JUGADOR,
        error: error,
    }
}

export function resetJugador() {
    return {
        type: RESET_JUGADOR
    }
}

export function fetchJugador(nro_camiseta) {
    return dispatch => {
        dispatch(requestJugador());
        return jugadores.getOne(nro_camiseta)
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
                dispatch(receiveJugador(data));
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorJugador(errorMessages.UNAUTHORIZED_TOKEN));
                        return;
                    default:
                        dispatch(errorJugador(errorMessages.GENERAL_ERROR));
                        return;
                }
            });
    }
}

function shouldFetchJugador(state, nro_camiseta) {
    const jugadores = state.jugadores.byId;
    if (!jugadores) {
        return true
    } else if (jugadores.isFetching) {
        return false
    } else {
        return jugadores.didInvalidate;
    }
}

export function fetchJugadorIfNeeded(nro_camiseta) {
    return (dispatch, getState) => {
        if (shouldFetchJugador(getState(), )) {
            return dispatch(fetchJugador(nro_camiseta))
        }
        else
            return Promise.resolve();
    }
}






//Alta jugador
export const CREATE_JUGADOR = 'CREATE_JUGADOR';
export const REQUEST_CREATE_JUGADOR = "REQUEST_CREATE_JUGADOR";
export const SUCCESS_CREATE_JUGADOR = "SUCCESS_CREATE_JUGADOR";
export const ERROR_CREATE_JUGADOR = "ERROR_CREATE_JUGADOR";
export const RESET_CREATE_JUGADOR = "RESET_CREATE_JUGADOR";

function requestCreateJugador() {
    return {
        type: REQUEST_CREATE_JUGADOR,
    }
}

function receiveCreateJugador() {
    return {
        type: SUCCESS_CREATE_JUGADOR,
        receivedAt: Date.now()
    }
}

function errorCreateJugador(error) {
    return {
        type: ERROR_CREATE_JUGADOR,
        error: error,
    }
}

export function resetCreateJugador(error) {
    return {
        type: RESET_CREATE_JUGADOR,
        error: error,
    }
}

export function createJugador(jugador) {
    return {
        type: CREATE_JUGADOR,
        jugador
    }
}

export function saveCreateJugador(jugador) {
    return dispatch => {
        dispatch(requestCreateJugador());
        return jugadores.saveCreateJugador(jugador)
            .then(function (response) {

                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    history.push("/jugadores");
                    return response.json();
                }
            })
            .then(function (data) {
                dispatch(receiveCreateJugador());
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorCreateJugador(errorMessages.UNAUTHORIZED_TOKEN));
                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorCreateJugador(error));
                                else
                                    dispatch(errorCreateJugador(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}

//Eliminar jugador
export const DELETE_JUGADOR = 'DELETE_JUGADOR';
export const REQUEST_DELETE_JUGADOR = "REQUEST_DELETE_JUGADOR";
export const SUCCESS_DELETE_JUGADOR = "SUCCESS_DELETE_JUGADOR";
export const ERROR_DELETE_JUGADOR = "ERROR_DELETE_JUGADOR";
export const RESET_DELETE_JUGADOR = "RESET_DELETE_Jugador";

export function fetchAndDelete(idJugador) {
    return (dispatch, getState) => {
        dispatch(fetchJugadoresIfNeeded())
            .then(() => dispatch(deleteJugador(getState().Jugadores.byId.Jugadores[idJugador])))
    }
}

function requestDeleteJugador() {
    return {
        type: REQUEST_DELETE_JUGADOR,
    }
}

function receiveDeleteJugador() {
    return {
        type: SUCCESS_DELETE_JUGADOR,
        receivedAt: Date.now()
    }
}

function errorDeleteJugador(error) {
    return {
        type: ERROR_DELETE_JUGADOR,
        error: error,
    }
}

export function resetDeleteJugador(error) {
    return {
        type: RESET_DELETE_JUGADOR,
        error: error,
    }
}

export function deleteJugador(jugador) {
    return {
        type: DELETE_JUGADOR,
        jugador
    }
}

export function saveDeleteJugador(nro_camiseta) {
    return dispatch => {
        dispatch(requestDeleteJugador());
        return jugadores.saveDelete(nro_camiseta)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    //Borra al Jugador
                    dispatch(receiveDeleteJugador());
                }
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorDeleteJugador(errorMessages.UNAUTHORIZED_TOKEN));                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorDeleteJugador(error));
                                else
                                    dispatch(errorDeleteJugador(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}

//Modificacion jugador
export const UPDATE_JUGADOR = 'UPDATE_JUGADOR';
export const REQUEST_UPDATE_JUGADOR = "REQUEST_UPDATE_JUGADOR";
export const SUCCESS_UPDATE_JUGADOR = "SUCCESS_UPDATE_JUGADOR";
export const ERROR_UPDATE_JUGADOR = "ERROR_UPDATE_JUGADOR";
export const RESET_UPDATE_JUGADOR = "RESET_UPDATE_JUGADOR";

export function fetchAndUpdate(idJugador) {
    return (dispatch, getState) => {
        dispatch(fetchJugadoresIfNeeded({id:idJugador}))
            .then(() => dispatch(updateJugador(getState().jugadores.byId.jugadores[idJugador])))
    }
}

function requestUpdateJugador() {
    return {
        type: REQUEST_UPDATE_JUGADOR,
    }
}

function receiveUpdateJugador() {
    return {
        type: SUCCESS_UPDATE_JUGADOR,
        receivedAt: Date.now()
    }
}

function errorUpdateJugador(error) {
    return {
        type: ERROR_UPDATE_JUGADOR,
        error: error,
    }
}

export function resetUpdateJugador(error) {
    return {
        type: RESET_UPDATE_JUGADOR,
        error: error,
    }
}

export function updateJugador(jugador) {
    return {
        type: UPDATE_JUGADOR,
        jugador
    }
}

export function saveUpdateJugador(jugador) {
    return dispatch => {
        dispatch(requestUpdateJugador());
        return jugadores.saveUpdate(jugador)
            .then(function (response) {
                //Refresco token
                //auth.addToken(response.headers);
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    dispatch(receiveUpdateJugador());
                    history.push("/jugadores");
                }
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorUpdateJugador(errorMessages.UNAUTHORIZED_TOKEN));
                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorUpdateJugador(error));
                                else
                                    dispatch(errorUpdateJugador(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}