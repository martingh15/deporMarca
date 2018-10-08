import {combineReducers} from 'redux';
import merge from "lodash/merge";

//Actions
import {
    CREATE_USUARIO,
    REQUEST_CREATE_USUARIO,
    SUCCESS_CREATE_USUARIO,
    ERROR_CREATE_USUARIO,
    RESET_CREATE_USUARIO
} from "../actions/usuarioActions";
import {
    UPDATE_USUARIOLOGUEADO,
    REQUEST_UPDATE_USUARIOLOGUEADO,
    SUCCESS_UPDATE_USUARIOLOGUEADO,
    ERROR_UPDATE_USUARIOLOGUEADO,
    RESET_UPDATE_USUARIOLOGUEADO
} from "../actions/usuarioActions";
import {LOGOUT_SUCCESS} from "../actions/AuthenticationActions";


function usuariosById(state = {
    didInvalidate: true,
    isFetchingUsuarioLogueado: false,
    usuarioLogueado: {},
    usuarios: []
}, action) {
    switch (action.type) {
        case CREATE_USUARIO:
            return Object.assign({}, state, {
                isFetchingUsuarioLogueado: false,
                usuarioLogueado: merge({}, state.usuarioLogueado, action.usuario)
            });
        default:
            return state
    }
}

function create(state = {
    isCreating: false,
    usuarioNuevo: false,
    error: ""
}, action) {
    switch (action.type) {
        case CREATE_USUARIO:
            return Object.assign({}, state, {
                isCreating: false,
                usuarioNuevo: true,
                error: null,
            });
        case REQUEST_CREATE_USUARIO:
            return Object.assign({}, state, {
                isCreating: true,
                error: null,
            });
        case SUCCESS_CREATE_USUARIO:
            return Object.assign({}, state, {
                isCreating: false,
                usuarioNuevo: false,
                error: null,
            });
        case ERROR_CREATE_USUARIO:
            return Object.assign({}, state, {
                isCreating: false,
                error: action.error
            });
        case RESET_CREATE_USUARIO:
            return Object.assign({}, state, {
                isCreating: false,
                error: null,
                usuarioNuevo: false
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isCreating: false,
                usuarioNuevo: false,
                error: ""
            });
        default:
            return state
    }
}

function update(state = {
    isUpdating: false,
    usuarioModificado: false,
    activo: {},
    error: ""
}, action) {
    switch (action.type) {
        case UPDATE_USUARIOLOGUEADO:
            return Object.assign({}, state, {
                isUpdating: false,
                usuarioModificado: true,
                error: null
            });
        case REQUEST_UPDATE_USUARIOLOGUEADO:
            return Object.assign({}, state, {
                isUpdating: true,
                error: null
            });
        case SUCCESS_UPDATE_USUARIOLOGUEADO:
            return Object.assign({}, state, {
                isUpdating: false,
                usuarioModificado: false,
                error: null
            });
        case ERROR_UPDATE_USUARIOLOGUEADO:
            return Object.assign({}, state, {
                isUpdating: false,
                error: action.error
            });
        case RESET_UPDATE_USUARIOLOGUEADO:
            return Object.assign({}, state, {
                isUpdating: false,
                error: null,
                usuarioModificado: false,
            });
        default:
            return state
    }
}

function usuariosAllIds(state = [], action) {
    switch (action.type) {
//        case RECEIVE_USUARIOS:
  //          return action.usuarios.result ? action.usuarios.result : [];
        case LOGOUT_SUCCESS:
            return [];
        default:
            return state
    }
}


const usuarios = combineReducers({
    allIds: usuariosAllIds,
    byId: usuariosById,
    create: create,
    update: update,
});

export default usuarios;