import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [alta, setAlta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, propietario, email, alta, sintomas].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas,
      id: generarId(),
    };

    if (paciente.id) {
      // Editando el Registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    setNombre("");
    setPropietario("");
    setEmail("");
    setAlta("");
    setSintomas("");
  };
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 scroll-mb-10">
        Añade Paciente y{" "}
        <span className="text-indigo-600 font-bold">Administrarlos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className=" bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className=" block text-gray-700 uppercase font-bold"
          >
            {" "}
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className=" block text-gray-700 uppercase font-bold"
          >
            {" "}
            propietario
          </label>
          <input
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className=" block text-gray-700 uppercase font-bold"
          >
            {" "}
            email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className=" block text-gray-700 uppercase font-bold"
          >
            {" "}
            Alta
          </label>
          <input
            id="alta"
            type="date"
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className=" block text-gray-700 uppercase font-bold"
          >
            {" "}
            sintomas
          </label>
          <textarea
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <input
          type="submit"
          value={paciente.id ? "Editar Paciente" : " Agregar Pacientes"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>
    </div>
  );
};

export default Formulario;
