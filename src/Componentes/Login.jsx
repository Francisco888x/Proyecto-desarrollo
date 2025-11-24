import React, { useState } from 'react';
// ⚠️ Importación de CSS cambiada y ruta ajustada a la nueva estructura
import '../styles/Login.css';

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Ingresa tu usuario y contraseña.');
      return;
    }

    try {
      const response = await fetch('http://localhost/proyecto-desarrollo/backend/validateLogin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          usuario: username,
          contra: password,
        }).toString(),
      });

      const data = await response.json();

      if (data.success) {
        if (onLogin) onLogin({ email: username });
      } else {
        setError(data.message || 'Error al iniciar sesión.');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="login-component">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
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

          {/* 🎯 Clase de botón refactorizada */}
          <button type="submit" className="btn-primary">Entrar</button> 
          <button
            type="button"
            className="btn-primary" // 🎯 Clase de botón refactorizada
            // ⚠️ Estilo en línea: Es mejor mover este estilo al CSS si es posible.
            // En login-module.css, la regla nth-of-type(2):hover ya estaba. Agregué una clase de utilidad en global.css llamada .btn-success para esto.
            style={{ background: '#2ecc71', marginTop: '8px' }} 
            onClick={onShowRegister}
          >
            Nuevo usuario
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;