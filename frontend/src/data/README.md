# Knowledge Bonsai Tree - Data Structure Documentation

## Overview

This document explains how to structure and send tree data from the backend to visualize knowledge trees in the Knowledge Bonsai frontend.

## Data Structure

### Core Types

```typescript
interface TreeNodeData {
  id: string;           // Unique identifier
  label: string;        // Display text
  type: 'pot' | 'trunk' | 'leaf';  // Node type
  level: number;        // Depth level (0 = root/pot)
  children?: TreeNodeData[];  // Child nodes
}

interface KnowledgeTreeData {
  root: TreeNodeData;
  metadata?: {
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
```

### Node Types

1. **Pot** (`type: 'pot'`)
   - The root/foundation (level 0)
   - Should be unique
   - Represents the main topic
   - Grows vertically upward

2. **Trunk** (`type: 'trunk'`)
   - Main concepts (level 1+)
   - Forms the vertical backbone
   - Branches extend horizontally

3. **Leaf** (`type: 'leaf'`)
   - Detail nodes (level 2+)
   - End points of knowledge
   - Usually at the edges

## Backend API Format

### Response Structure

```json
{
  "success": true,
  "data": {
    "root": { ... },
    "metadata": { ... }
  },
  "message": "Tree data fetched successfully"
}
```

### Example: Front-end Learning Path

```json
{
  "success": true,
  "data": {
    "metadata": {
      "title": "Front-end Development",
      "description": "A comprehensive learning path",
      "createdAt": "2025-11-22"
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
                },
                {
                  "id": "div-id",
                  "label": "id",
                  "type": "leaf",
                  "level": 3
                }
              ]
            },
            {
              "id": "html-span",
              "label": "span",
              "type": "trunk",
              "level": 2,
              "children": [
                {
                  "id": "span-inline",
                  "label": "inline",
                  "type": "leaf",
                  "level": 3
                }
              ]
            }
          ]
        },
        {
          "id": "css",
          "label": "CSS",
          "type": "trunk",
          "level": 1,
          "children": [
            {
              "id": "css-grid",
              "label": "Grid",
              "type": "trunk",
              "level": 2,
              "children": [
                {
                  "id": "grid-template",
                  "label": "template",
                  "type": "leaf",
                  "level": 3
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## Tree Structure Rules

### 1. Hierarchical Structure
- **Pot** (level 0) → **Trunk** (level 1) → **Trunk/Leaf** (level 2+) → **Leaf** (level 3+)

### 2. Branching Rules
- **Pot children**: Grow vertically (stacked up)
- **Trunk children**: Branch horizontally (left and right alternating)
- **Leaf children**: Can extend horizontally

### 3. ID Requirements
- Must be unique across the entire tree
- Should be descriptive (e.g., `html-div`, `css-grid`)
- Use kebab-case or snake_case

### 4. Level Guidelines
- Level 0: Always the pot (root)
- Level 1: Main topics (HTML, CSS, JS, DOM)
- Level 2: Sub-topics (div, span, Grid, Selectors)
- Level 3+: Details (class, id, template)

## Visual Layout

```
         Leaf ← Trunk ← POT → Trunk → Leaf
                        ↑
         Leaf ← Trunk ← │ → Trunk → Leaf
                        ↑
         Leaf ← Trunk ← │ → Trunk → Leaf
                        ↑
                    [POT BASE]
```

## Backend Implementation Examples

### Node.js/Express Example

```javascript
// GET /api/trees/:id
app.get('/api/trees/:id', async (req, res) => {
  const tree = {
    success: true,
    data: {
      metadata: {
        title: 'Front-end Development',
        createdAt: new Date().toISOString(),
      },
      root: {
        id: 'pot',
        label: 'Front-end',
        type: 'pot',
        level: 0,
        children: [
          {
            id: 'html',
            label: 'HTML',
            type: 'trunk',
            level: 1,
            children: [
              // ... more nodes
            ],
          },
        ],
      },
    },
    message: 'Tree fetched successfully',
  };
  
  res.json(tree);
});
```

### Python/FastAPI Example

```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

class TreeNode(BaseModel):
    id: str
    label: str
    type: str  # 'pot' | 'trunk' | 'leaf'
    level: int
    children: Optional[List['TreeNode']] = None

class TreeMetadata(BaseModel):
    title: str
    description: Optional[str] = None
    created_at: Optional[str] = None

class KnowledgeTree(BaseModel):
    root: TreeNode
    metadata: Optional[TreeMetadata] = None

@app.get("/api/trees/{tree_id}")
async def get_tree(tree_id: str):
    tree = KnowledgeTree(
        root=TreeNode(
            id="pot",
            label="Front-end",
            type="pot",
            level=0,
            children=[
                # ... more nodes
            ]
        ),
        metadata=TreeMetadata(
            title="Front-end Development"
        )
    )
    
    return {
        "success": True,
        "data": tree.dict(),
        "message": "Tree fetched successfully"
    }
```

## Frontend Usage

```typescript
import { convertTreeToReactFlow, validateTreeData } from './data/mockData';

// Fetch from API
const response = await fetch('/api/trees/123');
const { data } = await response.json();

// Validate
const validation = validateTreeData(data);
if (!validation.valid) {
  console.error('Invalid tree data:', validation.errors);
  return;
}

// Convert to ReactFlow format
const { nodes, edges } = convertTreeToReactFlow(data);

// Use in ReactFlow
<ReactFlow nodes={nodes} edges={edges} />
```

## Validation Rules

The frontend validates:
- ✅ All nodes have unique IDs
- ✅ All nodes have labels
- ✅ Type is one of: 'pot', 'trunk', 'leaf'
- ✅ Level is a number
- ✅ Root node exists

## Best Practices

1. **Keep it balanced**: Try to have similar numbers of children on left/right
2. **Limit depth**: 3-4 levels work best visually
3. **Clear labels**: Use short, descriptive names
4. **Consistent IDs**: Use a naming convention (e.g., parent-child format)
5. **Metadata**: Always include title and creation date

## Common Patterns

### Simple Tree (2 levels)
```
Pot → Trunk → Leaf
```

### Balanced Tree (3 levels)
```
         Leaf ← Branch
               /
Pot → Trunk ←
               \
         Leaf → Branch
```

### Complex Tree (4 levels)
```
Leaf ← Sub ← Branch ← Trunk ← Pot
                              ↑
Leaf → Sub → Branch → Trunk ← │
```

## Troubleshooting

**Issue**: Nodes overlap
- **Solution**: Reduce number of children per level or adjust spacing in conversion function

**Issue**: Tree too wide
- **Solution**: Use more levels instead of more branches at same level

**Issue**: Connections not showing
- **Solution**: Ensure IDs are unique and parent-child relationships are correct

## Support

For questions or issues:
1. Check the validation output
2. Review the example data structures
3. Verify your JSON format matches the schema

