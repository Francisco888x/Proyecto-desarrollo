import React, { useState } from 'react';
import Login from './Componentes/Login';
import Projects from './Componentes/Projects';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Projects user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
