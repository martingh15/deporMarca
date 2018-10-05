import React, {Component} from "react";
import {connect} from 'react-redux';

import { Col, Row, FormControl, ControlLabel, Button } from 'react-bootstrap';
// import {Link} from "react-router-dom";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {createJugador, updateJugador, saveUpdateJugador, saveCreateJugador} from "../../actions/jugadorActions";

//Moment
var moment = require('moment');

class JugadorAM extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }


    componentWillUnmount() {
    }

    changeJugador(e) {
        var cambio = {};
        cambio[e.target.id] = e.target.value;
        var tipoOperacion = this.props.match.params.modo;
        if (tipoOperacion === "new") {
            this.props.createJugador(cambio);
        } else if(tipoOperacion === "edit") {
            this.props.updateJugador(cambio);
        }
    }

    submitJugador(e) {
        e.preventDefault();
        var tipoOperacion = this.props.match.params.modo;
        if (tipoOperacion === "new") {
            this.props.saveCreateJugador(this.props.jugadores.create.nuevo);
        } else {
            this.props.saveUpdateJugador(this.props.jugadores.update.activo);
        }
    }

    render() {
        const {} = this.state;
        var jugador = {};
        if(this.props.match.params.modo === "edit") {
            jugador = this.props.jugadores.update.activo;
        } else if (this.props.match.params.modo === "new") {
            jugador = this.props.jugadores.create.nuevo;
        }
        return (
            <div className="jugadorAM">
                <h2>{(this.props.match.params.modo === "edit" ? "Modificacion" : "Alta") + " de Jugador"}</h2>
                <br/>
                <div className="container-fluid contenido" style={{backgroundColor:"white"}}>
                    <Col xs={12}>
                        <form onSubmit={(e) => this.submitJugador(e)}>
                            <Row>
                                <Col lg={4}>
                                    <ControlLabel>Numero de camiseta</ControlLabel>
                                    <FormControl
                                        id="nro_camiseta"
                                        type="number"
                                        placeholder="Numero de Camiseta"
                                        value = {jugador ? jugador.nro_camiseta : ""}
                                        onChange = {(e) => this.changeJugador(e)}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <ControlLabel>Nombre</ControlLabel>
                                    <FormControl
                                        id="nombre"
                                        type="text"
                                        placeholder="Nombre"
                                        value={jugador ? jugador.nombre : ""}
                                        onChange = {(e) => this.changeJugador(e)}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <ControlLabel>Posición</ControlLabel>
                                    <FormControl
                                        componentClass="select"
                                        placeholder="select"
                                        value = {jugador ? jugador.posicion: ""}
                                        id="posicion"
                                        onChange = {(e) => this.changeJugador(e)}>
                                        <option value="">Seleccione posición</option>
                                        <option value="Arquero">Arquero</option>
                                        <option value="Defensor">Defensor</option>
                                        <option value="Mediocampista">Mediocampista</option>
                                        <option value="Delantero">Delantero</option>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                <br/>
                                <ControlLabel>Fecha de Nacimiento</ControlLabel>
                                    <FormControl
                                        id="fecha_nacimiento"
                                        type="date"
                                        placeholder="Fecha de Nacimiento"
                                        value={jugador.fecha_nacimiento ? jugador.fecha_nacimiento  : ""}
                                        onChange = {(e) => this.changeJugador(e)}
                                    />
                                </Col>
                                <Button bsStyle="primary" bsSize="large" type="submit">
                                    {this.props.match.params.modo == 'edit' ? 'Editar' : 'Agregar'}
                                </Button>
                            </Row>
                        </form>

                    </Col>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        jugadores: state.jugadores,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchJugadoresIfNeeded: () => {
        //     dispatch(fetchJugadoresIfNeeded())
        // },
        updateJugador: (jugador) => {
            dispatch(updateJugador(jugador))
        },
        createJugador: (jugador) => {
            dispatch(createJugador(jugador))
        },
        saveUpdateJugador:(jugador) => {
            dispatch(saveUpdateJugador(jugador))
        },
        saveCreateJugador:(jugador) => {
            dispatch(saveCreateJugador(jugador))
        },
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps,mapDispatchToProps)(JugadorAM);
