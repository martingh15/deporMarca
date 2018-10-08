import React, {Component} from "react";
import {connect} from 'react-redux';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

import history from "../../history";

//Images
import horse from "../../assets/imgMarca/horse512.png";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {logout} from "../../actions/AuthenticationActions";

class Navegador extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    componentWillUnmount() {
    }

    render() {
        const {} = this.state;
        var usuarioLogueado = 'Martin';
        return (
            <div>
                <Navbar className="navegadorPrincipal" inverse collapseOnSelect style={{width: "100%"}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img className="imgHorse" src={horse} alt="logo" onClick={() => {
                                history.push("/")
                            }}/>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav className="menuItems">
                            <NavItem eventKey={1}>
                                <NavLink to="/jugadores">Jugadores</NavLink>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <NavLink to="/partidos">Partidos</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title={"Bienvenido " + usuarioLogueado} id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1} onClick={this.props.logout}>Cerrar sesión</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Navegador);
