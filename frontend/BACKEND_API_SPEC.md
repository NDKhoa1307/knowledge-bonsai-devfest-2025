# Knowledge Bonsai - Backend API Specification

## Overview

This document specifies the backend API endpoints needed for the Knowledge Bonsai application.

## Base URL

```
Production: https://api.knowledge-bonsai.com/api
Development: http://localhost:3000/api
```

## Authentication

All endpoints require authentication via Bearer token:

```http
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Get All Trees

**GET** `/trees`

Get a list of all knowledge trees for the authenticated user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "tree-123",
      "title": "Front-end Development",
      "description": "A comprehensive learning path",
      "createdAt": "2025-11-22T10:00:00Z",
      "updatedAt": "2025-11-22T12:00:00Z",
      "nodeCount": 24
    }
  ]
}
```

---

### 2. Get Tree by ID

**GET** `/trees/:id`

Get a specific knowledge tree with full node structure.

**Parameters:**
- `id` (path): Tree ID

**Response:**
```json
{
  "success": true,
  "data": {
    "metadata": {
      "title": "Front-end Development",
      "description": "A comprehensive learning path",
      "createdAt": "2025-11-22T10:00:00Z",
      "updatedAt": "2025-11-22T12:00:00Z"
    },
    "root": {
      "id": "pot",
      "label": "Front-end",
      "type": "pot",
      "level": 0,
      "children": [
        {
          "id": "html",
          "label": "HTML",
          "type": "trunk",
          "level": 1,
          "children": [
            {
              "id": "html-div",
              "label": "div",
              "type": "trunk",
              "level": 2,
              "children": [
                {
                  "id": "div-class",
                  "label": "class",
                  "type": "leaf",
                  "level": 3
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "message": "Tree fetched successfully"
}
```

---

### 3. Create Tree

**POST** `/trees`

Create a new knowledge tree.

**Request Body:**
```json
{
  "metadata": {
    "title": "Backend Development",
    "description": "Server-side learning path"
  },
  "root": {
    "id": "pot",
    "label": "Back-end",
    "type": "pot",
    "level": 0,
    "children": []
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "tree-456",
    "tree": {
      "metadata": { ... },
      "root": { ... }
    }
  },
  "message": "Tree created successfully"
}
```

---

### 4. Update Tree

**PUT** `/trees/:id`

Update an entire tree structure.

**Parameters:**
- `id` (path): Tree ID

**Request Body:**
```json
{
  "metadata": {
    "title": "Updated Title",
    "description": "Updated description"
  },
  "root": {
    "id": "pot",
    "label": "Updated Label",
    "type": "pot",
    "level": 0,
    "children": [ ... ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metadata": { ... },
    "root": { ... }
  },
  "message": "Tree updated successfully"
}
```

---

### 5. Delete Tree

**DELETE** `/trees/:id`

Delete a knowledge tree.

**Parameters:**
- `id` (path): Tree ID

**Response:**
```json
{
  "success": true,
  "message": "Tree deleted successfully"
}
```

---

### 6. Add Node to Tree

**POST** `/trees/:id/nodes`

Add a new node to an existing tree.

**Parameters:**
- `id` (path): Tree ID

**Request Body:**
```json
{
  "parentId": "html",
  "label": "a",
  "type": "trunk"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metadata": { ... },
    "root": { ... }
  },
  "message": "Node added successfully"
}
```

---

### 7. Update Node

**PATCH** `/trees/:treeId/nodes/:nodeId`

Update a specific node in a tree.

**Parameters:**
- `treeId` (path): Tree ID
- `nodeId` (path): Node ID

**Request Body:**
```json
{
  "label": "Updated Label",
  "type": "leaf"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "metadata": { ... },
    "root": { ... }
  },
  "message": "Node updated successfully"
}
```

---

### 8. Delete Node

**DELETE** `/trees/:treeId/nodes/:nodeId`

Delete a node from a tree (and all its children).

