import React, { useState } from 'react';
import '../styles/vortex-theme.css';

const Login = ({ onLogin, isLoading }) => {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!credentials.userId || !credentials.password) {
      setError('Please enter both User ID and Password');
      return;
    }

    try {
      await onLogin(credentials);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="vortex-min-h-screen vortex-flex vortex-items-center vortex-justify-center" 
         style={{ backgroundColor: 'var(--vortex-gray-50)' }}>
      <div className="vortex-w-full" style={{ maxWidth: '400px', padding: '0 1rem' }}>
        <div className="vortex-card">
          {/* Vortex Capital Group Logo/Header */}
          <div className="vortex-text-center vortex-mb-6">
            <h1 className="vortex-heading-2" style={{ color: 'var(--vortex-primary)' }}>
              Vortex Capital Group
            </h1>
            <p className="vortex-text-sm" style={{ color: 'var(--vortex-gray-600)' }}>
              PropReports Access Portal
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="vortex-alert vortex-alert-error">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="vortex-form-group">
              <label htmlFor="userId" className="vortex-label">
                User ID / Email
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={credentials.userId}
                onChange={handleInputChange}
                className="vortex-input"
                placeholder="Enter your User ID or Email"
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div className="vortex-form-group">
              <label htmlFor="password" className="vortex-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="vortex-input"
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="vortex-btn vortex-btn-primary vortex-w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="vortex-flex vortex-items-center vortex-justify-center">
                  <div className="vortex-spinner" style={{ marginRight: '8px' }}></div>
                  Logging in...
                </div>
              ) : (
                'Login to PropReports'
              )}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="vortex-text-center vortex-mt-4">
            <a 
              href="https://vortexcap.propreports.com/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="vortex-text-sm"
              style={{ 
                color: 'var(--vortex-primary)',
                textDecoration: 'none'
              }}
            >
              Forgot your password?
            </a>
          </div>

          {/* Footer */}
          <div className="vortex-text-center vortex-mt-6">
            <p className="vortex-text-sm" style={{ color: 'var(--vortex-gray-500)' }}>
              Secure access to your PropReports dashboard
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="vortex-text-center vortex-mt-4">
          <p className="vortex-text-sm" style={{ color: 'var(--vortex-gray-400)' }}>
            This portal provides secure access to PropReports through Vortex Capital Group.
            Your login credentials are securely forwarded and not stored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;