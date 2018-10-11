import React, {Component} from "react";
import {connect} from 'react-redux';

import {Row, Col, Table, Button, Glyphicon} from 'react-bootstrap';
import {Link} from "react-router-dom";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {fetchTorneosIfNeeded} from "../../actions/torneoActions";
import history from "../../history";

//Constants
import * as lugares from "../../constants/Lugares";

//Moment
var moment = require('moment');

class Torneos extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchTorneosIfNeeded();
    }


    componentWillUnmount() {
    }


    render() {
        const {} = this.state;

        var Torneos = [];
        this.props.torneos.allIds.map((idTorneo) => {
            var torneo = this.props.torneos.byId.torneos[idTorneo];


            var DatosTorneo = [];
            var cantPJ = 0;
            var cantPG = 0;
            var cantPE = 0;
            var cantPP = 0;
            var golesAFavor = 0;
            var golesEnContra = 0;
            var puntos = 0;
            torneo.partido.map((idPartido) => {
                var partido = this.props.partidos.byId.partidos[idPartido];
                if (partido.idTorneo == idTorneo) {
                    if (partido.goles_a_favor > partido.goles_en_contra) {
                        cantPG++;
                        if (torneo.lugar == lugares.STELLA)
                            puntos += 3;
                        else if(torneo.lugar == lugares.LOS_ARROYOS)
                            puntos += 2;
                    }
                    else if (partido.goles_a_favor == partido.goles_en_contra) {
                        cantPE++;
                        puntos += 1;
                    }
                    else if (partido.goles_a_favor > partido.goles_en_contra)
                        cantPP++;
                    cantPJ++;
                    golesAFavor += partido.goles_a_favor;
                    golesEnContra += partido.goles_en_contra;
                }
            });
            DatosTorneo.push(
                <tr key={torneo.id} className="columnaJugadores">
                    <td>{puntos}</td>
                    <td>{cantPJ}</td>
                    <td>{cantPG}</td>
                    <td>{cantPE}</td>
                    <td>{cantPP}</td>
                    <td>{golesAFavor}</td>
                    <td>{golesEnContra}</td>
                    <td>{golesAFavor - golesEnContra}</td>
                </tr>
            );

            Torneos.push(
                <div className="contenedorTorneo" onClick={()=> history.push("/torneos/"+torneo.id)}>
                    <p>Fecha: {moment(torneo.fechaTorneo).format("DD/MM/YYYY")}</p>
                    <p>Lugar: {torneo.lugar}</p>
                    <b>{torneo.descripcionTorneo}</b>
                    <Table className="tablaReact" responsive>
                        <thead className="tableHead">
                        <tr>
                            <th>Puntos</th>
                            <th>PJ</th>
                            <th>PG</th>
                            <th>PE</th>
                            <th>PP</th>
                            <th>GF</th>
                            <th>GE</th>
                            <th>Dif</th>
                        </tr>
                        </thead>
                        <tbody>
                        {DatosTorneo}
                        </tbody>
                    </Table>
                </div>
            );
        });


        return (
            <div className="torneos">
                <Col lg={10} lgOffset={1}>
                    <Row>
                        <Link to="/torneo/new">
                            <Button bsStyle="primary" bsSize="large" className="botonAgregar">
                                Agregar torneo
                            </Button>
                        </Link>
                    </Row>
                    <Row>
                        {Torneos}
                    </Row>
                </Col>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        torneos: state.torneos,
        partidos: state.partidos,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTorneosIfNeeded: () => {
            dispatch(fetchTorneosIfNeeded())
        },
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Torneos);
