import React, { useState, useEffect } from 'react';
import '../styles/vortex-theme.css';

const PropReportsDashboard = ({ session }) => {
  const [selectedReport, setSelectedReport] = useState('totalsByDate');
  const [selectedGroup, setSelectedGroup] = useState('200');
  const [selectedAccount, setSelectedAccount] = useState('1880');
  const [dateRange, setDateRange] = useState('custom');
  const [startDate, setStartDate] = useState('2025-07-18');
  const [endDate, setEndDate] = useState('2025-07-18');
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const reports = [
    { value: 'detailed', label: 'Detailed' },
    { value: 'trades', label: 'Trades' },
    { value: 'performance', label: 'Trade Performance' },
    { value: 'performanceForGroup', label: 'Group Trade Performance' },
    { value: 'performanceByAccount', label: 'Trade Performance by Account' },
    { value: 'totalsByDate', label: 'Totals By Date' },
    { value: 'summaryByDate', label: 'Summary By Date' },
    { value: 'summaryByDateForGroup', label: 'Group Summary By Date' },
    { value: 'topTen', label: 'Top/Bottom Ten' },
    { value: 'totalsByAccount', label: 'Totals By Account' },
    { value: 'totalsByGroup', label: 'Totals By Group' },
    { value: 'totalsBySymbol', label: 'Totals By Symbol' },
    { value: 'totalsBySymbolForGroup', label: 'Group Totals By Symbol' },
    { value: 'openPositions', label: 'Open Positions' },
    { value: 'openPositionsForGroup', label: 'Group Open Positions' },
    { value: 'openPositionsSummary', label: 'Open Positions Summary' },
    { value: 'openPositionsSummaryForGroup', label: 'Group Open Positions Summary' },
    { value: 'expiringOptions', label: 'Expiring Options' },
    { value: 'expiringOptionsForGroup', label: 'Expiring Options for Group' },
    { value: 'adjustment', label: 'Adjustments' },
    { value: 'adjustmentForGroup', label: 'Group Adjustments' }
  ];

  const groups = [
    { value: '200', label: 'LPVTX' },
    { value: '59', label: 'NVGOVTX' },
    { value: '136', label: 'SPPVTX' },
    { value: '-2', label: 'All Accounts' }
  ];

  const accounts = [
    { value: '1880', label: 'VCGAC' },
    { value: '2242', label: 'VCGAD' },
    { value: '1881', label: 'VCGAO' },
    { value: '1882', label: 'VCGBK' },
    { value: '2051', label: 'VCGBS' },
    { value: '1883', label: 'VCGCNL' },
    { value: '2002', label: 'VCGCV' },
    { value: '2105', label: 'VCGCW' },
    { value: '1884', label: 'VCGDAB' },
    { value: '1885', label: 'VCGDC' },
    { value: '1886', label: 'VCGDEPOSIT' },
    { value: '2007', label: 'VCGET' },
    { value: '2108', label: 'VCGFEI' },
    { value: '2018', label: 'VCGFW' },
    { value: '1887', label: 'VCGGD' },
    { value: '1989', label: 'VCGGG' },
    { value: '1888', label: 'VCGGJ' }
  ];

  const dateRanges = [
    { value: 'custom', label: 'Custom' },
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-week-to-date', label: 'This Week-to-date' },
    { value: 'this-month', label: 'This Month' },
    { value: 'this-month-to-date', label: 'This Month-to-date' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'this-quarter-to-date', label: 'This Quarter-to-date' },
    { value: 'this-year', label: 'This Year' },
    { value: 'this-year-to-date', label: 'This Year-to-date' },
    { value: 'last-day', label: 'Last Business Day' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-year', label: 'Last Year' }
  ];

  const sampleExecutions = [
    { time: '15:57:01', account: 'VCGLKL', side: 'T', qty: 98, symbol: 'MP', price: 63.14, route: 'DARKVPS', orderId: '465344891' },
    { time: '15:57:00', account: 'VCGLKL', side: 'T', qty: 283, symbol: 'MP', price: 63.14, route: 'DARKVPS', orderId: '465344901' },
    { time: '15:56:53', account: 'VCGLKL', side: 'T', qty: 100, symbol: 'MP', price: 63.15, route: 'DARKVPS', orderId: '465344901' },
    { time: '15:56:52', account: 'VCGLKL', side: 'B', qty: 150, symbol: 'TSLA', price: 248.87, route: 'DARKVPS', orderId: '465344891' },
    { time: '15:56:52', account: 'VCGLKL', side: 'T', qty: 200, symbol: 'AAPL', price: 192.45, route: 'DARKVPS', orderId: '465344896' }
  ];

  const generateReport = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to get report data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock report data based on selected report type
      const mockData = {
        startingCash: -2810.71,
        endingCash: -2810.71,
        unrealized: 0.00,
        executions: sampleExecutions,
        summary: {
          totalTrades: 247,
          totalVolume: 12450,
          pnl: 1250.45,
          commission: 123.50
        }
      };
      
      setReportData(mockData);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vortex-dashboard-container">
      {/* Report Configuration */}
      <div className="vortex-reports-container">
        <div className="vortex-reports-header">
          <h2 className="vortex-heading-3">PropReports Dashboard</h2>
          <div className="vortex-flex vortex-items-center" style={{ gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: 'var(--vortex-success)',
              borderRadius: '50%',
              boxShadow: '0 0 6px var(--vortex-success)'
            }}></div>
            <span className="vortex-text-sm">Connected as {session?.userId || 'VCGMGR'}</span>
          </div>
        </div>

        {error && (
          <div className="vortex-alert vortex-alert-error vortex-mb-4">
            {error}
          </div>
        )}

        {/* Report Form */}
        <form onSubmit={(e) => { e.preventDefault(); generateReport(); }}>
          <div className="vortex-form-grid">
            <div className="vortex-form-group">
              <label className="vortex-label">Report</label>
              <select 
                className="vortex-select"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                {reports.map(report => (
                  <option key={report.value} value={report.value}>
                    {report.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="vortex-form-group">
              <label className="vortex-label">Group</label>
              <select 
                className="vortex-select"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                {groups.map(group => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="vortex-form-group">
              <label className="vortex-label">Account</label>
              <select 
                className="vortex-select"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
              >
                {accounts.map(account => (
                  <option key={account.value} value={account.value}>
                    {account.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="vortex-form-group">
              <label className="vortex-label">Date Range</label>
              <select 
                className="vortex-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="vortex-form-group">
              <label className="vortex-label">From Date</label>
              <input 
                type="date"
                className="vortex-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="vortex-form-group">
              <label className="vortex-label">To Date</label>
              <input 
                type="date"
                className="vortex-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="vortex-btn vortex-btn-primary"
            disabled={isLoading}
            style={{ width: 'auto' }}
          >
            {isLoading ? (
              <div className="vortex-flex vortex-items-center">
                <div className="vortex-spinner" style={{ marginRight: '8px' }}></div>
                Generating Report...
              </div>
            ) : (
              <>
                <svg 
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Generate Report
              </>
            )}
          </button>
        </form>
      </div>

      {/* Report Results */}
      {reportData && !isLoading && (
        <div className="vortex-reports-container">
          <div className="vortex-reports-header">
            <h3 className="vortex-heading-3">
              {reports.find(r => r.value === selectedReport)?.label} for {accounts.find(a => a.value === selectedAccount)?.label}
            </h3>
            <button 
              onClick={() => window.print()}
              className="vortex-btn vortex-btn-secondary"
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              <svg 
                style={{ width: '16px', height: '16px', marginRight: '6px' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Export
            </button>
          </div>

          {/* Account Summary */}
          <div className="vortex-stats-grid">
            <div className="vortex-stat-card">
              <span className="vortex-stat-value">${reportData.startingCash.toLocaleString()}</span>
              <span className="vortex-stat-label">Starting Cash</span>
            </div>
            <div className="vortex-stat-card">
              <span className="vortex-stat-value">${reportData.endingCash.toLocaleString()}</span>
              <span className="vortex-stat-label">Ending Cash</span>
            </div>
            <div className="vortex-stat-card">
              <span className="vortex-stat-value">${reportData.unrealized.toFixed(2)}</span>
              <span className="vortex-stat-label">Unrealized P&L</span>
            </div>
            <div className="vortex-stat-card">
              <span className="vortex-stat-value">{reportData.summary.totalTrades}</span>
              <span className="vortex-stat-label">Total Trades</span>
            </div>
          </div>

          {/* Executions Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="vortex-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Account</th>
                  <th>Side</th>
                  <th>Qty</th>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Route</th>
                  <th>Order ID</th>
                </tr>
              </thead>
              <tbody>
                {reportData.executions.map((execution, index) => (
                  <tr key={index}>
                    <td>{execution.time}</td>
                    <td>{execution.account}</td>
                    <td style={{ 
                      color: execution.side === 'B' ? 'var(--vortex-success)' : 'var(--vortex-error)',
                      fontWeight: '600'
                    }}>
                      {execution.side === 'B' ? 'BUY' : execution.side === 'T' ? 'SELL' : execution.side}
                    </td>
                    <td>{execution.qty.toLocaleString()}</td>
                    <td style={{ fontWeight: '600', color: 'var(--vortex-primary)' }}>
                      {execution.symbol}
                    </td>
                    <td>${execution.price.toFixed(2)}</td>
                    <td>{execution.route}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.85em' }}>
                      {execution.orderId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reportData.executions.length === 0 && (
            <div className="vortex-text-center" style={{ padding: '60px 20px' }}>
              <p className="vortex-text">No data available for the time period specified.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropReportsDashboard;