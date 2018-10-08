import React, {Component} from "react";
import {connect} from 'react-redux';

import {Row, Col, Table, Button, Glyphicon} from 'react-bootstrap';
import SweetAlert from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";
import history from "../../history";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {invalidateJugadores, fetchJugadoresIfNeeded, createJugador, updateJugador, saveDeleteJugador, resetJugadores} from "../../actions/jugadorActions";

//Moment
var moment = require('moment');

class Jugador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrar: false,
            camisetaMercenaria: 0,
        };
    }

    componentDidMount() {
        this.props.invalidateJugadores();
        this.props.fetchJugadoresIfNeeded();
    }


    componentDidUpdate(prevProps) {
        if(prevProps.jugadores.delete.isDeleting != this.props.jugadores.delete.isDeleting && !this.props.jugadores.delete.isDeleting) {
            this.props.resetJugadores();
            this.props.invalidateJugadores();
            this.props.fetchJugadoresIfNeeded();
        }
    }

    updateJugador(jugador) {
        this.props.updateJugador(jugador);
    }

    render() {
        const {} = this.state;

        var Jugadores = [];
        this.props.jugadores.allIds.map((idJugador) => {
            var jugador = this.props.jugadores.byId.jugadores[idJugador];
            console.log(jugador);
            Jugadores.push(
                <tr key={jugador.nro_camiseta} className="columnaJugadores">
                    <td>{jugador.nro_camiseta}</td>
                    <td>{jugador.nombre}</td>
                    <td>{jugador.posicion}</td>
                    <td>{jugador.fecha_nacimiento}</td>
                    <td>{jugador.cantidad_asistencias}</td>
                    <td>{jugador.cantidad_goles}</td>
                    <td>
                        <Button title="Modificar Jugador" bsSize="xs" bsStyle="info"
                                disabled={!this.props.authentication.token}
                                onClick={() => {
                                    if(this.props.authentication.token) {
                                        this.updateJugador(jugador);
                                        history.push("jugador/edit/"+jugador.nro_camiseta);
                                    }
                                }}>
                            <Glyphicon glyph="pencil" style={{paddingTop: "2px"}}/>
                        </Button>
                    </td>
                    <td>
                        <Button title="Borrar Jugador" bsSize="xs" bsStyle="info"
                                disabled={!this.props.authentication.token}
                                onClick={() => {
                                    this.setState({mostrar: true, camisetaMercenaria: jugador.nro_camiseta});
                                }}>
                            <Glyphicon glyph="remove" style={{paddingTop: "2px"}}/>
                        </Button>
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <SweetAlert info
                            showCancel
                            confirmBtnText="Si"
                            cancelBtnText="No"
                            confirmBtnBsStyle="success"
                            cancelBtnBsStyle="default"
                            title="Borrar jugador"
                            onConfirm={() => {
                                this.props.saveDeleteJugador(this.state.camisetaMercenaria);
                                this.setState({mostrar: false});
                            }}
                            onCancel={() => {
                                this.setState({mostrar: false})
                            }}
                            show={this.state.mostrar}>
                    ¿Realmente desea borrar el jugador?
                </SweetAlert>
                <Row>
                    <Col xs={12} sm={12} md={8} lg={8} mdOffset={2}>
                        <Link to="/jugador/new">
                            <Button bsStyle="primary" bsSize="large" className="botonAgregar">
                                Agregar jugador
                            </Button>
                        </Link>
                        <Table className="tablaReact" responsive>
                            <thead className="tableHead">
                            <tr>
                                <th style={{width: "100px"}}>Número de camiseta</th>
                                <th>Nombre</th>
                                <th>Posicion</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Partidos Jugados</th>
                                <th>Goles</th>
                                <th>Editar</th>
                                <th>Borrar</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Jugadores}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        jugadores: state.jugadores,
        authentication: state.authentication,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchJugadoresIfNeeded: () => {
            dispatch(fetchJugadoresIfNeeded())
        },
        createJugador: (jugador) => {
            dispatch(createJugador(jugador))
        },
        updateJugador: (jugador) => {
            dispatch(updateJugador(jugador))
        },
        invalidateJugadores: () => {
            dispatch(invalidateJugadores())
        },
        saveDeleteJugador: (nro_camiseta) => {
            dispatch(saveDeleteJugador(nro_camiseta))
        },
        resetJugadores: () => {
            dispatch(resetJugadores())
        },
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Jugador);
