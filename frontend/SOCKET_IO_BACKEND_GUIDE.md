# Socket.IO Backend Implementation Guide

## Overview

This guide explains how to implement the Socket.IO backend for the Knowledge Bonsai AI Chat feature.

## Installation

### Node.js/Express

```bash
npm install socket.io express cors
```

### Python/FastAPI

```bash
pip install python-socketio fastapi uvicorn
```

---

## Node.js/Express Implementation

### 1. Basic Server Setup

```javascript
// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

app.use(cors());
app.use(express.json());

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Handle user messages
  socket.on('user-message', async (data) => {
    console.log('📩 Received message:', data);
    
    // Extract message data
    const { username, content, timesend } = data;
    
    // Send typing indicator
    socket.emit('ai-typing', true);
    
    try {
      // Process with AI (example with OpenAI)
      const aiResponse = await processWithAI(content.text);
      
      // Send AI response back to client
      socket.emit('ai-response', {
        id: Date.now().toString(),
        username: 'AI Assistant',
        content: {
          text: aiResponse.message,
        },
        timesend: new Date().toISOString(),
      });
      
      // If AI generated a tree, send it
      if (aiResponse.tree) {
        socket.emit('tree-generated', aiResponse.tree);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('ai-response', {
        id: Date.now().toString(),
        username: 'AI Assistant',
        content: {
          text: 'Sorry, I encountered an error. Please try again.',
        },
        timesend: new Date().toISOString(),
      });
    } finally {
      socket.emit('ai-typing', false);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### 2. AI Processing Function

```javascript
// aiService.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function processWithAI(userMessage) {
  try {
    // System prompt for tree generation
    const systemPrompt = `You are a Knowledge Bonsai AI assistant. When users tell you what they want to learn, 
    you create personalized learning trees in JSON format following this structure:

    {
      "metadata": {
        "title": "Topic Name",
        "description": "Brief description"
      },
      "root": {
        "id": "pot",
        "label": "Main Topic",
        "type": "pot",
        "level": 0,
        "children": [
          {
            "id": "subtopic-1",
            "label": "Subtopic Name",
            "type": "trunk",
            "level": 1,
            "children": [...]
          }
        ]
      }
    }

    Rules:
    - type can be: "pot" (root), "trunk" (main concepts), or "leaf" (details)
    - level starts at 0 (pot) and increases
    - Create 2-4 levels deep
    - Balance left and right branches`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
    });

    const aiMessage = completion.choices[0].message.content;

    // Check if response contains a tree structure
    let tree = null;
    const jsonMatch = aiMessage.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        tree = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.log('No valid JSON tree found');
      }
    }

    return {
      message: aiMessage,
      tree: tree,
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

module.exports = { processWithAI };
```

### 3. Environment Variables

```env
# .env
PORT=3000
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key_here
```

---

## Python/FastAPI Implementation

### 1. Basic Server Setup

```python
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
import uvicorn
from datetime import datetime
import json

# Create FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

# Wrap with ASGI app
socket_app = socketio.ASGIApp(sio, app)

@sio.event
async def connect(sid, environ):
    print(f"✅ User connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"❌ User disconnected: {sid}")

@sio.event
async def user_message(sid, data):
    print(f"📩 Received message from {sid}: {data}")
    
    # Extract message data
    username = data.get('username')
    content = data.get('content', {})
    message_text = content.get('text', '')
    
    # Send typing indicator
    await sio.emit('ai-typing', True, room=sid)
    
    try:
        # Process with AI
        ai_response = await process_with_ai(message_text)
        
        # Send AI response
        await sio.emit('ai-response', {
            'id': str(int(datetime.now().timestamp() * 1000)),
            'username': 'AI Assistant',
            'content': {
                'text': ai_response['message']
            },
            'timesend': datetime.now().isoformat()
        }, room=sid)
        
        # If tree was generated, send it
        if ai_response.get('tree'):
            await sio.emit('tree-generated', ai_response['tree'], room=sid)
            
    except Exception as e:
        print(f"Error processing message: {e}")
        await sio.emit('ai-response', {
            'id': str(int(datetime.now().timestamp() * 1000)),
            'username': 'AI Assistant',
            'content': {
                'text': 'Sorry, I encountered an error. Please try again.'
            },
            'timesend': datetime.now().isoformat()
        }, room=sid)
    finally:
        await sio.emit('ai-typing', False, room=sid)

# Run server
if __name__ == '__main__':
    uvicorn.run(socket_app, host='0.0.0.0', port=3000)
```

### 2. AI Processing Function

```python
# ai_service.py
import openai
import os
import json

openai.api_key = os.getenv('OPENAI_API_KEY')

async def process_with_ai(user_message: str) -> dict:
    system_prompt = """You are a Knowledge Bonsai AI assistant. When users tell you what they want to learn, 
    you create personalized learning trees in JSON format following this structure:

    {
      "metadata": {
        "title": "Topic Name",
        "description": "Brief description"
      },
      "root": {
        "id": "pot",
        "label": "Main Topic",
        "type": "pot",
        "level": 0,
        "children": [...]
      }
    }

    Rules:
    - type can be: "pot" (root), "trunk" (main concepts), or "leaf" (details)
    - level starts at 0 (pot) and increases
    - Create 2-4 levels deep
    - Balance left and right branches"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )
        
        ai_message = response.choices[0].message.content
        
        # Try to extract JSON tree
        tree = None
        try:
            # Find JSON in response
            start = ai_message.find('{')
            end = ai_message.rfind('}') + 1
            if start != -1 and end > start:
                tree_json = ai_message[start:end]
                tree = json.loads(tree_json)
        except json.JSONDecodeError:
            print("No valid JSON tree found")
        
        return {
            "message": ai_message,
            "tree": tree
        }
    except Exception as e:
        print(f"OpenAI API error: {e}")
        raise
```

---

## Message Format

### User to Server

```json
{
  "username": "John Doe",
  "content": {
    "text": "I want to learn front-end development"
  },
  "timesend": "2025-11-22T10:30:00.000Z"
}
```

### Server to User (AI Response)

```json
{
  "id": "1732272600000",
  "username": "AI Assistant",
  "content": {
    "text": "Great! I'll create a learning path for front-end development..."
  },
  "timesend": "2025-11-22T10:30:05.000Z"
}
```

### Tree Generation Event

```json
{
  "metadata": {
    "title": "Front-end Development",
    "description": "A comprehensive learning path"
  },
  "root": {
    "id": "pot",
    "label": "Front-end",
    "type": "pot",
    "level": 0,
    "children": [...]
  }
}
```

---

## Socket Events

### Client → Server

| Event | Data | Description |
|-------|------|-------------|
| `user-message` | `{ username, content, timesend }` | User sends a message |

### Server → Client

| Event | Data | Description |
|-------|------|-------------|
| `ai-response` | `{ id, username, content, timesend }` | AI responds to user |
| `ai-typing` | `boolean` | AI typing indicator |
| `tree-generated` | `KnowledgeTreeData` | Learning tree generated |

---

## Testing

### Test with Socket.IO Client

```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  
  socket.emit('user-message', {
    username: 'Test User',
    content: { text: 'I want to learn Python' },
    timesend: new Date().toISOString()
  });
});

socket.on('ai-response', (data) => {
  console.log('AI Response:', data);
});

socket.on('tree-generated', (tree) => {
  console.log('Tree Generated:', tree);
});
```

---

## Security Considerations

1. **Rate Limiting**: Implement rate limiting to prevent spam
2. **Authentication**: Add authentication for socket connections
3. **Input Validation**: Sanitize user inputs
4. **Error Handling**: Don't expose sensitive error details
5. **CORS**: Configure CORS properly for production

---

## Production Deployment

### Environment Variables

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend.com
OPENAI_API_KEY=your_key_here
REDIS_URL=redis://localhost:6379  # For session management
```

### Scaling

- Use Redis adapter for multiple server instances
- Implement connection pooling
- Add load balancing

---

## Troubleshooting

### Connection Issues

1. Check CORS configuration
2. Verify WebSocket support
3. Check firewall settings

### AI Response Issues

1. Verify OpenAI API key
2. Check API rate limits
3. Review system prompts

---

## Support

For questions or issues with the backend implementation, refer to:
- Socket.IO Documentation: https://socket.io/docs/
- OpenAI API Documentation: https://platform.openai.com/docs/