**Parameters:**
- `treeId` (path): Tree ID
- `nodeId` (path): Node ID

**Response:**
```json
{
  "success": true,
  "data": {
    "metadata": { ... },
    "root": { ... }
  },
  "message": "Node deleted successfully"
}
```

---

### 9. Search Trees

**GET** `/trees/search?q=query`

Search trees by title or description.

**Query Parameters:**
- `q` (string): Search query

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "tree-123",
      "title": "Front-end Development",
      "description": "A comprehensive learning path",
      "createdAt": "2025-11-22T10:00:00Z",
      "updatedAt": "2025-11-22T12:00:00Z",
      "nodeCount": 24
    }
  ]
}
```

---

## Data Structure Rules

### Node Types

1. **pot** (type: 'pot')
   - Root node, level 0
   - Only one per tree
   - Represents the main topic

2. **trunk** (type: 'trunk')
   - Main concepts, level 1+
   - Can have children
   - Forms the backbone

3. **leaf** (type: 'leaf')
   - Detail nodes, level 2+
   - Usually endpoints
   - Can have limited children

### Validation Rules

Backend must validate:

1. **Unique IDs**: All node IDs must be unique within a tree
2. **Type Validation**: Type must be 'pot', 'trunk', or 'leaf'
3. **Level Consistency**: Levels should increment logically
4. **Single Root**: Only one pot node (root) per tree
5. **Required Fields**: All nodes must have id, label, type, and level

### Database Schema Suggestion

```sql
-- Trees table
CREATE TABLE trees (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tree data (store as JSONB for flexibility)
CREATE TABLE tree_data (
  tree_id UUID PRIMARY KEY,
  data JSONB NOT NULL,
  FOREIGN KEY (tree_id) REFERENCES trees(id) ON DELETE CASCADE
);

-- Index for searching
CREATE INDEX idx_trees_title ON trees USING GIN (to_tsvector('english', title));
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid tree structure",
  "errors": [
    "root: Missing id",
    "root.children[0]: Invalid type 'invalid'"
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Tree not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Implementation Examples

### Node.js/Express with Prisma

```javascript
// routes/trees.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all trees
router.get('/trees', async (req, res) => {
  try {
    const trees = await prisma.tree.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    res.json({ success: true, data: trees });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get tree by ID
router.get('/trees/:id', async (req, res) => {
  try {
    const tree = await prisma.tree.findUnique({
      where: { id: req.params.id },
      include: { treeData: true },
    });
    
    if (!tree) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tree not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: tree.treeData.data,
      message: 'Tree fetched successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Create tree
router.post('/trees', async (req, res) => {
  try {
    const { metadata, root } = req.body;
    
    const tree = await prisma.tree.create({
      data: {
        userId: req.user.id,
        title: metadata.title,
        description: metadata.description,
        treeData: {
          create: {
            data: { metadata, root },
          },
        },
      },
      include: { treeData: true },
    });
    
    res.status(201).json({ 
      success: true, 
      data: {
        id: tree.id,
        tree: tree.treeData.data
      },
      message: 'Tree created successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;
```

---

## Testing

### cURL Examples

```bash
# Get all trees
curl -X GET http://localhost:3000/api/trees \
  -H "Authorization: Bearer <token>"

# Get tree by ID
curl -X GET http://localhost:3000/api/trees/tree-123 \
  -H "Authorization: Bearer <token>"

# Create tree
curl -X POST http://localhost:3000/api/trees \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "metadata": {
      "title": "Test Tree",
      "description": "A test tree"
    },
    "root": {
      "id": "pot",
      "label": "Test",
      "type": "pot",
      "level": 0,
      "children": []
    }
  }'
```

---

## Rate Limiting

Suggested rate limits:
- 100 requests per minute per user
- 1000 requests per hour per user

---

## Versioning

API version in URL: `/api/v1/trees`

Current version: v1

---

## Contact

For API questions or issues, contact the backend team.

