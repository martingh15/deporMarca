import React, {Component} from "react";
import {connect} from 'react-redux';

import { Row, Col, Table, Button, Glyphicon } from 'react-bootstrap';
import {Link} from "react-router-dom";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {updatePartido, fetchPartidosIfNeeded, invalidatePartidos} from "../../actions/partidoActions";

//Moment
var moment = require('moment');

class Partido extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.invalidatePartidos();
        this.props.fetchPartidosIfNeeded();      
    }


    componentWillUnmount() {
    }

    updatePartido(partido) {
        this.props.updatePartido(partido);
    }

    render() {
        const {} = this.state;

        var Partidos = [];
        this.props.partidos.allIds.map((idPartido) => {
             
            var partido = this.props.partidos.byId.partidos[idPartido];
            Partidos.push(
                <tr key={partido.id} className="columnaPartidos">
                    <td>{partido.id}</td>
                    <td>{partido.descripcion}</td>
                    <td>{partido.rival}</td>
                    <td>{partido.fecha}</td>
                    <td>{partido.goles_a_favor} - {partido.goles_en_contra}</td>
                    <td>button</td>
                    <td>
                        <Link to={"partido/edit/"+idPartido}>
                            <Button title="Modificar Partido" bsSize="xs" bsStyle="info"
                                onClick={() => this.updatePartido(partido)}>
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
                    <Col xs={8} lg={8} xsOffset={2}>
                        <div className="bordeTabla">
                            <Table className="tablaReact">
                                <thead className="tableHead">
                                    <tr>   
                                        <th style={{width:"100px"}}>Numero de Partido</th>
                                        <th>Descripcion</th>
                                        <th>Rival</th>
                                        <th>Fecha</th>
                                        <th>Resultado</th>
                                        <th>Ver partido</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Partidos}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        partidos: state.partidos,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePartido: (partido) => {
            dispatch(updatePartido(partido))
        },
        fetchPartidosIfNeeded: () => {
            dispatch(fetchPartidosIfNeeded())
        },
        invalidatePartidos: () => {
            dispatch(invalidatePartidos())
        },
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps,mapDispatchToProps)(Partido);
