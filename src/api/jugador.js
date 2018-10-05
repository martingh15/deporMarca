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
            },
            dataType: 'json'
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
            },
            // cache: false,
            dataType: 'json',
            body: JSON.stringify(jugador)
        };

        return fetch(c.BASE_URL + '/jugadores/' + jugador.id, defaultOptions);
    }

};

export default jugadores;