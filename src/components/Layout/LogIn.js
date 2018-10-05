import React, {Component} from "react";
import {connect} from 'react-redux';

import {Navbar, Nav, NavItem, ControlLabel, FormControl, Col, Button} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

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
            <div className="registro">
                <Col xs={6} lgOffset={3}>
                    <form onSubmit={(e) => {
                        this.submitLogin(e)
                    }}>
                        <ControlLabel>Nombre de Usuario</ControlLabel>
                        <FormControl
                            id="email"
                            type="text"
                            placeholder="Nombre de usuario"
                            value={usuario ? usuario.email : ""}
                            onChange={(e) => this.onChangeLogin(e)}
                        />
                        <ControlLabel>Contraseña</ControlLabel>
                        <FormControl
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            value={usuario ? usuario.password : ""}
                            onChange={(e) => this.onChangeLogin(e)}
                        />
                        <Button bsStyle="primary" bsSize="large" type="submit">
                            Guardar
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
        olvideMiPassword: (email) => {
            dispatch(olvideMiPassword(email))
        },
        resetLogin: () => {
            dispatch(resetLogin())
        }
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
