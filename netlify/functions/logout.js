// Netlify Function for PropReports Logout
const https = require('https');

const PROPREPORTS_BASE_URL = 'vortexcap.propreports.com';

// Helper function to make HTTP requests
const makeRequest = (options) => {
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
    
    req.end();
  });
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
    // Extract session token from headers
    const sessionToken = event.headers.authorization?.replace('Bearer ', '');
    
    if (sessionToken && sessionToken.startsWith('vortex_')) {
      // Make logout request to PropReports
      const requestOptions = {
        hostname: PROPREPORTS_BASE_URL,
        port: 443,
        path: '/logout.php',
        method: 'POST',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; VortexCapitalGroup/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Connection': 'keep-alive',
          // Note: In production, you'd use the actual session cookies
          'Cookie': 'PHPSESSID=' + sessionToken.replace('vortex_', '')
        }
      };

      try {
        await makeRequest(requestOptions);
        // Don't worry if logout request fails - client-side cleanup is sufficient
      } catch (error) {
        console.log('PropReports logout request failed, but continuing with cleanup');
      }
    }

    // Always return success for logout
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Logout successful'
      })
    };
    
  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if there's an error, return success for logout
    // Client-side session cleanup is the most important part
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Logout completed'
      })
    };
  }
};