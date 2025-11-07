import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5001/api/usuarios/login", { email, password })
      .then(res => {
        setMensaje("✅ Login exitoso");
        localStorage.setItem("usuario", JSON.stringify(res.data));
        onLogin(res.data);
      })
      .catch(err => {
        setMensaje("❌ Credenciales incorrectas");
        console.error(err);
      });
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;