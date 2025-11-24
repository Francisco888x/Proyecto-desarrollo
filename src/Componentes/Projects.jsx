import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Projects.css'; // Ruta corregida
import NewProject from './NewProject';

function Projects({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. 🎯 FUNCIÓN DE CARGA EXTRAÍDA Y MEMORIZADA
  // Usamos useCallback para que esta función no cambie a menos que sus dependencias lo hagan
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/proyecto-desarrollo/backend/readProjects.php');
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      } else {
        console.error('Error al cargar proyectos:', data.message);
        setProjects([]); // Limpiar en caso de error
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias vacías: solo se define una vez

  // --- Cargar proyectos al inicio ---
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]); // Dependencia: Se llama cuando fetchProjects cambia (que solo es al inicio)

  // 3. 🎯 FUNCIÓN DE CREACIÓN MEJORADA
  const handleCreate = () => {
    // Al crearse exitosamente, cerramos el formulario y recargamos la lista
    setShowForm(false);
    fetchProjects(); // ⭐ ¡Esta es la clave para recargar la tabla!
  };
  
  // La función handleJoin se queda sin cambios
  const handleJoin = (projectId) => {
    setJoinedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  if (showForm) {
    return (
      <NewProject
        user={user}
        onCreate={handleCreate} // Ahora solo llama a handleCreate, que recarga la lista
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
          {/* 🎯 Clase de botón refactorizada: btn-new -> btn-primary */}
          <button className="btn-primary" onClick={() => setShowForm(true)}> 
            Nuevo proyecto
          </button>
          {/* 🎯 Clase de botón refactorizada: btn-logout -> btn-logout-red */}
          <button className="btn-logout-red" onClick={onLogout}> 
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="projects-component">
        {/* ... (cuerpo de la tabla sin cambios) ... */}
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
                          // La clase btn-join se mantiene en global.css
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