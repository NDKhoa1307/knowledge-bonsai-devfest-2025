# HTTP API Integration Guide

## ✅ Implementation Complete!

Your ChatBox now sends messages to the backend via **HTTP POST API** instead of WebSocket/Socket.IO.

## 📡 API Endpoint

- **URL**: `POST http://localhost:3000/trees`
- **Content-Type**: `application/json`

## 📦 Request Format

```json
{
  "username": "User",
  "content": {
    "text": "hello"
  }
}
```

## 📥 Expected Response Format

Your backend should return:

```json
{
  "success": true,
  "message": "AI response text here",
  "tree": {
    // Optional: Knowledge tree data
  }
}
```

## 🔍 How It Works

### 1. **User Sends Message**
When you type and send a message, the app will:

```javascript
// Call the HTTP API
const response = await sendChatMessage(username, messageText);
```

### 2. **Console Output (Backend Mode)**

```
📤 [User Message] Sending message...
🆔 Message ID: 1763801444035 (Generated from Date.now() - Unix timestamp in milliseconds)
👤 Username: User
💬 Message: hello
⏰ Timestamp: 2025-11-22T10:30:45.123Z
📋 Full message object: {...}
---
🌐 [BACKEND MODE] Calling HTTP API...
🚀 [ChatService] Sending message to backend...
📍 [ChatService] Endpoint: http://localhost:3000/trees
📦 [ChatService] Request payload:
{
  "username": "User",
  "content": {
    "text": "hello"
  }
}
✅ [ChatService] Response received successfully!
📥 [ChatService] Status: 200
📥 [ChatService] Response data: {...}
✅ [ChatBox] Backend response received: {...}
```

### 3. **Console Output (Mock Mode)**

```
📤 [User Message] Sending message...
🆔 Message ID: 1763801444035
👤 Username: User
💬 Message: hello
⏰ Timestamp: 2025-11-22T10:30:45.123Z
📋 Full message object: {...}
---
🔍 [ChatService] Environment Check:
   - VITE_MOCK_MODE: true
   - VITE_API_BASE_URL: http://localhost:3000
   - Using Mock Mode: true
🎭 [MOCK MODE] Generating mock AI response locally
📄 [MOCK DATA] Simulated request:
{
  "username": "User",
  "content": {
    "text": "hello"
  }
}
```

## 🎯 Mode Selection

The app automatically chooses the mode:

### Backend Mode (HTTP API)
- When: `VITE_MOCK_MODE=false` or not set to "true"
- Behavior: Sends HTTP POST to your backend
- No WebSocket connection needed!

### Mock Mode
- When: `VITE_MOCK_MODE=true`
- Behavior: Uses local mock data, no backend calls

## ⚙️ Configuration

### To Use Backend (HTTP API):

**Option 1**: No `.env` file (uses default)
- Will connect to `http://localhost:3000` by default

**Option 2**: `.env` file
```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_MOCK_MODE=false
```

### To Use Mock Mode:

```bash
VITE_MOCK_MODE=true
```

## 🔧 Code Structure

### `src/service/chatService.ts`
- `sendChatMessage(username, text)` - Sends POST request
- `shouldUseMockMode()` - Checks environment for mode
- Comprehensive error handling and logging

### `src/page/ChatBox/chatbox.tsx`
- Uses `sendChatMessage()` for backend communication
- Displays AI responses from backend
- Handles tree data if returned
- No Socket.IO dependency for messaging!

## 🧪 Testing

### 1. Start Backend
Make sure your backend is running on port 3000

### 2. Configure Mode
Set `VITE_MOCK_MODE=false` in `.env`

### 3. Restart Frontend
```bash
npm run dev
```

### 4. Send Message
Type "hello" and send. Check console for:
- Request payload
- Response data
- Status codes

### 5. Check Network Tab
- Open DevTools (F12)
- Go to Network tab
- Send message
- See POST request to `/trees`

## 📊 What You'll See in Network Tab

**Request:**
- Method: `POST`
- URL: `http://localhost:3000/trees`
- Headers: `Content-Type: application/json`
- Payload:
  ```json
  {
    "username": "User",
    "content": {
      "text": "hello"
    }
  }
  ```

**Response:**
- Status: `200 OK`
- Your backend response data

## ✨ Features

- ✅ HTTP POST API communication
- ✅ Comprehensive console logging
- ✅ Error handling with user-friendly messages
- ✅ Mock mode for development without backend
- ✅ Tree data handling
- ✅ 30-second timeout
- ✅ Axios-based HTTP client
- ✅ TypeScript typed interfaces

## 🚀 Summary

Your frontend now sends messages using HTTP POST to `http://localhost:3000/trees` with the exact payload format you specified:

```json
{
  "username": "User",
  "content": {
    "text": "hello"
  }
}
```

No WebSocket errors anymore! Just clean HTTP API calls. 🎉

