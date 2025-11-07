const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '52807844.Ab', //
  database: 'usuarios_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(() => console.log('✅ Conectado a MySQL con pool'))
  .catch(err => console.error('❌ Error conectando a MySQL:', err.message));

module.exports = pool;
