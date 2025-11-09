import React, { useState } from "react";
const tableContainer = {
  width: "100%",
  overflowX: "auto",
  borderRadius: 8,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
};

const thStyle = {
  textAlign: "left",
  padding: "12px 10px",
  borderBottom: "1px solid #eee",
  fontSize: 13,
  color: "#444",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #f1f1f1",
  fontSize: 14,
  color: "#222",
};

const actionBtn = {
  padding: "6px 8px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: 13,
};

export default function UsersTable({ users = [], onEdit, onDelete }) {
  return (
    <div style={tableContainer}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Teléfono</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={tdStyle}>{u.id}</td>
              <td style={tdStyle}>{u.nombre}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.telefono}</td>
              <td style={tdStyle}>
                <button style={{ ...actionBtn, background: "#f8f9fa", marginRight: 8 }} onClick={() => onEdit(u)}>Editar</button>
                <button style={{ ...actionBtn, background: "#ffe9e9", color: "#b30000" }} onClick={() => onDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
