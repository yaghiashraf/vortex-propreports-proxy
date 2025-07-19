// API utility functions for PropReports proxy

const API_BASE_URL = '/.netlify/functions';

export class AuthError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Make authenticated request to PropReports
 */
export const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthError('Authentication failed', 401);
      }
      if (response.status === 403) {
        throw new AuthError('Access denied', 403);
      }
      if (response.status >= 500) {
        throw new NetworkError('Server error occurred');
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    if (error instanceof AuthError || error instanceof NetworkError) {
      throw error;
    }
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new NetworkError('Network connection failed');
    }
    
    throw new Error(`Request failed: ${error.message}`);
  }
};

/**
 * Authenticate with PropReports
 */
export const authenticate = async (credentials) => {
  try {
    const response = await makeRequest(`${API_BASE_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success) {
      // Store session info securely
      const sessionData = {
        token: response.token + '_' + credentials.userId,
        userId: credentials.userId,
        timestamp: Date.now(),
      };
      
      // Store in sessionStorage (cleared when browser/tab closes)
      sessionStorage.setItem('vortex_propreports_session', JSON.stringify(sessionData));
      
      return sessionData;
    } else {
      throw new AuthError(response.message || 'Authentication failed');
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Login failed. Please check your credentials.');
  }
};

/**
 * Check if user is authenticated
 */
export const checkAuthentication = () => {
  try {
    const sessionData = sessionStorage.getItem('vortex_propreports_session');
    if (!sessionData) return null;

    const session = JSON.parse(sessionData);
    
    // Check if session is expired (24 hours)
    const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
    if (Date.now() - session.timestamp > expirationTime) {
      sessionStorage.removeItem('vortex_propreports_session');
      return null;
    }

    return session;
  } catch (error) {
    // Clear corrupted session data
    sessionStorage.removeItem('vortex_propreports_session');
    return null;
  }
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    // Clear session storage
    sessionStorage.removeItem('vortex_propreports_session');
    
    // Optional: notify server about logout
    await makeRequest(`${API_BASE_URL}/logout`, {
      method: 'POST',
    }).catch(() => {
      // Ignore errors on logout - client-side cleanup is sufficient
    });
    
    return true;
  } catch (error) {
    // Always return true for logout - even if server call fails
    return true;
  }
};

/**
 * Get PropReports content
 */
export const getPropreportsContent = async (session) => {
  if (!session || !session.token) {
    throw new AuthError('No valid session found');
  }

  return await makeRequest(`${API_BASE_URL}/proxy`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session.token}`,
    },
  });
};

/**
 * Refresh session if needed
 */
export const refreshSession = async () => {
  const session = checkAuthentication();
  if (!session) return null;

  // If session is older than 1 hour, try to refresh
  const refreshThreshold = 60 * 60 * 1000; // 1 hour
  if (Date.now() - session.timestamp > refreshThreshold) {
    try {
      const refreshed = await makeRequest(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.token}`,
        },
      });

      if (refreshed.success) {
        const newSession = {
          ...session,
          token: refreshed.token,
          timestamp: Date.now(),
        };
        sessionStorage.setItem('vortex_propreports_session', JSON.stringify(newSession));
        return newSession;
      }
    } catch (error) {
      // If refresh fails, clear session
      sessionStorage.removeItem('vortex_propreports_session');
      return null;
    }
  }

  return session;
};

export default {
  authenticate,
  checkAuthentication,
  logout,
  getPropreportsContent,
  refreshSession,
  makeRequest,
};