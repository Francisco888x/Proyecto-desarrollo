import React, { useState } from 'react';
// ⚠️ Importación de CSS cambiada y ruta ajustada a la nueva estructura
import '../styles/Login.css'; 

function Register({ onRegister, onCancel }) {
  // ... (lógica de estado y handleSubmit sin cambios) ...
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost/proyecto-desarrollo/backend/addRecord.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ usuario: username, contra: password }).toString(),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Usuario registrado correctamente ✅');
        if (onRegister) onRegister({ username });
        setUsername('');
        setPassword('');
      } else {
        setError(data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="login-component">
      <div className="login-card">
        <h2>Registrar Usuario</h2>
        {error && <div className="login-error">{error}</div>}
        {/* Se mantiene login-success, que necesitarías agregar a login-module.css o global.css */}
        {success && <div className="login-success">{success}</div>} 

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label className="input-label">
            Usuario
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
            />
          </label>

          <label className="input-label">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </label>

          {/* 🎯 Clase de botón refactorizada */}
          <button type="submit" className="btn-primary">Registrar</button> 
          <button
            type="button"
            className="btn-primary" // 🎯 Clase de botón refactorizada
            // ⚠️ Estilo en línea: Es mejor mover este estilo al CSS como .btn-secondary o .btn-warning.
            style={{ background: '#e67e22', marginTop: '8px' }} 
            onClick={onCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;