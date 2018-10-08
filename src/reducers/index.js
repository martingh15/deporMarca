import { combineReducers } from 'redux';
import authentication from "./authentication";
import jugadores from "./jugadorReducer"
import partidos from "./partidoReducer";
import usuarios from "./usuarioReducer";


export default combineReducers({
    authentication,
    jugadores,
    partidos,
    usuarios,
});
