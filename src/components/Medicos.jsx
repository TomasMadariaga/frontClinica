import React, { Component } from "react";
import axios from "axios";

class Medicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicos: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/medicos")
      .then((response) => {
        this.setState({ medicos: response.data });
      })
      .catch((error) => {
        console.error("Error al obtener los médicos:", error);
      });
  }

  render() {
    const { medicos } = this.state;
    return (
      <div>
        <h1>Listado de Médicos</h1>
        {medicos.length > 0 ? (
          <ul>
            {medicos.map((medico, index) => (
              <li key={index}>
                <p>Nombre: {medico.medicName}</p>
                <p>Apellido: {medico.medicLastname}</p>
                <p>Numero de Registro: {medico.registrationNumber}</p>
                <p>Especialidad: {medico.specialty}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Cargando médicos...</p>
        )}
      </div>
    );
  }
}

export default Medicos;