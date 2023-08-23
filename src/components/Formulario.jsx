import {useState, useEffect} from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombe] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombe(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return fecha + random;
  }


  const handleSubmit = (evento) => {
    evento.preventDefault();

    //Validacion de formulario

    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
    } else {
      setError(false)

      //Objeto paciente

      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas
      }

      if(paciente.id){
        // Estamos editando registro
        objetoPaciente.id = paciente.id

        const pacientesActualizado = pacientes.map((pacienteState)=> pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

        setPacientes(pacientesActualizado)
        setPaciente({})


      }else {
        // Nuevo resgistro
        objetoPaciente.id = generarId()
        setPacientes([...pacientes, objetoPaciente]);
      }

      //Reiniciar Form
      setNombe('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');
    }
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h1 className="font-black text-3xl text-center">Seguimiento Pacientes</h1>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" 
        action=""
        onSubmit={handleSubmit}
        >
          {error && <Error>
            <p>Todos los campos son Obligatorios</p>
          </Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota
          </label>
          <input 
            id="mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            type="text" 
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={(e) => setNombe(e.target.value)} 
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre del Propitario</label>
          <input 
            id="propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            type="text" 
            placeholder="Nombre del propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}  
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input 
            id="email" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            type="email" 
            placeholder="Email del propietario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input 
            id="alta" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)} 
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Email</label>
          <textarea 
            id="sintomas" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            cols="30" 
            rows="10" 
            placeholder="Descibe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)} 
          />
        </div>
        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
          value={paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario
