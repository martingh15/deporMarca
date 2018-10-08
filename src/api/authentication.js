import jwt_decode from "jwt-decode";
import c from "../constants/Constants";
// require('es6-promise').polyfill();
require('isomorphic-fetch');


/**
 * Authentication lib
 * @type {Object}
 */
var auth = {
    /**
     * Logs a user in
     * @param  {string}   username The username of the user
     * @param  {string}   password The password of the user
     * @param  {Function} callback Called after a user was logged in on the remote server
     */
    login(usuario, callback) {
        // If there is a token in the localStorage, the user already is
        // authenticated
        if (this.loggedIn()) {
            callback(true);
            return;
        }

        let defaultOptions = {
            url:'',
            method:'POST',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(usuario),
            // cache: false,
            dataType: 'json',
        };

        fetch(c.BASE_URL + '/loginWeb', defaultOptions)
            .then(function(response) {
                if (response.status >= 400) {
                    //callback(false, response);
                    return Promise.reject(response);
                }
                else {

                    var data = response.json();

                    return data;
                }
            })
            .then(function(data) {
                localStorage.token = data.token;
                callback(true);
            })
            .catch(function (error) {
                callback(false, error);
            });
    },
    /**
     * Logs the current user out
     */
    logout(callback) {
        localStorage.removeItem('token');
        callback(true);
        /*request.post('/logout', {}, () => {
         callback(true);
         });*/
    },
    /**
     * Checks if anybody is logged in
     * @return {boolean} True if there is a logged in user, false if there isn't
     */
    loggedIn() {
        console.log('logueado?',!!localStorage.token);
        return !!localStorage.token;
    },

    rol() {
        if(localStorage.token)
            return jwt_decode(localStorage.token).rol;
    },
    nombreUsuario() {
        if(localStorage.token)
            return jwt_decode(localStorage.token).nombre;
    },
    idUsuario() {
        if(localStorage.token){
            return jwt_decode(localStorage.token).idUsuario;
        }
    },
    olvideMiPassword(usuario, callback) {
        // If there is a token in the localStorage, the user already is
        // authenticated
        if (this.loggedIn()) {
            callback(true);
            return;
        }

        let defaultOptions = {
            url:'',
            method:'POST',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({nombreUsuario:usuario}),
            // cache: false,
            dataType: 'json',
        };
        fetch(c.BASE_URL + '/olvideMiPassword', defaultOptions)
            .then(function(response) {
                if (response.status >= 400) {
                    //callback(false, response);
                    return Promise.reject(response);
                }
                else {
                    callback(true);
                }
            })
            .catch(function (error) {
                callback(false, error);
            });
    },
    resetPassword(usuario, callback) {
        // If there is a token in the localStorage, the user already is
        // authenticated
        if (this.loggedIn()) {
            callback(true);
            return;
        }

        let defaultOptions = {
            url:'',
            method:'POST',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(usuario),
            // cache: false,
            dataType: 'json',
        };
        fetch(c.BASE_URL + '/resetPassword', defaultOptions)
            .then(function(response) {
                if (response.status >= 400) {
                    //callback(false, response);
                    return Promise.reject(response);
                }
                else {
                    callback(true);
                }
            })
            .catch(function (error) {
                callback(false, error);
            });
    },
    validarToken(token, callback) {
        // If there is a token in the localStorage, the user already is
        // authenticated
        if (this.loggedIn()) {
            callback(true);
            return;
        }

        let defaultOptions = {
            url:'',
            method:'POST',
            mode: 'cors',
            headers:{
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({tokenReset:token}),
            // cache: false,
            dataType: 'json',
        };
        fetch(c.BASE_URL + '/validarToken', defaultOptions)
            .then(function(response) {
                if (response.status >= 400) {
                    //callback(false, response);
                    return Promise.reject(response);
                }
                else {
                    callback(true);
                }
            })
            .catch(function (error) {
                callback(false, error);
            });
    },
};

export default auth;
