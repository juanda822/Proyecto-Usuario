// frontend/src/Componentes/UserForm.js
import React, { useState, useEffect } from "react";

const formContainer = {
  marginTop: 18,
  padding: 14,
  borderRadius: 8,
  background: "#fff",
  boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
};

const row = { display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 };
const input = { padding: "10px 12px", borderRadius: 6, border: "1px solid #ddd", outline: "none" };
const actions = { display: "flex", gap: 8, marginTop: 6 };

export default function UserForm({ user, onUpdate, onCancel }) {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  useEffect(() => {
    if (user) setForm({ nombre: user.nombre || "", email: user.email || "", telefono: user.telefono || "" });
  }, [user]);

  const submit = (e) => {
    e.preventDefault();
    onUpdate({ ...user, ...form });
  };

  return (
    <div style={formContainer}>
      <h4 style={{ marginTop: 0 }}>Editar Usuario</h4>
      <form onSubmit={submit}>
        <div style={row}>
          <label>Nombre</label>
          <input style={input} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
        </div>
        <div style={row}>
          <label>Email</label>
          <input style={input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div style={row}>
          <label>Teléfono</label>
          <input style={input} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
        </div>

        <div style={actions}>
          <button type="submit" style={{ padding: "8px 12px", borderRadius: 6, border: "none", background: "#0b5ed7", color: "#fff" }}>Guardar</button>
          <button type="button" onClick={onCancel} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "#fff" }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
