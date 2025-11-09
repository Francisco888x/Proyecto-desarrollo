import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError('Ingresa tu correo.');
    if (!password) return setError('Ingresa tu contraseña.');

    // Mock authentication: en una app real llamarías a una API aquí
    console.log('Login enviado:', { email, password });
    if (onLogin) onLogin({ email });

    // Limpia campos (opcional)
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-component">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label className="input-label">
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
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

          <button type="submit" className="btn-login">Entrar</button>
        </form>

        <div className="login-links">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <span className="sep"> · </span>
          <a href="#">Regístrate</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
