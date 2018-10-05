import React, {Component} from "react";
import {connect} from 'react-redux';

import { Row, Col, Table, Button, Glyphicon } from 'react-bootstrap';
import {Link} from "react-router-dom";
import history from "../../history";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {invalidateJugadores, fetchJugadoresIfNeeded, createJugador, updateJugador} from "../../actions/jugadorActions";

//Moment
var moment = require('moment');

class Jugador extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.invalidateJugadores();
        this.props.fetchJugadoresIfNeeded();        
    }


    componentWillUnmount() {
    }

    updateJugador(jugador) {
        this.props.updateJugador(jugador);
    }

    creteJugadorNuevo() {
        history.push("/jugador/new/1");
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
                    <Link to={"jugador/edit/"+jugador.id}>
                        <Button title="Modificar Jugador" bsSize="xs" bsStyle="info"
                            onClick={() => this.updateJugador(jugador)}>
                            <Glyphicon glyph="pencil" style={{paddingTop: "2px"}}/>
                        </Button>
                    </Link>
                </td>
            </tr>
            );
        });
        return (
            <div>
                
                <Row>                    
                    <Col xs={12}  sm={12} md={8} lg={8} mdOffset={2}>
                            <Link to="/jugador/new/1">
                                <Button bsStyle="primary" bsSize="large" className="botonAgregar">
                                    Agregar jugador
                                </Button>
                            </Link>
                            <Table className="tablaReact" responsive>
                                <thead className="tableHead">
                                    <tr>
                                        <th style={{width:"100px"}}>Número de camiseta</th>
                                        <th>Nombre</th>
                                        <th>Posicion</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Partidos Jugados</th>
                                        <th>Goles</th>
                                        <th>Editar</th>
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
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps,mapDispatchToProps)(Jugador);
