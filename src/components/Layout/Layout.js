import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';

//Components
import Navegador from "../../components/Layout/Navegador";
import LogIn from "../../components/Layout/LogIn";
import Jugador from "../../pages/Jugador/Jugador";
import JugadorAM from "../../pages/Jugador/JugadorAM";
import Partido from "../../pages/Partido/Partido";
import PartidoAM from "../../pages/Partido/PartidoAM";
import MensajeError from "../elementos/MensajeError";
import Registro from "../../components/Layout/Registro";
import Torneos from "../../pages/Torneos/Torneos";


class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const PrivateRoute = ({component, ...rest, token}) => ( // eslint-disable-line

            <Route
                {...rest} render={props => (

                token ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location}, // eslint-disable-line
                        }}
                    />
                )
            )}
            />
        );

        return (
            <div>
                <Navegador/>
                <div className="row-fluid columns">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 principal">
                        <Switch>
                            <Route path="/" exact component={LogIn}/>
                            <Route path="/registro" exact component={Registro}/>
                            <Route path="/jugadores" exact component={Jugador}/>
                            <Route path="/torneos" component={Torneos}/>
                            <Route path="/partidos" component={Partido}/>
                            {/*<Route path="/jugador/:modo/:nro_camiseta" component={JugadorAM}/>*/}
                            {/*<Route path="/partido/:modo/:nro_camiseta" component={PartidoAM}/>*/}
                            <PrivateRoute path="/partido/:modo/:nro_camiseta?" token={this.props.authentication.token} component={PartidoAM}/>
                            <PrivateRoute path="/jugador/:modo/:nro_camiseta?" token={this.props.authentication.token} component={JugadorAM}/>

                        </Switch>
                        <MensajeError/>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        authentication: store.authentication,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
