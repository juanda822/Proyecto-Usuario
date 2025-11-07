import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js";
import connection from "./db.js";

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
