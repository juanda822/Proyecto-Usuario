import React, { useState } from "react";
import UserList from "./Componentes/ListaUsuarios";
import AddUser from "./Componentes/AddUser";
import Login from "./Componentes/Login";

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
    <div style={{ padding: "20px" }}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido: {user.email}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>

      <AddUser onUserAdded={() => setRefresh(!refresh)} />
      <UserList refresh={refresh} />
    </div>
  );
}

export default App;