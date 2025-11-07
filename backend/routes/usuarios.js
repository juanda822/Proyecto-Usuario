import express from "express";
import pool from "../db.js"; // tu conexión a la base de datos
const router = express.Router();

// ✅ GET todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error en GET /usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
  });

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email) VALUES (?, ?)",
      [nombre, email]
    );
    res.json({ id: result.insertId, nombre, email });
  } catch (error) {
    console.error("Error en POST /usuarios:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email } = req.body;
    await pool.query("UPDATE usuarios SET nombre=?, email=? WHERE id=?", [
      nombre,
      email,
      id,
    ]);
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error en PUT /usuarios:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM usuarios WHERE id=?", [id]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error en DELETE /usuarios:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
