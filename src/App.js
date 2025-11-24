import React, { useState } from 'react';
import Login from './Componentes/Login';
import Register from './Componentes/Register';
import Projects from './Componentes/Projects';

function App() {
  
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleRegister = (newUser) => {
    console.log('Nuevo usuario creado:', newUser);
    setShowRegister(false);
    alert(`Usuario ${newUser.username} registrado con éxito ✅`);
  };

  return (
    <div>
      {!user ? (
        showRegister ? (
          <Register
            onRegister={handleRegister}
            onCancel={() => setShowRegister(false)}
          />
        ) : (
          <Login
            onLogin={handleLogin}
            onShowRegister={() => setShowRegister(true)}
          />
        )
      ) : (
        <Projects user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
