//utils
import torneos from "../api/torneo";

import history from '../history';

//normalizer
import normalizeDatos from "../normalizers/normalizeTorneos";

//constants
import * as errorMessages from '../constants/MessageConstants';


//Torneos
export const REQUEST_TORNEOS = 'REQUEST_TORNEOS';
export const RECEIVE_TORNEOS = 'RECEIVE_TORNEOS';
export const INVALIDATE_TORNEOS = 'INVALIDATE_TORNEOS';
export const ERROR_TORNEOS = "ERROR_TORNEOS";
export const RESET_TORNEOS = "RESET_TORNEOS";

//Recuperar torneo
export function invalidateTorneos() {
    return {
        type: INVALIDATE_TORNEOS
    }
}

function requestTorneos() {
    return {
        type: REQUEST_TORNEOS,
    }
}

function receiveTorneos(json) {
    return {
        type: RECEIVE_TORNEOS,
        torneos: json,
        receivedAt: Date.now()
    }
}

function errorTorneos(error) {
    return {
        type: ERROR_TORNEOS,
        error: error,
    }
}

function fetchTorneos() {
    return dispatch => {
        dispatch(requestTorneos());
        return torneos.getAll()
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
                dispatch(receiveTorneos(data));
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorTorneos(errorMessages.UNAUTHORIZED_TOKEN));
                        return;
                    default:
                        dispatch(errorTorneos(errorMessages.GENERAL_ERROR));
                        return;
                }
            });
    }
}

function shouldFetchTorneos(state) {
    const torneos = state.torneos.byId;
    if (!torneos) {
        return true
    } else if (torneos.isFetching) {
        return false
    } else {
        return torneos.didInvalidate;
    }
}

export function fetchTorneosIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchTorneos(getState(), )) {
            return dispatch(fetchTorneos())
        }
        else
            return Promise.resolve();
    }
}


export function resetTorneoss() {
    return {
        type: RESET_TORNEOS
    }
}

//Alta torneo
export const CREATE_TORNEO = 'CREATE_TORNEO';
export const REQUEST_CREATE_TORNEO = "REQUEST_CREATE_TORNEO";
export const SUCCESS_CREATE_TORNEO = "SUCCESS_CREATE_TORNEO";
export const ERROR_CREATE_TORNEO = "ERROR_CREATE_TORNEO";
export const RESET_CREATE_TORNEO = "RESET_CREATE_TORNEO";

function requestCreateTorneo() {
    return {
        type: REQUEST_CREATE_TORNEO,
    }
}

function receiveCreateTorneo() {
    return {
        type: SUCCESS_CREATE_TORNEO,
        receivedAt: Date.now()
    }
}

function errorCreateTorneo(error) {
    return {
        type: ERROR_CREATE_TORNEO,
        error: error,
    }
}

export function resetCreateTorneo(error) {
    return {
        type: RESET_CREATE_TORNEO,
        error: error,
    }
}

export function createTorneo(torneo) {
    return {
        type: CREATE_TORNEO,
        torneo
    }
}

