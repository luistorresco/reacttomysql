const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});


app.post('/comentarios', (req, res) => {
  const { nombre, comentario } = req.body;


  const sql = 'INSERT INTO comentarios (nombre, comentario) VALUES (?, ?)';
  db.query(sql, [nombre, comentario], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      console.log('Comentario creado exitosamente');
      res.json({ success: true });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});

