# Vortex Capital Group PropReports Proxy

A secure proxy application that provides branded access to PropReports for Vortex Capital Group clients.

## =€ Features

- **Branded Interface**: Custom Vortex Capital Group styling and branding
- **Secure Authentication**: Credentials are securely forwarded, never stored
- **Responsive Design**: Works on desktop and mobile devices
- **Session Management**: Automatic session handling and timeout
- **Netlify Deployment**: Serverless architecture with Netlify Functions

## <× Architecture

- **Frontend**: React + Vite with custom Vortex Capital Group theme
- **Backend**: Netlify Functions for authentication and content proxy
- **Hosting**: Netlify with custom domain support
- **Security**: HTTPS, secure headers, and credential forwarding

## =à Quick Setup

### 1. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Netlify Deployment

1. **Connect to GitHub**: Push code and connect repository to Netlify
2. **Configure Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Custom Domain**: Add `propreports.vortexcapitalgroup.com`

### 3. Testing

**Test Credentials:**
- Username: `VCGMGR`
- Password: `july1980`

## = Security Features

- No credential storage
- Session timeout (24 hours)
- HTTPS only
- CORS protection
- Content Security Policy
- XSS protection headers

## <¨ Customization

Update branding in `src/styles/vortex-theme.css` and add logo files to `public/` directory.

## =È Live Demo

The application successfully connects to PropReports and displays:
-  Real-time trading executions
-  Multiple account access (60+ Vortex Capital accounts)
-  Full dashboard functionality
-  Reports, Search, Profile sections
-  Trade performance data
-  Position management

## =€ Deployment Steps

1. **GitHub Repository**:
   ```bash
   git add .
   git commit -m "Initial commit - Vortex Capital PropReports Proxy"
   git remote add origin https://github.com/vortexcapitalgroup/propreports-proxy.git
   git push -u origin main
   ```

2. **Netlify Setup**:
   - Connect GitHub repository
   - Configure build settings
   - Add custom domain: `propreports.vortexcapitalgroup.com`
   - Enable HTTPS

3. **Update Main Website**:
   Update the PropReports link on `vortexcapitalgroup.com` to point to:
   ```
   https://propreports.vortexcapitalgroup.com
   ```

## >ê Testing Results

 **Authentication**: Successfully tested with provided credentials  
 **Data Access**: Live trading data retrieved  
 **Account Access**: 60+ Vortex Capital accounts available  
 **Session Management**: PropReports session maintained  
 **UI Integration**: Branded interface working  

## =Ä License

Proprietary - Vortex Capital Group

---

**Ready for deployment!** <‰