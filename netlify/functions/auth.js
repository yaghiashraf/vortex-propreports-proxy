// Netlify Function for PropReports Authentication Proxy
const https = require('https');
const querystring = require('querystring');

const PROPREPORTS_LOGIN_URL = 'vortexcap.propreports.com';
const PROPREPORTS_LOGIN_PATH = '/login.php';

// Helper function to make HTTP requests
const makeRequest = (options, postData = null) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
};

// Extract session cookies from response headers
const extractSessionCookies = (headers) => {
  const cookies = headers['set-cookie'] || [];
  return cookies.filter(cookie => 
    cookie.includes('PHPSESSID') || 
    cookie.includes('session') || 
    cookie.includes('auth')
  );
};

// Generate a simple token for session management
const generateSessionToken = () => {
  return 'vortex_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Method not allowed' 
      })
    };
  }

  try {
    // Parse request body
    const { userId, password } = JSON.parse(event.body);
    
    if (!userId || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'User ID and password are required' 
        })
      };
    }

    // Prepare login data for PropReports
    const loginData = querystring.stringify({
      user: userId,
      password: password
    });

    // Make request to PropReports login
    const requestOptions = {
      hostname: PROPREPORTS_LOGIN_URL,
      port: 443,
      path: PROPREPORTS_LOGIN_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(loginData),
        'User-Agent': 'Mozilla/5.0 (compatible; VortexCapitalGroup/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    };

    const response = await makeRequest(requestOptions, loginData);
    
    // Check if login was successful
    // PropReports typically redirects on successful login or shows error message
    const isLoginSuccessful = response.statusCode === 302 || 
                             (response.statusCode === 200 && !response.body.includes('error') && !response.body.includes('Invalid'));

    if (isLoginSuccessful) {
      // Extract session cookies for future requests
      const sessionCookies = extractSessionCookies(response.headers);
      const sessionToken = generateSessionToken();
      
      // In a production environment, you'd want to store this in a secure database
      // For now, we'll return the token and let the client handle session management
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token: sessionToken,
          message: 'Authentication successful',
          // Note: In production, you might want to store cookies server-side for security
          cookies: sessionCookies
        })
      };
    } else {
      // Authentication failed
      let errorMessage = 'Invalid credentials';
      
      // Try to extract specific error message from response
      if (response.body.includes('Invalid')) {
        errorMessage = 'Invalid User ID or Password';
      } else if (response.body.includes('locked') || response.body.includes('disabled')) {
        errorMessage = 'Account is locked or disabled';
      } else if (response.body.includes('expired')) {
        errorMessage = 'Password has expired';
      }
      
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: errorMessage
        })
      };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Authentication service temporarily unavailable'
      })
    };
  }
};