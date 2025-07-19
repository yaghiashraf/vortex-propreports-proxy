import React, { useState } from 'react';
import TradingRecords from './TradingRecords';
import '../styles/vortex-theme.css';

const Dashboard = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState('reports');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const tabs = [
    { id: 'reports', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  return (
    <div className="vortex-dashboard-container">
      {/* Header Navigation */}
      <nav className="vortex-nav">
        <div className="vortex-container">
          <div className="vortex-flex vortex-items-center vortex-justify-between">
            {/* Logo and Brand */}
            <div className="vortex-flex vortex-items-center">
              <img 
                src="/vortex-logo.svg" 
                alt="Vortex Capital Group" 
                style={{ 
                  height: '40px', 
                  marginRight: 'var(--vortex-spacing-4)',
                  filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.1))'
                }}
              />
              <div>
                <h1 style={{ 
                  fontSize: 'var(--vortex-font-size-2xl)',
                  fontWeight: '700',
                  color: 'var(--vortex-text-primary)',
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
                  color: 'var(--vortex-text-muted)',
                  fontWeight: '500'
                }}>
                  PropReports Portal
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="vortex-flex vortex-items-center" style={{ gap: '4px' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`vortex-btn ${activeTab === tab.id ? 'vortex-btn-primary' : 'vortex-btn-secondary'}`}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* User Info and Actions */}
            <div className="vortex-flex vortex-items-center" style={{ gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--vortex-bg-surface)',
                padding: '8px 12px',
                borderRadius: 'var(--vortex-radius-lg)',
                border: '1px solid var(--vortex-border-primary)'
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
                  color: 'var(--vortex-text-primary)',
                  fontWeight: '600'
                }}>
                  {session?.userId || 'VCGMGR'}
                </span>
              </div>
              
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
        paddingTop: 'var(--vortex-spacing-6)', 
        paddingBottom: 'var(--vortex-spacing-8)' 
      }}>
        {/* Tab Content */}
        {activeTab === 'reports' && (
          <TradingRecords session={session} />
        )}

        {activeTab === 'search' && (
          <div className="vortex-reports-container">
            <div className="vortex-reports-header">
              <h2 className="vortex-heading-3">Search Executions</h2>
            </div>
            
            <div className="vortex-form-grid">
              <div className="vortex-form-group">
                <label className="vortex-label">Symbol</label>
                <input 
                  type="text"
                  className="vortex-input"
                  placeholder="Enter symbol (e.g., AAPL, TSLA)"
                />
              </div>
              
              <div className="vortex-form-group">
                <label className="vortex-label">Trade Type</label>
                <select className="vortex-select">
                  <option value="">All</option>
                  <option value="1">All Buys</option>
                  <option value="2">All Sells</option>
                  <option value="B">Buy</option>
                  <option value="C">Cover</option>
                  <option value="S">Sell</option>
                  <option value="T">Short</option>
                </select>
              </div>
              
              <div className="vortex-form-group">
                <label className="vortex-label">Quantity</label>
                <input 
                  type="number"
                  className="vortex-input"
                  placeholder="Minimum quantity"
                />
              </div>
              
              <div className="vortex-form-group">
                <label className="vortex-label">Price Range</label>
                <input 
                  type="text"
                  className="vortex-input"
                  placeholder="e.g., 100-200"
                />
              </div>
            </div>
            
            <button className="vortex-btn vortex-btn-primary">
              <svg 
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Executions
            </button>

            <div className="vortex-text-center" style={{ marginTop: '60px' }}>
              <p className="vortex-text">Enter search criteria and click "Search Executions" to find specific trades.</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="vortex-reports-container">
            <div className="vortex-reports-header">
              <h2 className="vortex-heading-3">User Profile</h2>
            </div>
            
            <div className="vortex-stats-grid">
              <div className="vortex-stat-card">
                <span className="vortex-stat-value">VCGMGR</span>
                <span className="vortex-stat-label">User ID</span>
              </div>
              <div className="vortex-stat-card">
                <span className="vortex-stat-value">Active</span>
                <span className="vortex-stat-label">Account Status</span>
              </div>
              <div className="vortex-stat-card">
                <span className="vortex-stat-value">3</span>
                <span className="vortex-stat-label">Groups</span>
              </div>
              <div className="vortex-stat-card">
                <span className="vortex-stat-value">60+</span>
                <span className="vortex-stat-label">Accounts</span>
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <h4 className="vortex-heading-3" style={{ fontSize: 'var(--vortex-font-size-lg)' }}>
                Account Access
              </h4>
              <p className="vortex-text">
                You have access to multiple Vortex Capital Group trading accounts across different groups.
                Use the Reports tab to generate detailed trading reports and analyze performance.
              </p>
              
              <div style={{ 
                background: 'var(--vortex-bg-surface)',
                padding: 'var(--vortex-spacing-4)',
                borderRadius: 'var(--vortex-radius-lg)',
                border: '1px solid var(--vortex-border-primary)',
                marginTop: '20px'
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
                <p className="vortex-text-sm" style={{ margin: 0 }}>
                  Your session is securely connected to PropReports. All data is transmitted using encrypted connections.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="vortex-text-center" style={{ marginTop: '60px' }}>
          <div style={{
            background: 'var(--vortex-bg-card)',
            border: '1px solid var(--vortex-border-primary)',
            padding: 'var(--vortex-spacing-4)',
            borderRadius: 'var(--vortex-radius-lg)',
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
                color: 'var(--vortex-text-primary)',
                fontWeight: '600'
              }}>
                Vortex Capital Group PropReports Portal
              </span>
            </div>
            <span style={{ color: 'var(--vortex-text-muted)' }}>•</span>
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