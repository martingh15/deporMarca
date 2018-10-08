import React, {Component} from "react";
import {connect} from 'react-redux';

import {Navbar, Nav, NavItem, ControlLabel, FormControl, Col, Button} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

import history from "../../history";

//Actions
import {changeLogin, login, olvideMiPassword, resetLogin} from "../../actions/AuthenticationActions";

//CSS
import "../../assets/css/estiloMarca.css";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    componentWillUnmount() {
    }

    onChangeLogin(e) {
        var cambio = {};
        cambio[e.target.id] = e.target.value;
        this.props.changeLogin(cambio);
    }

    submitLogin(e) {
        e.preventDefault();
        this.props.login(this.props.authentication.usuario);
    }

    render() {
        const {} = this.state;
        var usuario = {};
        return (
            <div className="login">
                <Col xs={6} lgOffset={3}>
                    <form onSubmit={(e) => {
                        this.submitLogin(e)
                    }}>
                        <ControlLabel>Nombre de Usuario</ControlLabel>
                        <FormControl
                            id="nombreUsuario"
                            type="text"
                            required={true}
                            placeholder="Nombre de usuario"
                            value={usuario ? usuario.nombreUsuario : ""}
                            onChange={(e) => this.onChangeLogin(e)}
                        />
                        <ControlLabel>Contraseña</ControlLabel>
                        <FormControl
                            id="password"
                            type="password"
                            required={true}
                            placeholder="Contraseña"
                            value={usuario ? usuario.password : ""}
                            onChange={(e) => this.onChangeLogin(e)}
                        />
                        <div className="botonesLogin">
                            <Button className="entrar" bsStyle="primary" bsSize="large" type="submit">
                                Entrar
                            </Button>
                            <Button className="registrarse" bsStyle="primary" bsSize="large" type="submit"
                                    onClick={() => history.push('/registro')}>
                                Registrarse
                            </Button>
                        </div>
                    </form>
                </Col>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
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
        }
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
