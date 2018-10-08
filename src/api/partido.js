import c from '../constants/Constants';

require('es6-promise').polyfill();
require('isomorphic-fetch');

var partidos = {

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
        return fetch(c.BASE_URL + '/allPartidos', defaultOptions);
    },

};

export default partidos;