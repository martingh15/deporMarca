import {combineReducers} from 'redux';
import merge from 'lodash/merge';
import union from 'lodash/union';

//Actions
import {
    REQUEST_JUGADORES, RECEIVE_JUGADORES, INVALIDATE_JUGADORES, ERROR_JUGADORES,
    RESET_JUGADORES, RESET_UPDATE_JUGADORES, CREATE_JUGADOR, REQUEST_CREATE_JUGADORES,
    SUCCESS_CREATE_JUGADOR, ERROR_CREATE_JUGADOR, REQUEST_CREATE_JUGADOR, RESET_CREATE_JUGADOR,
    UPDATE_JUGADOR, REQUEST_UPDATE_JUGADOR, SUCCESS_UPDATE_JUGADOR, ERROR_UPDATE_JUGADOR,
    RESET_UPDATE_JUGADOR, REQUEST_JUGADOR, RECEIVE_JUGADOR, INVALIDATE_JUGADOR, ERROR_JUGADOR,
    RESET_JUGADOR, REQUEST_DELETE_JUGADOR, SUCCESS_DELETE_JUGADOR, ERROR_DELETE_JUGADOR,
    RESET_DELETE_JUGADOR
} from "../actions/jugadorActions";

function jugadoresById(state = {
    isFetching: false,
    didInvalidate: true,
    jugadores: {},
}, action) {
    switch (action.type) {
        case INVALIDATE_JUGADORES:
            return Object.assign({}, state, {
                didInvalidate: true,
                error: "",
            });
        case REQUEST_JUGADORES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                error: "",
            });
        case RECEIVE_JUGADORES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                jugadores: merge({}, state.jugadores, action.jugadores.entities.jugadores),
                total: action.total,
                lastUpdated: action.receivedAt,
                error: "",
            });
        case ERROR_JUGADORES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                error: action.error
            });
        case RESET_JUGADORES:
            return Object.assign({}, state, {
                isFetching: false,
                jugadores: {},
                error: "",
            });
        default:
            return state
    }
}


function allJugadores(state = [], action) {
    switch (action.type) {
        case RECEIVE_JUGADORES:
            return union(state, action.jugadores.result);
        case RESET_JUGADORES:
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
        case CREATE_JUGADOR:
            return merge({}, state, {nuevo: action.jugador});
        case REQUEST_CREATE_JUGADOR:
            return Object.assign({}, state, {
                isCreating: true,
                error: "",
            });
        case SUCCESS_CREATE_JUGADOR:
            return Object.assign({}, state, {
                isCreating: false,
                lastUpdated: action.receivedAt,
                error: "",
            });
        case ERROR_CREATE_JUGADOR:
            return Object.assign({}, state, {
                isCreating: false,
                error: action.error,
            });
        case RESET_CREATE_JUGADOR:
            return Object.assign({}, state, {
                isCreating: false,
                nuevo: {},
                error: "",
            });
        case RESET_JUGADORES:
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
    error: "",
    isFetchingUpdate: false,
}, action) {
    switch (action.type) {
        case UPDATE_JUGADOR:
            return merge({}, state, {activo: action.jugador});
        case REQUEST_UPDATE_JUGADOR:
            return Object.assign({}, state, {
                isUpdating: true
            });
        case SUCCESS_UPDATE_JUGADOR:
            return Object.assign({}, state, {
                isUpdating: false,
                lastUpdated: action.receivedAt
            });
        case ERROR_UPDATE_JUGADOR:
            return Object.assign({}, state, {
                isUpdating: false,
                error: action.error
            });
        case RESET_UPDATE_JUGADOR:
            return Object.assign({}, state, {
                isUpdating: false,
                activo: {},
                error: ""
            });
        case RESET_JUGADORES:
            return Object.assign({}, state, {
                isFetching: false,
                activo: {},
                error: null
            });
        //Fetch activo
        case INVALIDATE_JUGADOR:
            return Object.assign({}, state, {
                didInvalidate: true,
                error: "",
            });
        case REQUEST_JUGADOR:
            return Object.assign({}, state, {
                isFetchingUpdate: true,
                didInvalidate: false,
                error: "",
            });
        case RECEIVE_JUGADOR:

            return Object.assign({}, state, {
                isFetchingUpdate: false,
                didInvalidate: false,
                error: "",
                activo: merge({}, state.jugador, action.jugador),

            });
        case ERROR_JUGADOR:
            return Object.assign({}, state, {
                isFetchingUpdate: false,
                didInvalidate: true,
                error: action.error
            });
        case RESET_JUGADOR:
            return Object.assign({}, state, {
                isFetchingUpdate: false,
                activo: {},
                error: "",
            });
        default:
            return state
    }
}

function deleteJ(state = {
    isDeleting: false,
    delete: [],
    error: ""
}, action) {
    switch (action.type) {
        case REQUEST_DELETE_JUGADOR:
            return Object.assign({}, state, {
                isDeleting: true,
                error: "",
            });
        case SUCCESS_DELETE_JUGADOR:
            return Object.assign({}, state, {
                isDeleting: false,
                lastUpdated: action.receivedAt,
                error: ""
            });
        case ERROR_DELETE_JUGADOR:
            return Object.assign({}, state, {
                isDeleting: false,
                error: action.error
            });
        case RESET_DELETE_JUGADOR:
            return Object.assign({}, state, {
                isDeleting: false,
                delete: [],
                error: ""
            });
        default:
            return state
    }
}

const jugadores = combineReducers({
    byId: jugadoresById,
    allIds: allJugadores,
    create: create,
    update: update,
    delete: deleteJ,
});


export default jugadores;