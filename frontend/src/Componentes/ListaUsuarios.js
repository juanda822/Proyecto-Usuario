import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";
import logo from "../assets/pretoam.png";

const pageWrap = {
  padding: 20,
  minHeight: "100vh",
  background: "linear-gradient(180deg,#f4f8fb 0%, #ffffff 100%)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

const titleBox = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const logoMini = {
  width: 56,
  height: 56,
  backgroundImage: `url(${logo})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  borderRadius: 8,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
};

export default function UserList({ refresh }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5001/api/usuarios")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error al obtener usuarios:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    axios
      .delete(`http://localhost:5001/api/usuarios/delete/${id}`)
      .then(() => setUsers((prev) => prev.filter((u) => u.id !== id)))
      .catch((err) => console.error("Error al eliminar usuario:", err));
  };

  const handleEdit = (user) => setEditingUser(user);

  const handleUpdate = (updatedUser) => {
    axios
      .put(`http://localhost:5001/api/usuarios/update/${updatedUser.id}`, updatedUser)
      .then(() => {
        setEditingUser(null);
        fetchUsers();
      })
      .catch((err) => console.error("Error al actualizar usuario:", err));
  };

  return (
    <div style={pageWrap}>
      <div style={header}>
        <div style={titleBox}>
          <div style={logoMini} />
          <div>
            <h2 style={{ margin: 0 }}>PretoAm • Administración</h2>
            <small style={{ color: "#556", fontSize: 13 }}>Base de datos de la petrolera — gestión de usuarios</small>
          </div>
        </div>
      </div>



      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      {editingUser && <UserForm user={editingUser} onUpdate={handleUpdate} onCancel={() => setEditingUser(null)} />}
    </div>
  );
}
