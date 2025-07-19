import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { authenticate, checkAuthentication, logout } from './utils/api';
import './styles/vortex-theme.css';

function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const existingSession = checkAuthentication();
    if (existingSession) {
      setSession(existingSession);
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const sessionData = await authenticate(credentials);
      setSession(sessionData);
    } catch (error) {
      throw error; // Re-throw to be handled by Login component
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Clear session anyway
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner during initialization
  if (isInitializing) {
    return (
      <div className="vortex-min-h-screen vortex-flex vortex-items-center vortex-justify-center">
        <div className="vortex-flex vortex-items-center">
          <div className="vortex-spinner" style={{ marginRight: '12px' }}></div>
          <span>Initializing...</span>
        </div>
      </div>
    );
  }

  // Render appropriate component based on authentication state
  return (
    <div className="App">
      {session ? (
        <Dashboard 
          session={session} 
          onLogout={handleLogout}
        />
      ) : (
        <Login 
          onLogin={handleLogin} 
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;