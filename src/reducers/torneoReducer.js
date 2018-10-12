import {combineReducers} from 'redux';
import merge from 'lodash/merge';
import union from 'lodash/union';

//Actions
import {REQUEST_TORNEOS, RECEIVE_TORNEOS, INVALIDATE_TORNEOS, ERROR_TORNEOS,
    RESET_TORNEOS,CREATE_TORNEO,
    SUCCESS_CREATE_TORNEO, ERROR_CREATE_TORNEO, REQUEST_CREATE_TORNEO, RESET_CREATE_TORNEO,
    UPDATE_TORNEO, REQUEST_UPDATE_TORNEO, SUCCESS_UPDATE_TORNEO, ERROR_UPDATE_TORNEO,
    RESET_UPDATE_TORNEO, REQUEST_TORNEO, RECEIVE_TORNEO, INVALIDATE_TORNEO, ERROR_TORNEO, RESET_TORNEO } from "../actions/torneoActions";
import {normalizeDatos, normalizeDato} from "../normalizers/normalizeTorneos";

function torneosById(state = {
    isFetching: false,
    didInvalidate: true,
    torneos: {},
}, action) {
    switch (action.type) {
        case INVALIDATE_TORNEOS:
            return Object.assign({}, state, {
                didInvalidate: true,
                error: "",
            });
        case REQUEST_TORNEOS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                error: "",
            });
        case RECEIVE_TORNEOS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                torneos: merge({}, state.torneos, normalizeDatos(action.torneos).entities.torneos),
                total: action.total,
                lastUpdated: action.receivedAt,
                error: "",
            });
        case ERROR_TORNEOS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                error: action.error
            });
        case RESET_TORNEOS:
            return Object.assign({}, state, {
                isFetching: false,
                torneos: {},
                error: "",
            });
        default:
            return state
    }
}


function allTorneos(state = [], action) {
    switch (action.type) {
        case RECEIVE_TORNEOS:
            return union(state, normalizeDatos(action.torneos).result);
        case RESET_TORNEOS:
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
        case CREATE_TORNEO:
            return merge({}, state, {nuevo: action.torneo});
        case REQUEST_CREATE_TORNEO:
            return Object.assign({}, state, {
                isCreating: true,
                error: "",
            });
        case SUCCESS_CREATE_TORNEO:
            return Object.assign({}, state, {
                isCreating: false,
                lastUpdated: action.receivedAt,
                error: "",
            });
        case ERROR_CREATE_TORNEO:
            return Object.assign({}, state, {
                isCreating: false,
                error: action.error,
            });
        case RESET_CREATE_TORNEO:
            return Object.assign({}, state, {
                isCreating: false,
                nuevo: {},
                error: "",
            });
        case RESET_TORNEOS:
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
    isFetchingActivo: false,
    didInvalidateActivo: true,
    activo: {},
    error: ""
}, action) {
    switch (action.type) {
        case UPDATE_TORNEO:
            return merge({}, state, {activo: action.torneo});
        case REQUEST_UPDATE_TORNEO:
            return Object.assign({}, state, {
                isUpdating: true
            });
        case SUCCESS_UPDATE_TORNEO:
            return Object.assign({}, state, {
                isUpdating: false,
                lastUpdated: action.receivedAt
            });
        case ERROR_UPDATE_TORNEO:
            return Object.assign({}, state, {
                isUpdating: false,
                error: action.error
            });
        case RESET_UPDATE_TORNEO:
            return Object.assign({}, state, {
                isUpdating: false,
                activo: {},
                error: ""
            });
        case RESET_TORNEOS:
            return Object.assign({}, state, {
                isFetching: false,
                activo: {},
                error: null
            });
        //Fetch torneo activo
        case REQUEST_TORNEO:
            return Object.assign({}, state, {
                isFetchingActivo: true,
                didInvalidateActivo: false,
                error: "",
            });
        case RECEIVE_TORNEO:
            return Object.assign({}, state, {
                isFetchingActivo: false,
                didInvalidateActivo: false,
                activo: action.torneo.entities.torneo[action.torneo.result],
                error: "",
            });
        case ERROR_TORNEO:
            return Object.assign({}, state, {
                isFetchingActivo: false,
                didInvalidateActivo: true,
                error: action.error
            });
        case RESET_TORNEO:
            return Object.assign({}, state, {
                isFetchingActivo: false,
                activo: {},
                error: "",
            });
        default:
            return state
    }
}

const torneos = combineReducers({
    byId: torneosById,
    allIds: allTorneos,
    create: create,
    update: update,
});


export default torneos;