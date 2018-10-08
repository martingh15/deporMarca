import c from '../constants/Constants';

require('es6-promise').polyfill();
require('isomorphic-fetch');

var jugadores = {

    getAll() {
        let defaultOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer "+ localStorage.token
            },
            dataType: 'json'
        };
        return fetch(c.BASE_URL + '/allJugadores', defaultOptions);
    },
    saveCreateJugador(jugador) {
        let defaultOptions = {
            url: '',
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
            body: JSON.stringify(jugador)
        };

        return fetch(c.BASE_URL + '/jugadores', defaultOptions);
    },
    saveUpdate(jugador) {
        let defaultOptions = {
            url: '',
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;",
                'Accept': 'application/json',
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
            body: JSON.stringify(jugador)
        };

        return fetch(c.BASE_URL + '/jugadores/' + jugador.nro_camiseta, defaultOptions);
    },
    getOne(nro_camiseta) {
        let defaultOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer "+ localStorage.token
            },
            dataType: 'json'
        };
        return fetch(c.BASE_URL + '/jugador/'+nro_camiseta, defaultOptions);
    },
    saveDelete(nro_camiseta) {
        let defaultOptions = {
            url: '',
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer "+ localStorage.token
            },
            dataType: 'json'
        };

        return fetch(c.BASE_URL + '/jugadores/' + nro_camiseta, defaultOptions);
    }

};

export default jugadores;