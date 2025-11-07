const express = require('express');
const router = express.Router();
const db = require('../config/database');

//  Obtener todos los usuarios
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({
        error: 'Error al obtener usuarios',
        details: err.message
      });
    }
    res.json(results);
  });
});

//  Crear un nuevo usuario
router.post('/add', (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono], (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
    res.status(201).json({ message: 'Usuario creado exitosamente', id: result.insertId });
  });
});

//Actualizar usuario
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

//Eliminar usuario
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

//  Ruta de login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM login WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error al verificar login:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = results[0];
    res.json({
      message: 'Inicio de sesión exitoso',
      rol: user.rol,
      email: user.email
    });
  });
});


module.exports = router;