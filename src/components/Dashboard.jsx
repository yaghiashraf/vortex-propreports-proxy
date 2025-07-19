import React, { useState, useEffect } from 'react';
import '../styles/vortex-theme.css';

const Dashboard = ({ session, onLogout }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    // Simulate loading time for iframe content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const refreshContent = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Modern Header Navigation */}
      <nav className="vortex-nav">
        <div className="vortex-container">
          <div className="vortex-flex vortex-items-center vortex-justify-between">
            <div className="vortex-flex vortex-items-center">
              <div>
                <h1 style={{ 
                  fontSize: 'var(--vortex-font-size-2xl)',
                  fontWeight: '700',
                  color: 'var(--vortex-primary)',
                  margin: 0,
                  background: 'linear-gradient(135deg, var(--vortex-primary) 0%, #1e40af 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Vortex Capital Group
                </h1>
                <p style={{ 
                  margin: 0,
                  fontSize: 'var(--vortex-font-size-sm)',
                  color: 'var(--vortex-gray-600)',
                  fontWeight: '500'
                }}>
                  PropReports Dashboard
                </p>
              </div>
            </div>
            
            <div className="vortex-flex vortex-items-center" style={{ gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--vortex-gray-50)',
                padding: '8px 12px',
                borderRadius: 'var(--vortex-radius-lg)',
                border: '1px solid var(--vortex-gray-200)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: 'var(--vortex-success)',
                  borderRadius: '50%',
                  marginRight: '8px',
                  boxShadow: '0 0 6px var(--vortex-success)'
                }}></div>
                <span style={{ 
                  fontSize: 'var(--vortex-font-size-sm)',
                  color: 'var(--vortex-gray-700)',
                  fontWeight: '600'
                }}>
                  {session?.userId || 'VCGMGR'}
                </span>
              </div>
              
              <button 
                onClick={refreshContent}
                className="vortex-btn vortex-btn-secondary"
                style={{ 
                  padding: '10px 16px', 
                  fontSize: '14px',
                  minHeight: 'auto'
                }}
              >
                <svg 
                  style={{ width: '16px', height: '16px', marginRight: '6px' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              
              <button 
                onClick={handleLogout}
                className="vortex-btn vortex-btn-secondary"
                style={{ 
                  padding: '10px 16px', 
                  fontSize: '14px',
                  minHeight: 'auto'
                }}
              >
                <svg 
                  style={{ width: '16px', height: '16px', marginRight: '6px' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="vortex-container" style={{ 
        paddingTop: 'var(--vortex-spacing-8)', 
        paddingBottom: 'var(--vortex-spacing-8)' 
      }}>
        {error && (
          <div className="vortex-alert vortex-alert-error vortex-mb-6">
            <strong>Connection Error:</strong> {error}
          </div>
        )}

        {/* Modern Dashboard Card */}
        <div className="vortex-dashboard-content">
          {/* Dashboard Header */}
          <div className="vortex-dashboard-header">
            <div className="vortex-flex vortex-items-center vortex-justify-between">
              <div>
                <h2 style={{ 
                  fontSize: 'var(--vortex-font-size-xl)',
                  fontWeight: '600',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  🔒 Secure PropReports Access
                </h2>
                <p style={{ 
                  margin: 0,
                  opacity: 0.9,
                  fontSize: 'var(--vortex-font-size-sm)'
                }}>
                  Live trading data and account management
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: 'var(--vortex-radius-lg)',
                backdropFilter: 'blur(10px)'
              }}>
                <svg 
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span style={{ fontWeight: '600', fontSize: 'var(--vortex-font-size-sm)' }}>
                  Session Active
                </span>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div style={{ 
              padding: 'var(--vortex-spacing-8)',
              textAlign: 'center',
              background: 'var(--vortex-white)'
            }}>
              <div className="vortex-flex vortex-items-center vortex-justify-center vortex-flex-col" style={{ gap: '20px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid var(--vortex-gray-200)',
                  borderTop: '4px solid var(--vortex-primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <div>
                  <h3 style={{ 
                    margin: 0,
                    marginBottom: '8px',
                    color: 'var(--vortex-gray-900)',
                    fontSize: 'var(--vortex-font-size-lg)'
                  }}>
                    Loading PropReports Dashboard
                  </h3>
                  <p style={{ 
                    margin: 0,
                    color: 'var(--vortex-gray-600)',
                    fontSize: 'var(--vortex-font-size-sm)'
                  }}>
                    Establishing secure connection to your trading data...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Content Container */}
          {!isLoading && (
            <div className="vortex-iframe-container">
              <iframe
                key={iframeKey}
                src={`/.netlify/functions/proxy?session=${session?.token || ''}&path=/report.php`}
                title="PropReports Dashboard"
                onLoad={() => {
                  setTimeout(() => setIsLoading(false), 1000);
                  setError('');
                }}
                onError={() => {
                  setIsLoading(false);
                  setError('Failed to load PropReports content. Please try refreshing.');
                }}
              />
            </div>
          )}
        </div>

        {/* Modern Footer */}
        <div className="vortex-text-center vortex-mt-8">
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: 'var(--vortex-spacing-4)',
            borderRadius: 'var(--vortex-radius-lg)',
            border: '1px solid var(--vortex-gray-200)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div className="vortex-flex vortex-items-center" style={{ gap: '8px' }}>
              <svg 
                style={{ width: '20px', height: '20px', color: 'var(--vortex-primary)' }}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={{ 
                fontSize: 'var(--vortex-font-size-sm)',
                color: 'var(--vortex-gray-700)',
                fontWeight: '600'
              }}>
                Vortex Capital Group PropReports Portal
              </span>
            </div>
            <span style={{ color: 'var(--vortex-gray-400)' }}>•</span>
            <a 
              href="https://www.vortexcapitalgroup.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--vortex-primary)', 
                textDecoration: 'none',
                fontSize: 'var(--vortex-font-size-sm)',
                fontWeight: '500'
              }}
            >
              Visit Main Site
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;