import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5001/api/usuarios/add", {
      nombre,
      email,
      telefono,
    })
    .then((res) => {
      setMensaje("✅ Usuario agregado correctamente");
      setNombre("");
      setEmail("");
      setTelefono("");
      if (onUserAdded) onUserAdded(); // Para refrescar la lista
    })
    .catch((err) => {
      setMensaje("❌ Error al agregar usuario");
      console.error(err);
    });
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", marginBottom: "20px" }}>
      <h3>Agregar Usuario</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AddUser;