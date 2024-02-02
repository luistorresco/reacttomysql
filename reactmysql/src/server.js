
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Agregamos el middleware CORS
const app = express();
const PORT = 3306;

// Configuración de la conexión a MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario_de_mysql',
  password: 'tu_contraseña_de_mysql',
  database: 'tu_base_de_datos',
  port: 3306, 
});

conexion.connect((error) => {
  if (error) {
    console.error('Error al conectar a MySQL:', error);
  } else {
    console.log('Conexión a MySQL establecida');
  }
});

// Middleware para permitir el uso de JSON y CORS
app.use(express.json());
app.use(cors());

// Ruta para manejar la creación de un nuevo comentario
app.post('/api/comentarios', (req, res) => {
  const { nombre, comentario } = req.body;

  const sql = 'INSERT INTO comentarios (nombre, comentario) VALUES (?, ?)';
  const values = [nombre, comentario];

  conexion.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error al insertar en MySQL:', error);
      res.status(500).json({ mensaje: 'Error al crear el comentario' });
    } else {
      console.log('Comentario creado exitosamente');
      res.status(201).json({ mensaje: 'Comentario creado exitosamente' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
