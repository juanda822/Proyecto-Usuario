import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // Cargar usuarios al iniciar
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const res = await axios.get("http://localhost:5001/api/usuarios");
    setUsers(res.data);
  };

  //Agregar o actualizar usuario
  const guardarUsuario = async () => {
    if (!nombre || !email) return alert("Completa todos los campos");

    if (editId) {
      // Editar usuario
      await axios.put(`http://localhost:5001/api/usuarios/${editId}`, { nombre, email });
      setEditId(null);
    } else {
      // Crear usuario nuevo
      await axios.post("http://localhost:5001/api/usuarios", { nombre, email });
    }

    setNombre("");
    setEmail("");
    obtenerUsuarios();
  };

  //Eliminar usuario
  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
      obtenerUsuarios();
    }
  };

  //Editar usuario
  const editarUsuario = (u) => {
    setEditId(u.id);
    setNombre(u.nombre);
    setEmail(u.email);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Usuarios</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={guardarUsuario}>
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => editarUsuario(u)}>Editar</button>
                <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
