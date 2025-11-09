import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/pretoam.png";

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(180deg,#eaf6ff 0%, #ffffff 40%)",
  padding: 20,
};

const card = {
  width: 420,
  padding: 30,
  borderRadius: 12,
  background: "rgba(255,255,255,0.98)",
  boxShadow: "0 20px 40px rgba(2,6,23,0.08)",
  position: "relative",
  overflow: "hidden",
};

const bgLogo = {
  position: "absolute",
  left: "50%",
  top: "-15%",
  width: 360,
  height: 360,
  transform: "translateX(-50%)",
  backgroundImage: `url(${logo})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  opacity: 0.05,
  pointerEvents: "none",
};

const form = { display: "flex", flexDirection: "column", gap: 12, zIndex: 2, position: "relative" };
const input = { padding: "10px 12px", borderRadius: 8, border: "1px solid #dcdcdc" };
const btn = { padding: "10px 12px", borderRadius: 10, border: "none", background: "#0b5ed7", color: "#fff", cursor: "pointer" };

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/api/usuarios/login", { email, password })
      .then(res => {
        setMensaje("✅ Login exitoso");
        localStorage.setItem("usuario", JSON.stringify(res.data));
        if (onLogin) onLogin(res.data);
      })
      .catch(err => {
        setMensaje("❌ Credenciales incorrectas");
        console.error(err);
      });
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={bgLogo} />
        <h2 style={{ marginTop: 0 }}>PretoAm — Iniciar sesión</h2>
        <form onSubmit={handleLogin} style={form}>
          <input style={input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={input} type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={btn} type="submit">Entrar</button>
        </form>
        {mensaje && <p style={{ marginTop: 12 }}>{mensaje}</p>}
      </div>
    </div>
  );
}
