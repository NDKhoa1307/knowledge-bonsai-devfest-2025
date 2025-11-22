# Environment Setup Guide

## Quick Start

Create a `.env` file in the project root with the following content:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Knowledge Bonsai

# Mock Mode - Set to 'true' to run without backend server
# Useful for development and testing the UI
VITE_MOCK_MODE=true
```

## Configuration Options

### VITE_API_BASE_URL
The base URL for your backend API server.

- **Development**: `http://localhost:3000`
- **Production**: `https://your-api-domain.com`

### VITE_APP_NAME
The application name displayed in the UI.

- Default: `Knowledge Bonsai`

### VITE_MOCK_MODE
Enables mock/demo mode without requiring a backend server.

- **`true`**: Use mock AI responses and demo trees (no backend needed)
- **`false`** or empty: Connect to real backend via Socket.IO

## Usage Scenarios

### 1. Development Without Backend (Mock Mode)

```env
VITE_MOCK_MODE=true
```

**Features:**
- ✅ Full UI functionality
- ✅ Mock AI responses
- ✅ Demo tree generation
- ✅ No backend required
- ❌ No real AI (predefined responses)
- ❌ No data persistence

**Best for:**
- Frontend development
- UI/UX testing
- Demos and presentations

### 2. Development With Backend

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_MOCK_MODE=false
```

**Features:**
- ✅ Real Socket.IO connection
- ✅ AI-powered responses
- ✅ Dynamic tree generation
- ✅ Data persistence
- ✅ Full backend integration

**Best for:**
- Full-stack development
- Integration testing
- Production-like environment

### 3. Production

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_MOCK_MODE=false
VITE_APP_NAME=Knowledge Bonsai
```

**Requirements:**
- Backend server running
- Socket.IO configured
- AI API keys set up
- Database connected

## Troubleshooting

### WebSocket Connection Failed

**Error:**
```
WebSocket connection to 'ws://localhost:3000/socket.io/...' failed
```

**Solutions:**

1. **Enable Mock Mode** (quickest for frontend development):
   ```env
   VITE_MOCK_MODE=true
   ```

2. **Start Backend Server**:
   - Ensure your backend is running on the specified port
   - Check `VITE_API_BASE_URL` matches your backend URL
   - Verify Socket.IO is properly configured on backend

3. **Check Firewall**:
   - Allow WebSocket connections
   - Check port 3000 (or your configured port) is open

4. **CORS Configuration**:
   - Ensure backend CORS allows your frontend origin
   - Check Socket.IO CORS settings

### Connection Works But No Responses

**Possible Issues:**
- Backend not handling socket events correctly
- AI API keys not configured on backend
- Check backend logs for errors

**Quick Fix:**
```env
VITE_MOCK_MODE=true  # Temporary workaround
```

## Mock Mode Behavior

When `VITE_MOCK_MODE=true`:

### Mock AI Responses

| User Input | AI Response |
|-----------|-------------|
| "front-end" / "frontend" | Generates frontend learning tree |
| "back-end" / "backend" | Generates backend learning tree |
| Other "learn" keywords | Helpful prompt for more info |
| General text | Encouragement to specify topic |

### Mock Tree Generation

- Uses `mockFrontendTree` from `src/data/mockData.ts`
- Automatically displays in Knowledge Graph
- Simulates 1.5s AI "thinking" time

### Visual Indicators

- Connection status shows as "Connected"
- AI name shows "(Mock)" suffix
- Demo message on initial load

## Environment Variables Reference

```env
# ============================================
# Knowledge Bonsai - Environment Configuration
# ============================================

# Required: Backend API base URL
VITE_API_BASE_URL=http://localhost:3000

# Optional: Application name
VITE_APP_NAME=Knowledge Bonsai

# Optional: Enable mock mode (true/false)
# Set to 'true' for frontend-only development
VITE_MOCK_MODE=true

# ============================================
# Notes:
# - All variables must start with VITE_ prefix
# - Changes require dev server restart
# - Never commit .env with sensitive data
# ============================================
```

## Security Notes

### ⚠️ Do NOT commit `.env` with:
- API keys
- Passwords
- Production URLs
- Sensitive configuration

### ✅ Safe to commit `.env.example`:
- Template with placeholder values
- Documentation for other developers
- No sensitive information

## Testing Different Modes

### Test Mock Mode
```bash
# 1. Set mock mode
echo "VITE_MOCK_MODE=true" > .env

# 2. Restart dev server
npm run dev

# 3. Go to /chat and test AI responses
```

### Test Real Backend
```bash
# 1. Disable mock mode
echo "VITE_MOCK_MODE=false" > .env
echo "VITE_API_BASE_URL=http://localhost:3000" >> .env

# 2. Start backend server (in separate terminal)
cd backend
npm start

# 3. Start frontend
npm run dev

# 4. Test real Socket.IO connection
```

## Common Setup Examples

### Frontend Developer (No Backend)
```env
VITE_MOCK_MODE=true
VITE_APP_NAME=Knowledge Bonsai Dev
```

### Full-Stack Local Development
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_MOCK_MODE=false
VITE_APP_NAME=Knowledge Bonsai Local
```

### Staging Environment
```env
VITE_API_BASE_URL=https://staging-api.yourdomain.com
VITE_MOCK_MODE=false
VITE_APP_NAME=Knowledge Bonsai Staging
```

### Production Environment
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_MOCK_MODE=false
VITE_APP_NAME=Knowledge Bonsai
```

## FAQ

**Q: Do I need a backend to develop frontend features?**  
A: No! Set `VITE_MOCK_MODE=true` and develop without any backend.

**Q: Can I switch between mock and real mode?**  
A: Yes, just change `VITE_MOCK_MODE` and restart the dev server.

**Q: Will mock mode work in production?**  
A: It will work but isn't recommended. Use real backend for production.

**Q: How do I know if I'm in mock mode?**  
A: AI name shows "(Mock)" suffix and initial message mentions "demo mode".

**Q: Can I customize mock responses?**  
A: Yes! Edit the `handleMockAIResponse` function in `src/page/ChatBox/chatbox.tsx`.

## Next Steps

1. **Create `.env` file** with your chosen configuration
2. **Restart dev server** (`npm run dev`)
3. **Navigate to `/chat`** and test
4. **View generated trees** at `/graph`

For backend setup, see `SOCKET_IO_BACKEND_GUIDE.md`

