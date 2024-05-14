import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default  function App() {
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(JSON.stringify({ nombre, comentario }));
      const response = await fetch('${process.env.REACT_APP_API_URL}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, comentario }),
        
      });
      

      if (response.ok) {
        console.log('Comentario creado exitosamente');
      } else {
        console.error('Error al crear el comentario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <>
      <div className="contenedor">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Comentario</label>
            <input
              type="textarea"
              className="form-control"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar a la Base de Datos
          </button>
        </form>
      </div>
    </>
  );
}

