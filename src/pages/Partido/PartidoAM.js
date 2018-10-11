import React, {Component} from "react";
import {connect} from 'react-redux';

import { Col, Row, FormControl, ControlLabel, Button  } from 'react-bootstrap';
// import {Link} from "react-router-dom";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {createPartido, updatePartido, fetchAndUpdatePartido} from "../../actions/partidoActions";
import {createJugador, updateJugador} from "../../actions/jugadorActions";

//Autosuggest
import Autosuggest from 'react-autosuggest';

//Moment
var moment = require('moment');

var parse = require('autosuggest-highlight/parse');
var match = require('autosuggest-highlight/match');

class PartidoAM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSuggestion: '',
            suggestions: this.getSuggestions(''),
            jugadorSeleccionado: '',
        };
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestionValueMostrar = this.getSuggestionValueMostrar.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let idPartido = this.props.match.params.id;
        if (this.props.match.params.modo === "edit") {
            this.props.fetchAndUpdatePartido(idPartido);
        }        
    }


    componentWillUnmount() {
    }

    changePartido(e) {
        var cambio = {};
        cambio[e.target.id] = e.target.value;
        if(e.target.id === "fecha") {
            cambio[e.target.id] = moment(e.target.value);
            cambio[e.target.id] = cambio[e.target.id].format("DD/MM/YYYY");
        }
        var tipoOperacion = this.props.match.params.modo;
        if (tipoOperacion === "new") {
            this.props.createPartido(cambio);
        } else if(tipoOperacion === "edit") {
            this.props.updatePartido(cambio);
        }
    }

    submitPartido(e) {
        e.preventDefault();
        var tipoOperacion = this.props.match.params.modo;
        // if (tipoOperacion === "new") {
        //     this.props.saveCreatePartido(this.props.partidos.create.nuevo);
        // } else {
        //     this.props.saveUpdatePartido(this.props.partidos.update.activo);
        // }

    }

    onSuggestionsFetchRequested({value}) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }
    getSuggestionValueMostrar(suggestion) {
        this.setState({jugadorSeleccionado: suggestion});
        return `${suggestion.nombre}`;
    }
    renderSuggestion(suggestion, {query, isHighlighted}) {
        const suggestionText = `${suggestion.nombre}`;
        const matches = match(suggestionText, query);
        const parts = parse(suggestionText, matches);
        return (
            <span className={'suggestion-content'}>
              <div className="nombreJugadorAutosuggest">
              {
                  parts.map((part, index) => {
                      const className = part.highlight ? 'highlight' : null;

                      return (
                          <span className={className} key={index}>{part.text}</span>

                      );
                  })
              }
              </div>
      </span>
        );
    }
    getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('\\b' + escapedValue, 'i');
        let suggestionsJugadores = [];
        return suggestionsJugadores;
    }
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    onChange(event, {newValue, method}) {
        this.setState({
            valueSuggestion: newValue,
        });
    }

    render() {
        const { valueSuggestion, suggestions } = this.state;
        var partido = {};
        if(this.props.match.params.modo === "edit") {
            partido = this.props.partidos.update.activo;
        } else if (this.props.match.params.modo === "new") {
            partido = this.props.partidos.create.nuevo;
        }
        var fecha = partido.fecha;
        var Jugadores = [];
        this.props.jugadores.allIds.map((idJugador) => {
            var jugador = this.props.jugadores.byId.jugadores[idJugador];
            Jugadores.push(
                <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 bodyTarjetaJugador" style={{marginBottom:"10px"}}>
                        <h4>{jugador.nombre}</h4>
                </div>
            );
        });
        
        return (
            <div>
                <h2>{(this.props.match.params.modo === "edit" ? "Modificacion" : "Alta") + " de Partido"}</h2>
                <br/>
                <div className="container-fluid contenido" style={{backgroundColor:"white"}}>
                    <Col xs={12}>
                        <form onSubmit={(e) => this.submitPartido(e)}>
                            <Row>
                                <Col lg={4}>
                                    <ControlLabel>Rival</ControlLabel>
                                    <FormControl 
                                        id="rival"
                                        type="text"
                                        placeholder="Rival"
                                        value = {partido ? partido.rival : ""}
                                        onChange = {(e) => this.changePartido(e)}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <ControlLabel>Fecha</ControlLabel>
                                    <FormControl 
                                        id="fecha"
                                        type="date"
                                        placeholder="Fecha"
                                        value={fecha ? fecha : ""}
                                        onChange = {(e) => this.changePartido(e)}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <ControlLabel>Resultado</ControlLabel>
                                    <FormControl 
                                        id="resultado"
                                        type="text"
                                        label="Text"
                                        placeholder="Resultado"
                                        value={partido ? partido.goles_a_favor + " - " + partido.goles_en_contra  : ""}
                                        onChange = {(e) => this.changePartido(e)}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                        </form>
                        <hr/>
                    </Col>
                </div>
                <Col md={12} xs={12} sm={12}>
                {/*
                    <Col xs={12} sm={12} md={3} lg={3} className="tarjetaBusquedaJugador">
                        <h4>Seleccione jugador</h4>
                        <Autosuggest suggestions={suggestions}
                                             id={partido ? partido.id : 1}
                                             onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                             onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                             getSuggestionValue={this.getSuggestionValueMostrar}
                                             renderSuggestion={this.renderSuggestion}
                                             inputProps={{
                                                 placeholder: "Nombre de jugador",
                                                 value: valueSuggestion,
                                                 onChange: this.onChange,
                        }}/>
                        <Button bsStyle="primary" bsSize="large" className="botonAgregarJugadorPartido">
                            Agregar jugador
                        </Button>
                    </Col>*/}
                    {Jugadores}
                </Col>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        partidos: state.partidos,
        jugadores: state.jugadores,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPartido: (partido) => {
            dispatch(createPartido(partido))
        },
        updatePartido: (partido) => {
            dispatch(updatePartido(partido))
        },
        createJugador: (jugador) => {
            dispatch(createJugador(jugador))
        },
        updateJugador: (jugador) => {
            dispatch(updateJugador(jugador))
        },
        fetchAndUpdatePartido: (idPartido) => {
            dispatch(fetchAndUpdatePartido(idPartido))
        },
    }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps,mapDispatchToProps)(PartidoAM);
