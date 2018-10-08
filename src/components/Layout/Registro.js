import React, {Component} from "react";
import {connect} from 'react-redux';

import {Navbar, Nav, NavItem, ControlLabel, FormControl, Col, Button} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

//Actions
import {changeLogin, login, olvideMiPassword, resetLogin} from "../../actions/AuthenticationActions";
import {changeUsuarioLogueado, saveUsuarioLogueado} from "../../actions/usuarioActions";

//CSS
import "../../assets/css/estiloMarca.css";

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    componentWillUnmount() {
    }

    onChangeUsuario(e) {
        var cambio = {};
        cambio[e.target.id] = e.target.value;
        this.props.changeUsuarioLogueado(cambio);
        if (e.target.id == "password") {
            if (this.props.usuarios.byId.usuarioLogueado.confirmaPass != e.target.value) {
                this.refs.confirmaPass.setCustomValidity("Las contraseñas no coinciden");
            }
            else {
                console.log("bien");
                this.refs.confirmaPass.setCustomValidity("");
            }
        }
        if (e.target.id == "confirmaPass") {
            if (this.props.usuarios.byId.usuarioLogueado.password != e.target.value) {
                this.refs.confirmaPass.setCustomValidity("Las contraseñas no coinciden");
            }
            else {
                console.log("bien");
                this.refs.confirmaPass.setCustomValidity("");
            }
        }
    }

    submitLogin(e) {
        e.preventDefault();
        this.props.saveUsuarioLogueado();
    }

    render() {
        const {} = this.state;
        var usuario = {};
        return (
            <div className="registro">
                <Col xs={6} lgOffset={3}>
                    <form onSubmit={(e) => {
                        this.submitLogin(e)
                    }}>
                        <h1>Registrate!</h1>
                        <ControlLabel>Nombre de Usuario</ControlLabel>
                        <input
                            className="form-control"
                            id="nombreUsuario"
                            type="text"
                            required={true}
                            placeholder="Nombre de usuario"
                            value={usuario ? usuario.nombreUsuario : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                        />
                        <ControlLabel>Contraseña</ControlLabel>
                        <input
                            className="form-control"
                            id="password"
                            type="password"
                            required={true}
                            minLength="8"
                            placeholder="Contraseña"
                            value={usuario ? usuario.password : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                        />
                        <ControlLabel>Confirmar Contraseña</ControlLabel>
                        <input
                            className="form-control"
                            id="confirmaPass"
                            ref="confirmaPass"
                            minLength="8"
                            type="password"
                            required={true}
                            placeholder="Confirma Contraseña"
                            value={usuario ? usuario.confirmarPassword : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                        />
                        <Button bsStyle="primary" bsSize="large" type="submit">
                            Registrarme
                        </Button>
                    </form>
                </Col>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        usuarios: state.usuarios,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLogin: (usuario) => {
            dispatch(changeLogin(usuario))
        },
        login: (usuario) => {
            dispatch(login(usuario))
        },
        olvideMiPassword: (nombreUsuario) => {
            dispatch(olvideMiPassword(nombreUsuario))
        },
        resetLogin: () => {
            dispatch(resetLogin())
        },
        changeUsuarioLogueado: (usuario) => {
            dispatch(changeUsuarioLogueado((usuario)))
        },
        saveUsuarioLogueado: () => {
            dispatch(saveUsuarioLogueado())
        },
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Registro);
