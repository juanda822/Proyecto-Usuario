import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList({ refresh }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  useEffect(() => {
    axios.get("http://localhost:5001/api/usuarios")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error al obtener usuarios:", err));
  }, [refresh]);

  // 🔹 Eliminar usuario
  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      axios.delete("http://localhost:5001/api/usuarios/delete/${id}")
        .then(() => {
          setUsers(users.filter(u => u.id !== id));
        })
        .catch(err => console.error("Error al eliminar usuario:", err));
    }
  };

  // 🔹 Activar modo edición
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setForm({ nombre: user.nombre, email: user.email, telefono: user.telefono });
  };

  // 🔹 Guardar cambios
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5001/api/usuarios/update/${editingUser}, form")
      .then(() => {
        setEditingUser(null);
        setForm({ nombre: "", email: "", telefono: "" });
        axios.get("http://localhost:5001/api/usuarios")
          .then(res => setUsers(res.data));
      })
      .catch(err => console.error("Error al actualizar usuario:", err));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Lista de Usuarios</h3>

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>
                  <button onClick={() => handleEdit(u)}>Editar</button>
                  <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingUser && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Editar Usuario</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserList;