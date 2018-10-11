import {combineReducers} from 'redux';
import merge from 'lodash/merge';
import union from 'lodash/union';

import normalizeDatos from "../normalizers/normalizePartidos";
import normalizeDatosTorneo from "../normalizers/normalizeTorneos";

//Actions
import {REQUEST_PARTIDOS, RECEIVE_PARTIDOS, INVALIDATE_PARTIDOS, ERROR_PARTIDOS, 
    RESET_PARTIDOS, RESET_UPDATE_PARTIDOS,CREATE_PARTIDO, REQUEST_CREATE_PARTIDOS,
    SUCCESS_CREATE_PARTIDO, ERROR_CREATE_PARTIDO, REQUEST_CREATE_PARTIDO, RESET_CREATE_PARTIDO, 
    UPDATE_PARTIDO, REQUEST_UPDATE_PARTIDO, SUCCESS_UPDATE_PARTIDO, ERROR_UPDATE_PARTIDO, 
    RESET_UPDATE_PARTIDO } from "../actions/partidoActions";
import {RECEIVE_TORNEOS} from "../actions/torneoActions";

function partidosById(state = {
    isFetching: false,
    didInvalidate: true,
    partidos: {},
}, action) {
    switch (action.type) {
        case INVALIDATE_PARTIDOS:
            return Object.assign({}, state, {
                didInvalidate: true,
                error: "",
            });
        case REQUEST_PARTIDOS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                error: "",
            });
        case RECEIVE_PARTIDOS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                partidos: merge({}, state.partidos, action.partidos.entities.partidos),
                total: action.total,
                lastUpdated: action.receivedAt,
                error: "",
            });
        case ERROR_PARTIDOS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                error: action.error
            });
        case RESET_PARTIDOS:
            return Object.assign({}, state, {
                isFetching: false,
                partidos: {},
                error: "",
            });
        case RECEIVE_TORNEOS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                partidos: merge({}, state.partidos, normalizeDatosTorneo(action.torneos).entities.partidos),
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}


function allPartidos(state = [], action) {
    switch (action.type) {
        case RECEIVE_PARTIDOS:
            return union(state, action.partidos.result);
        case RECEIVE_TORNEOS:
            let torneos = normalizeDatosTorneo(action.torneos).entities.partidos;
            return torneos ? Object.keys(torneos) : [];
        case RESET_PARTIDOS:
            return [];
        default:
            return state
    }
}

function create(state = {
    isCreating: false,
    nuevo: {},
    error: ""
}, action) {
    switch (action.type) {
        case CREATE_PARTIDO:
            return merge({}, state, {nuevo: action.partido});
      case REQUEST_CREATE_PARTIDO:
            return Object.assign({}, state, {
                isCreating: true,
                error: "",
            });
        case SUCCESS_CREATE_PARTIDO:
            return Object.assign({}, state, {
                isCreating: false,
                lastUpdated: action.receivedAt,
                error: "",
            });
        case ERROR_CREATE_PARTIDO:
            return Object.assign({}, state, {
                isCreating: false,
                error: action.error,
            });
        case RESET_CREATE_PARTIDO:
            return Object.assign({}, state, {
                isCreating: false,
                nuevo: {},
                error: "",
            });
        case RESET_PARTIDOS:
            return Object.assign({}, state, {
                isCreating: false,
                nuevo: {},
                error: "",
            });

        default:
            return state
    }
}

function update(state = {
    isUpdating: false,
    activo: {},
    error: ""
}, action) {
    switch (action.type) {
        case UPDATE_PARTIDO:
            return merge({}, state, {activo: action.partido});
        case REQUEST_UPDATE_PARTIDO:
            return Object.assign({}, state, {
                isUpdating: true
            });
        case SUCCESS_UPDATE_PARTIDO:
            return Object.assign({}, state, {
                isUpdating: false,
                lastUpdated: action.receivedAt
            });
        case ERROR_UPDATE_PARTIDO:
            return Object.assign({}, state, {
                isUpdating: false,
                error: action.error
            });
        case RESET_UPDATE_PARTIDO:
            return Object.assign({}, state, {
                isUpdating: false,
                activo: {},
                error: ""
            });
        case RESET_PARTIDOS:
            return Object.assign({}, state, {
                isFetching: false,
                activo: {},
                error: null
            });
        default:
            return state
    }
}

const partidos = combineReducers({
    byId: partidosById,
    allIds: allPartidos,
    create: create,
    update: update,
});


export default partidos;