import React, {Component} from "react";
import {connect} from 'react-redux';

import {Row, Col, Table, Button, Glyphicon} from 'react-bootstrap';
import {Link} from "react-router-dom";

//CSS
import "../../assets/css/estiloMarca.css";

//Actions
import {fetchTorneosIfNeeded} from "../../actions/torneoActions";

//Moment

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


        return (
            <div>
                Torneos
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        torneos: state.torneos,
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
