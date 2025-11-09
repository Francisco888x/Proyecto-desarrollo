import React, { useState } from 'react';
import './Login.css';

function Register({ onRegister, onCancel }) {
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
