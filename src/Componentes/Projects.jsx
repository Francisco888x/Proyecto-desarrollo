import React, { useEffect, useState } from 'react';
import './Projects.css';
import NewProject from './NewProject';

function Projects({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Cargar proyectos desde backend ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost/proyecto-desarrollo/backend/readProjects.php');
        const data = await response.json();

        if (data.success) {
          setProjects(data.data);
        } else {
          console.error('Error al cargar proyectos:', data.message);
        }
      } catch (err) {
        console.error('Error de conexión:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleJoin = (projectId) => {
    setJoinedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleCreate = (newProject) => {
    setProjects([...projects, newProject]);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <NewProject
        user={user}
        onCreate={handleCreate}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  if (loading) {
    return <div className="projects-component"><p>Cargando proyectos...</p></div>;
  }

  return (
    <div>
      <div className="projects-topbar">
        <div className="user-info">
          <strong>{user.email}</strong>
        </div>
        <div className="topbar-buttons">
          <button className="btn-new" onClick={() => setShowForm(true)}>
            Nuevo proyecto
          </button>
          <button className="btn-logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="projects-component">
        <div className="projects-card">
          <h2>Proyectos</h2>
          <div className="table-wrap">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Creador</th>
                  <th>Cupo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: 'center' }}>No hay proyectos registrados.</td></tr>
                ) : (
                  projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.titulo}</td>
                      <td>{p.descripcion}</td>
                      <td>{p.estado}</td>
                      <td>{p.creador}</td>
                      <td>{p.cupo}</td>
                      <td>
                        <button
                          className={`btn-join ${
                            joinedProjects.includes(p.id) ? 'joined' : ''
                          }`}
                          onClick={() => handleJoin(p.id)}
                        >
                          {joinedProjects.includes(p.id)
                            ? 'Ya inscrito'
                            : 'Unirme'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
