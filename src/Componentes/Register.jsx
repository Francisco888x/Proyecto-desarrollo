import React, { useState } from 'react';
import './Login.css'; // Reutilizamos los mismos estilos

function Register({ onRegister, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username) return setError('Ingresa un nombre de usuario.');
    if (!password) return setError('Ingresa una contraseña.');

    console.log('Usuario registrado:', { username, password });
    if (onRegister) onRegister({ username });

    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-component">
      <div className="login-card">
        <h2>Registrar Usuario</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label className="input-label">
            Usuario
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
          </label>

          <label className="input-label">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </label>

          <button type="submit" className="btn-login">Registrar</button>
          <button
            type="button"
            className="btn-login"
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
