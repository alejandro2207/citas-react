import {useState, useEffect} from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";


function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerLocalStorage = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLocalStorage();
  }, []);//Cuando en el Hook de useEffect se deja sin dependencias aqui, singifica que este Hook solo se va a ejecutar una sola vez

  useEffect(()=> {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);


  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );

    setPacientes(pacientesActualizados)
  }

  return (
    //El fragment <> es el elemnto que se puede retornar en el nivel mas alto para los componentes
    <div className="container mx-auto mt-20">
    <Header
    />

    <div className="mt-12 md:flex">
      <Formulario
        pacientes={pacientes}
        setPacientes = {setPacientes}
        paciente = {paciente}
        setPaciente = {setPaciente}
      />
      <ListadoPacientes 
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    </div>

    </div>
  )
}

export default App
