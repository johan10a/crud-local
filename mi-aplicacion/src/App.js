import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

// Datos iniciales de las sedes
const data = [{ id: 1, Nombre: "Uniremington", Ciudad: "Cali" }];

class App extends React.Component {
  // Estado inicial de la aplicación
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      Nombre: "",
      Ciudad: "",
    },
  };

  // Muestra el modal de actualización con los datos de la sede seleccionada
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  // Cierra el modal de actualización
  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  // Muestra el modal de inserción
  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  // Cierra el modal de inserción
  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  // Actualiza los datos de la sede seleccionada
  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].Nombre = dato.Nombre;
        arreglo[contador].Ciudad = dato.Ciudad;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  // Elimina una sede después de confirmación
  eliminar = (dato) => {
    var opcion = window.confirm("Desea eliminar la sede con id: " + dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  // Inserta una nueva sede en la lista
  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  // Maneja el cambio en los campos del formulario
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Renderiza la interfaz de usuario
  render() {
    return (
      <>
        <Container>
          <br />
          {/* Botón para abrir el modal de inserción */}
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear
          </Button>
          <br />
          <br />
          {/* Tabla que muestra la información de las sedes */}
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {/* Mapeo de los datos para mostrar cada sede en la tabla */}
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Nombre}</td>
                  <td>{dato.Ciudad}</td>
                  <td>
                    {/* Botones de editar y eliminar para cada sede */}
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal de actualización */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            {/* Formulario para la actualización de la sede */}
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Ciudad:</label>
              <input
                className="form-control"
                name="Ciudad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Ciudad}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            {/* Botones para confirmar la actualización o cancelar */}
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal de inserción */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Nombre</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            {/* Formulario para la inserción de una nueva sede */}
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Ciudad:</label>
              <input
                className="form-control"
                name="Ciudad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            {/* Botones para confirmar la inserción o cancelar */}
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
