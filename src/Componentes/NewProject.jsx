// src/Componentes/NewProject.jsx

import React, { useState } from 'react'; // Asegúrate de importar useState
import '../styles/Login.css'; 
import '../styles/Projects.css';
import '../styles/global.css'

function NewProject({ user, onCreate, onCancel }) {
  // ⭐ DECLARACIONES DE ESTADO (AQUÍ ESTABA EL ERROR DE ESLint)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Planeado');
  const [cupo, setCupo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !cupo) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost/proyecto-desarrollo/backend/addProject.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          titulo: title,
          descripcion: description,
          estado: status,
          creador: user.email,
          cupo: cupo
        }).toString(),
      });

      const data = await response.json();

      if (data.success) {
        alert('Proyecto guardado correctamente ✅');
        
        // Llama a onCreate (que recarga la lista en Projects.jsx)
        onCreate(); 
        
      } else {
        setError(data.message || 'Error al guardar proyecto.');
      }
    } catch (err) {
      console.error('Error al conectar:', err);
      setError('No se pudo conectar con el servidor.');
    }
  };


  return (
    <div className="projects-component"> 
      <div className="projects-card">
        <h2>Nuevo Proyecto</h2>
        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-label">
            Título
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Huerto comunitario"
            />
          </label>

          <label className="input-label">
            Descripción
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el proyecto brevemente..."
              rows={4}
              style={{ resize: 'none' }} // Estilo en línea: El padding ya se define en Projects.css
            ></textarea>
          </label>

          <label className="input-label">
            Estado
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Planeado">Planeado</option>
              <option value="En curso">En curso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </label>

          <label className="input-label">
            Cupo máximo
            <input
              type="number"
              value={cupo}
              onChange={(e) => setCupo(e.target.value)}
              placeholder="Ej. 20"
            />
          </label>

          <div className="topbar-buttons" style={{ marginTop: '16px' }}>
            {/* ⚠️ CLASE DE BOTÓN: Si usaste la refactorización anterior, usa btn-primary/btn-logout-red */}
            <button type="submit" className="btn-new">Guardar proyecto</button> 
            <button
              type="button"
              className="btn-logout" 
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProject;