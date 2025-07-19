// Netlify Function for PropReports Content Proxy
const https = require('https');
const http = require('http');

const PROPREPORTS_BASE_URL = 'vortexcap.propreports.com';

// Helper function to make HTTP requests
const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    const client = options.port === 443 ? https : http;
    
    const req = client.request(options, (res) => {
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

// Function to modify PropReports HTML content for embedding
const modifyContentForEmbedding = (html) => {
  // Remove or modify elements that might interfere with embedding
  let modifiedHtml = html;
  
  // Remove frame-busting scripts
  modifiedHtml = modifiedHtml.replace(/<script[^>]*>[\s\S]*?if.*?top.*?!=.*?self.*?[\s\S]*?<\/script>/gi, '');
  modifiedHtml = modifiedHtml.replace(/if\s*\(\s*top\s*!=\s*self\s*\)/gi, 'if(false)');
  
  // Add base tag to ensure relative URLs work
  const baseTag = `<base href="https://${PROPREPORTS_BASE_URL}/">`;
  modifiedHtml = modifiedHtml.replace(/<head>/i, `<head>${baseTag}`);
  
  // Add custom styles to improve embedding
  const customStyles = `
    <style>
      /* Vortex Capital Group Embedded Styles */
      body { 
        margin: 0 !important; 
        padding: 10px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }
      
      /* Hide potential navigation elements that might cause issues */
      .header-logout, .main-navigation { 
        display: none !important; 
      }
      
      /* Ensure content fits well in iframe */
      .main-content, .dashboard-content {
        max-width: 100% !important;
        overflow-x: auto !important;
      }
      
      /* Style adjustments for better embedding */
      table {
        font-size: 12px !important;
        width: 100% !important;
      }
      
      /* Add Vortex branding indicator */
      body::before {
        content: "Powered by Vortex Capital Group";
        display: block;
        background: #1e40af;
        color: white;
        padding: 5px 10px;
        font-size: 11px;
        text-align: center;
        margin: -10px -10px 10px -10px;
      }
    </style>
  `;
  
  modifiedHtml = modifiedHtml.replace(/<\/head>/i, `${customStyles}</head>`);
  
  // Modify forms to work through proxy
  modifiedHtml = modifiedHtml.replace(/action="([^"]*?)"/gi, (match, action) => {
    if (action.startsWith('http')) {
      return match; // Keep absolute URLs as-is
    }
    return `action="/.netlify/functions/proxy${action.startsWith('/') ? '' : '/'}${action}"`;
  });
  
  return modifiedHtml;
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Extract session token from query parameters or headers
    const sessionToken = event.queryStringParameters?.session || 
                        event.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken || !sessionToken.startsWith('vortex_')) {
      // Return a login prompt page instead of error
      const loginPromptHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Vortex Capital Group - PropReports Access</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px;
              background: #f8fafc;
            }
            .message {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 400px;
              margin: 0 auto;
            }
            .logo { color: #1e40af; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="message">
            <div class="logo">Vortex Capital Group</div>
            <h2>Session Required</h2>
            <p>Please refresh the page to establish a secure connection to PropReports.</p>
            <button onclick="parent.location.reload()" style="
              background: #1e40af; 
              color: white; 
              border: none; 
              padding: 10px 20px; 
              border-radius: 5px; 
              cursor: pointer;
              font-size: 14px;
            ">Refresh Page</button>
          </div>
        </body>
        </html>
      `;
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'text/html'
        },
        body: loginPromptHtml
      };
    }

    // Determine the path to request from PropReports
    let targetPath = event.queryStringParameters?.path || '/dashboard.php';
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + targetPath;
    }

    // Prepare request options for PropReports
    const requestOptions = {
      hostname: PROPREPORTS_BASE_URL,
      port: 443,
      path: targetPath,
      method: event.httpMethod,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VortexCapitalGroup/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        // Note: In production, you'd retrieve and use the actual session cookies
        // For demo purposes, we'll use a static session for the working credentials
        'Cookie': sessionToken.includes('VCGMGR') ? 'PHPSESSID=s32vtd011n3kfm97li7oe565ni' : 'PHPSESSID=' + sessionToken.replace('vortex_', '')
      }
    };

    // Make request to PropReports
    const response = await makeRequest(requestOptions);
    
    if (response.statusCode === 200) {
      // Modify content for embedding
      const modifiedContent = modifyContentForEmbedding(response.body);
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'text/html; charset=utf-8',
          'X-Frame-Options': 'SAMEORIGIN'
        },
        body: modifiedContent
      };
    } else if (response.statusCode === 302) {
      // Handle redirects
      const location = response.headers.location;
      if (location) {
        // If it's a redirect to login, show session expired message
        if (location.includes('login')) {
          const sessionExpiredHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Session Expired</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  text-align: center; 
                  padding: 50px;
                  background: #f8fafc;
                }
                .message {
                  background: white;
                  padding: 30px;
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                  max-width: 400px;
                  margin: 0 auto;
                }
                .logo { color: #1e40af; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
              </style>
            </head>
            <body>
              <div class="message">
                <div class="logo">Vortex Capital Group</div>
                <h2>Session Expired</h2>
                <p>Your PropReports session has expired. Please log in again.</p>
                <button onclick="parent.parent.location.reload()" style="
                  background: #1e40af; 
                  color: white; 
                  border: none; 
                  padding: 10px 20px; 
                  border-radius: 5px; 
                  cursor: pointer;
                  font-size: 14px;
                ">Login Again</button>
              </div>
            </body>
            </html>
          `;
          
          return {
            statusCode: 200,
            headers: {
              ...headers,
              'Content-Type': 'text/html'
            },
            body: sessionExpiredHtml
          };
        }
        
        // Follow the redirect
        const redirectPath = location.startsWith('/') ? location : '/' + location;
        return {
          statusCode: 302,
          headers: {
            ...headers,
            'Location': `/.netlify/functions/proxy?session=${sessionToken}&path=${encodeURIComponent(redirectPath)}`
          },
          body: ''
        };
      }
    }
    
    // Handle other status codes
    return {
      statusCode: response.statusCode,
      headers: {
        ...headers,
        'Content-Type': 'text/html'
      },
      body: response.body
    };
    
  } catch (error) {
    console.error('Proxy error:', error);
    
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error - Vortex Capital Group</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px;
            background: #f8fafc;
          }
          .error {
            background: #fef2f2;
            color: #dc2626;
            padding: 30px;
            border-radius: 8px;
            border: 1px solid #fecaca;
            max-width: 400px;
            margin: 0 auto;
          }
          .logo { color: #1e40af; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="error">
          <div class="logo">Vortex Capital Group</div>
          <h2>Service Unavailable</h2>
          <p>PropReports is temporarily unavailable. Please try again in a few moments.</p>
          <button onclick="parent.location.reload()" style="
            background: #dc2626; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            cursor: pointer;
            font-size: 14px;
          ">Retry</button>
        </div>
      </body>
      </html>
    `;
    
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'text/html'
      },
      body: errorHtml
    };
  }
};