export function saveCreateTorneo(torneo) {
    return dispatch => {
        dispatch(requestCreateTorneo());
        return torneos.saveCreate(torneo)
            .then(function (response) {

                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    return response.json();
                }
            })
            .then(function (data) {
                dispatch(receiveCreateTorneo());
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorCreateTorneo(errorMessages.UNAUTHORIZED_TOKEN));
                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorCreateTorneo(error));
                                else
                                    dispatch(errorCreateTorneo(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}

//Eliminar torneo
export const DELETE_TORNEO = 'DELETE_TORNEO';
export const REQUEST_DELETE_TORNEO = "REQUEST_DELETE_TORNEO";
export const SUCCESS_DELETE_TORNEO = "SUCCESS_DELETE_TORNEO";
export const ERROR_DELETE_TORNEO = "ERROR_DELETE_TORNEO";
export const RESET_DELETE_TORNEO = "RESET_DELETE_Torneo";

export function fetchAndDelete(idTorneo) {
    return (dispatch, getState) => {
        dispatch(fetchTorneosIfNeeded())
            .then(() => dispatch(deleteTorneo(getState().Torneos.byId.Torneos[idTorneo])))
    }
}

function requestDeleteTorneo() {
    return {
        type: REQUEST_DELETE_TORNEO,
    }
}

function receiveDeleteTorneo() {
    return {
        type: SUCCESS_DELETE_TORNEO,
        receivedAt: Date.now()
    }
}

function errorDeleteTorneo(error) {
    return {
        type: ERROR_DELETE_TORNEO,
        error: error,
    }
}

export function resetDeleteTorneo(error) {
    return {
        type: RESET_DELETE_TORNEO,
        error: error,
    }
}

export function deleteTorneo(torneo) {
    return {
        type: DELETE_TORNEO,
        torneo
    }
}

export function saveDeleteTorneo(idTorneo) {
    return dispatch => {
        dispatch(requestDeleteTorneo());
        return torneos.saveDelete(idTorneo)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    //Borra al Torneo
                    dispatch(receiveDeleteTorneo());
                }
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorDeleteTorneo(errorMessages.UNAUTHORIZED_TOKEN));                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorDeleteTorneo(error));
                                else
                                    dispatch(errorDeleteTorneo(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}

//Modificacion torneo
export const UPDATE_TORNEO = 'UPDATE_TORNEO';
export const REQUEST_UPDATE_TORNEO = "REQUEST_UPDATE_TORNEO";
export const SUCCESS_UPDATE_TORNEO = "SUCCESS_UPDATE_TORNEO";
export const ERROR_UPDATE_TORNEO = "ERROR_UPDATE_TORNEO";
export const RESET_UPDATE_TORNEO = "RESET_UPDATE_TORNEO";

export function fetchAndUpdateTorneo(idTorneo) {
    return (dispatch, getState) => {
        dispatch(fetchTorneosIfNeeded({id:idTorneo}))
            .then(() => dispatch(updateTorneo(getState().torneos.byId.torneos[idTorneo])))
    }
}

function requestUpdateTorneo() {
    return {
        type: REQUEST_UPDATE_TORNEO,
    }
}

function receiveUpdateTorneo() {
    return {
        type: SUCCESS_UPDATE_TORNEO,
        receivedAt: Date.now()
    }
}

function errorUpdateTorneo(error) {
    return {
        type: ERROR_UPDATE_TORNEO,
        error: error,
    }
}

export function resetUpdateTorneo(error) {
    return {
        type: RESET_UPDATE_TORNEO,
        error: error,
    }
}

export function updateTorneo(torneo) {
    return {
        type: UPDATE_TORNEO,
        torneo
    }
}

export function saveUpdateTorneo(torneo) {
    return dispatch => {
        dispatch(requestUpdateTorneo());
        return torneos.saveUpdate(torneo)
            .then(function (response) {
                //Refresco token
                //auth.addToken(response.headers);
                if (response.status >= 400) {
                    return Promise.reject(response);
                }
                else {
                    dispatch(receiveUpdateTorneo());
                    dispatch(invalidateTorneos());
                    dispatch(fetchTorneosIfNeeded({id: torneo.id}));
                    history.push("/configuracion/torneo/");
                }
            })
            .catch(function (error) {
                    switch (error.status) {
                        case 401:
                            dispatch(errorUpdateTorneo(errorMessages.UNAUTHORIZED_TOKEN));
                            return;
                        default:
                            error.json().then((error) => {
                                if (error !== "")
                                    dispatch(errorUpdateTorneo(error));
                                else
                                    dispatch(errorUpdateTorneo(errorMessages.GENERAL_ERROR));
                            });
                            return;
                    }
                }
            );
    }
}