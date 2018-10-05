import { combineReducers } from 'redux';
import jugadores from "./jugadorReducer"
import partidos from "./partidoReducer";
import authentication from "./authentication";


export default combineReducers({
    jugadores,
    partidos,
    authentication,
});
