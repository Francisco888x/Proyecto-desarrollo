import React from 'react';
import './Projects.css';

// Componente simple que muestra tablas de proyectos relacionados con acciones comunitarias.
// En una app real los datos vendrían de una API.

const sampleProjects = [
  { id: 1, title: 'Limpieza del Barrio', description: 'Jornada de limpieza en la plaza central', status: 'En curso', creator: 'juan@ejemplo.com', maxParticipants: 30 },
  { id: 2, title: 'Huerto Comunitario', description: 'Creación y mantenimiento de huerto en escuela local', status: 'Planeado', creator: 'maria@ejemplo.com', maxParticipants: 20 },
  { id: 3, title: 'Taller de Reciclaje', description: 'Taller práctico para enseñar separación y reciclaje', status: 'Finalizado', creator: 'carlos@ejemplo.com', maxParticipants: 50 },
];

function Projects({ user, onLogout }) {
  return (
    <div className="projects-component">
      <div className="projects-card">
        <div className="projects-header">
          <h2>Proyectos</h2>
          <button className="logout-btn" onClick={() => onLogout && onLogout()}>Cerrar sesión</button>
        </div>
        {user && <div className="welcome">Has ingresado como <strong>{user.email}</strong></div>}

        <div className="table-wrap">
          <table className="projects-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Creador</th>
                <th>Cupo máximo</th>
              </tr>
            </thead>
            <tbody>
              {sampleProjects.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.status}</td>
                  <td>{p.creator}</td>
                  <td>{p.maxParticipants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projects;
