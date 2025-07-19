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
    <div className="vortex-login-container">
      <div className="vortex-login-card">
        <div className="vortex-card">
          {/* Modern Brand Header */}
          <div className="vortex-brand-header">
            <h1 className="vortex-brand-title">
              Vortex Capital Group
            </h1>
            <p className="vortex-brand-subtitle">
              PropReports Access Portal
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="vortex-alert vortex-alert-error">
              <strong>Authentication Error:</strong> {error}
            </div>
          )}

          {/* Modern Login Form */}
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
                  <div className="vortex-spinner" style={{ marginRight: '12px' }}></div>
                  Authenticating...
                </div>
              ) : (
                <>
                  <svg 
                    style={{ marginRight: '8px', width: '20px', height: '20px' }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Access PropReports
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="vortex-mt-6" style={{ 
            padding: 'var(--vortex-spacing-4)', 
            background: 'var(--vortex-bg-surface)', 
            borderRadius: 'var(--vortex-radius-lg)',
            border: '1px solid var(--vortex-border-primary)'
          }}>
            <div className="vortex-flex vortex-items-center vortex-mb-2">
              <svg 
                style={{ width: '20px', height: '20px', marginRight: '8px', color: 'var(--vortex-success)' }}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span style={{ fontWeight: '600', color: 'var(--vortex-text-primary)', fontSize: 'var(--vortex-font-size-sm)' }}>
                Secure Connection
              </span>
            </div>
            <p className="vortex-text-sm" style={{ margin: 0, color: 'var(--vortex-text-muted)' }}>
              Your credentials are securely forwarded to PropReports and never stored on our servers.
            </p>
          </div>

          {/* Footer Links */}
          <div className="vortex-text-center vortex-mt-6">
            <a 
              href="https://vortexcap.propreports.com/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="vortex-text-sm"
              style={{ 
                color: 'var(--vortex-primary)',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Forgot your password?
            </a>
            <span style={{ margin: '0 12px', color: 'var(--vortex-gray-400)' }}>•</span>
            <a 
              href="https://www.vortexcapitalgroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="vortex-text-sm"
              style={{ 
                color: 'var(--vortex-primary)',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Visit Main Site
            </a>
          </div>
        </div>

        {/* Floating Elements for Visual Interest */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: -1,
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: -1,
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Login;