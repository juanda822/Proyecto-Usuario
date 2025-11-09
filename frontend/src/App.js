// src/App.js
import React, { useState } from "react";
import UserList from "./Componentes/ListaUsuarios"; 
import Login from "./Componentes/Login"; 
import AddUser from "./Componentes/AddUser";    
function App() {
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <h1 style={styles.title}>Panel Administrativo — PretoAm</h1>
        <div style={styles.userBox}>
          <span style={styles.welcome}>Bienvenido: {user.email}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <UserList refresh={refresh} />
      <AddUser onUserAdded={() => setRefresh(!refresh)} />
    </div>
  );
}

const styles = {
  layout: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#f2f7fc 0%, #ffffff 60%)",
    padding: "20px 40px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    margin: 0,
    fontSize: 24,
    color: "#0b2a43",
    fontWeight: 700,
  },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  welcome: {
    color: "#444",
    fontSize: 14,
  },
  logoutBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#b30000",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default App;
