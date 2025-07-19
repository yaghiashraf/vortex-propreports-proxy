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
    <div className="vortex-min-h-screen" style={{ backgroundColor: 'var(--vortex-gray-50)' }}>
      {/* Header Navigation */}
      <nav className="vortex-nav">
        <div className="vortex-container">
          <div className="vortex-flex vortex-items-center vortex-justify-between">
            <div className="vortex-flex vortex-items-center">
              <h1 className="vortex-heading-3" style={{ color: 'var(--vortex-primary)', margin: 0 }}>
                Vortex Capital Group
              </h1>
              <span className="vortex-text-sm" style={{ 
                marginLeft: '12px', 
                color: 'var(--vortex-gray-500)' 
              }}>
                PropReports Dashboard
              </span>
            </div>
            
            <div className="vortex-flex vortex-items-center" style={{ gap: '12px' }}>
              <button 
                onClick={refreshContent}
                className="vortex-btn vortex-btn-secondary"
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                Refresh
              </button>
              <button 
                onClick={handleLogout}
                className="vortex-btn vortex-btn-secondary"
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="vortex-container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        {error && (
          <div className="vortex-alert vortex-alert-error vortex-mb-4">
            {error}
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="vortex-card vortex-text-center vortex-mb-4">
            <div className="vortex-flex vortex-items-center vortex-justify-center" style={{ padding: '40px' }}>
              <div className="vortex-spinner" style={{ marginRight: '12px' }}></div>
              <span>Loading PropReports Dashboard...</span>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div className="vortex-card" style={{ 
          padding: 0, 
          overflow: 'hidden',
          minHeight: '600px',
          display: isLoading ? 'none' : 'block'
        }}>
          {/* PropReports Integration Notice */}
          <div style={{ 
            backgroundColor: 'var(--vortex-primary)', 
            color: 'white', 
            padding: '12px 20px',
            fontSize: '14px'
          }}>
            <div className="vortex-flex vortex-items-center vortex-justify-between">
              <span>🔒 Secure PropReports Access</span>
              <span>Session Active</span>
            </div>
          </div>

          {/* Iframe Container */}
          <div style={{ position: 'relative', width: '100%', height: '600px' }}>
            <iframe
              key={iframeKey}
              src={`/.netlify/functions/proxy?session=${session?.token || ''}`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="PropReports Dashboard"
              onLoad={() => {
                setIsLoading(false);
                setError('');
              }}
              onError={() => {
                setIsLoading(false);
                setError('Failed to load PropReports content. Please try refreshing.');
              }}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="vortex-text-center vortex-mt-6">
          <p className="vortex-text-sm" style={{ color: 'var(--vortex-gray-500)' }}>
            Vortex Capital Group PropReports Portal • 
            <a 
              href="https://www.vortexcapitalgroup.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--vortex-primary)', 
                textDecoration: 'none',
                marginLeft: '4px'
              }}
            >
              Visit Main Site
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;