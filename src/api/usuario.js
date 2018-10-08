import c from "../constants/Constants";
// require('es6-promise').polyfill();
require('isomorphic-fetch');

var usuario = {

    getLogueado() {
        let defaultOptions = {
            url: '',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
        };
        return fetch(c.BASE_URL + '/usuarios/create', defaultOptions);
    },

    getUsuario(dni) {
        let defaultOptions = {
            url: '',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            // cache: false,
            dataType: 'json',
        };
        return fetch(c.BASE_URL + '/usuarios/evento/' + dni, defaultOptions);
    },

    saveCreate(usuario) {

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
            body: JSON.stringify(usuario)
        };

        return fetch(c.BASE_URL + '/usuarios', defaultOptions);
    },

    saveUpdate(usuario) {

        let defaultOptions = {
            url: '',
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
            body: JSON.stringify(usuario)
        };

        return fetch(c.BASE_URL + '/usuarios/' + usuario.id, defaultOptions);
    },
    getUsuariosByCuenta(idCuenta) {
        let defaultOptions = {
            url: '',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
        };
        return fetch(c.BASE_URL + '/usuarios/' + idCuenta, defaultOptions);
    }

};

export default usuario;