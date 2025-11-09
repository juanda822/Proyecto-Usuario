import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/pretoam.png"; 
const containerStyle = {
  padding: 20,
  borderRadius: 10,
  background: "rgba(255,255,255,0.95)",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  marginBottom: 20,
  position: "relative",
  overflow: "hidden",
};

const backdropStyle = {
  position: "absolute",
  right: "-10%",
  top: "-10%",
  width: "60%",
  height: "220%",
  backgroundImage: `url(${logo})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  opacity: 0.06,
  transform: "rotate(-15deg)",
  pointerEvents: "none",
};

const formRow = { display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 };
const labelStyle = { fontSize: 13, color: "#333", marginBottom: 4 };
const inputStyle = {
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d6d6d6",
  outline: "none",
  fontSize: 14,
};
const btnPrimary = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "none",
  background: "#0b5ed7",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};

function AddUser({ onUserAdded }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/usuarios/add", { nombre, email, telefono })
      .then((res) => {
        setMensaje("✅ Usuario agregado correctamente");
        setNombre("");
        setEmail("");
        setTelefono("");
        if (onUserAdded) onUserAdded();
        setTimeout(() => setMensaje(""), 3000);
      })
      .catch((err) => {
        setMensaje("❌ Error al agregar usuario");
        console.error(err);
        setTimeout(() => setMensaje(""), 3000);
      });
  };

  return (
    <div style={containerStyle}>
      <div style={backdropStyle} />
      <h3 style={{ marginTop: 0 }}>Agregar Usuario</h3>
      <form onSubmit={handleSubmit}>
        <div style={formRow}>
          <label style={labelStyle}>Nombre:</label>
          <input style={inputStyle} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div style={formRow}>
          <label style={labelStyle}>Email:</label>
          <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div style={formRow}>
          <label style={labelStyle}>Teléfono:</label>
          <input style={inputStyle} type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button style={btnPrimary} type="submit">Guardar</button>
        </div>
      </form>

      {mensaje && <p style={{ marginTop: 12 }}>{mensaje}</p>}
    </div>
  );
}

export default AddUser;
