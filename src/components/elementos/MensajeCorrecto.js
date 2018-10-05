import React from "react";
import SweetAlert from "react-bootstrap-sweetalert"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class MensajeCorrecto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mostrar: false, procesoFinalizado: false, mensajes: []};
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mostrar) {
            this.setState({mostrar: true});
            setTimeout(() => this.setState({mostrar: false}), 5000);
        }

        var procesoFinalizado = false;
        var mensajes = this.state.mensajes;
        Object.entries(this.props.todos).forEach(
            ([key, value]) => {
                var valuePrev = prevProps.todos[key];
                if (valuePrev && value && !value.currentlySending && valuePrev.currentlySending && !value.errorMessage && !value.token) {
                    mensajes.push("Operación realizada correctamente.");
                    console.log("entro");
                    procesoFinalizado = true;
                }
                if (value.create && valuePrev && valuePrev.create && !value.create.isCreating && valuePrev.create.isCreating && !value.create.error) {
                    //TODO
                    console.log("entre aca");
                    mensajes.push("Perfil creado correctamente. Inicie sesión para acceder.");
                    console.log("entro");
                    procesoFinalizado = true;
                }

                if (value.update && valuePrev && valuePrev.update && !value.update.isUpdating && valuePrev.update.isUpdating && !value.update.error) {
                    mensajes.push("Perfil actualizado correctamente.");
                    procesoFinalizado = true;
                }
                if (value.delete && valuePrev && valuePrev.delete && !value.delete.isDeleting && valuePrev.delete.isDeleting && !value.delete.error) {
                    mensajes.push(key.toUpperCase() + " borrados correctamente");
                    procesoFinalizado = true;
                }
            }
        );
        if (this.state.mostrar != procesoFinalizado && procesoFinalizado) {
            this.setState({mostrar: procesoFinalizado});
            setTimeout(() => this.setState({mostrar: false}), 5000);
        }
    }


    render() {
        const {mostrar} = this.state;
        const {mensajes} = this.props;
        // if (mensajes)
        //     var Mensajes = mensajes.slice(-3).map((mensaje,index) => {
        //         return (<p key={index}><span className="glyphicon glyphicon-check" style={{marginTop: "10px", width:"20px"}}/> {mensaje}</p>);
        //     });
        return (
            // <Modal show={this.state.mostrar} onHide={()=>{this.setState({mostrar: false})}}>
            //     <Modal.Header closeButton>
            //         <Modal.Title>Procesando</Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body>
            //         {Mensajes}
            //     </Modal.Body>
            //     <Modal.Footer>
            //         <Button bsStyle="success" onClick={()=>{this.setState({mostrar: false})}}>Cerrar</Button>
            //     </Modal.Footer>
            // </Modal>
            <div>
            <SweetAlert success onConfirm={()=>{this.setState({mostrar: false})}} show={mostrar}
                        confirmBtnBsStyle="success" confirmBtnText="Aceptar">
                Operación realizada correctamente.
            </SweetAlert>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MensajeCorrecto));
