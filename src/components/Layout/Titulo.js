import React from "react";

export default class Titulo extends React.Component {

    render() {
        const { titulo, ruta } = this.props;
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 titulo">
                <div className="marcoTitulo">
                    <h2>{titulo}</h2>
                    <p>{ruta}</p>
                </div>
            </div>
        )
    }
}
