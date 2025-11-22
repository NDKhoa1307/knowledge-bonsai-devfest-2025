// mockData.ts - Data structure for Knowledge Bonsai Tree
import { addNaturalRandomness, finalPolish, resolveAllLevels } from '@/utils/treeHelper';
import { type Node, type Edge } from 'reactflow';

/**
 * Tree Data Structure
 * This represents a hierarchical knowledge tree that can be easily generated from backend
 */

export interface TreeNodeData {
  id: string;
  label: string;
  type: 'pot' | 'trunk' | 'leaf' | 'branch' | 'branchRight' | 'leafRight';
  level: number; // 0 = pot, 1+ = levels up
  children?: TreeNodeData[];
}

export interface KnowledgeTreeData {
  root: TreeNodeData;
  metadata?: {
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

/**
 * Example Mock Data - Front-end Learning Path
 */
export const mockFrontendTree: KnowledgeTreeData = {
  metadata: {
    title: 'Front-end Development',
    description: 'A comprehensive learning path for front-end development',
    createdAt: '2025-11-22',
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
          {
            id: 'html-div',
            label: 'div',
            type: 'branch',
            level: 2,
            children: [
              { id: 'div-class', label: 'class', type: 'leaf', level: 3 },
              { id: 'div-id', label: 'id', type: 'leaf', level: 3 },
            ],
          },
          {
            id: 'html-span',
            label: 'span',
            type: 'branch',
            level: 2,
            children: [
              { id: 'span-inline', label: 'inline', type: 'leaf', level: 3 },
              { id: 'span-block', label: 'block', type: 'leaf', level: 3 }
            ],
          },
        ],
      },
      {
        id: 'css',
        label: 'CSS',
        type: 'trunk',
        level: 1,
        children: [
          {
            id: 'css-grid',
            label: 'Grid',
            type: 'branch',
            level: 2,
            children: [
              { id: 'grid-template', label: 'template', type: 'leaf', level: 3 },
              { id: 'grid-template-columns', label: 'template-columns', type: 'leaf', level: 3 },
            ],
          },
          {
            id: 'css-selectors',
            label: 'Selectors',
            type: 'branch',
            level: 2,
            children: [
              { id: 'selector-class', label: '.class', type: 'leaf', level: 3 },
              { id: 'selector-id', label: '#id', type: 'leaf', level: 3 }
            ],
          },
        ],
      },
      {
        id: 'js',
        label: 'JavaScript',
        type: 'trunk',
        level: 1,
        children: [
          {
            id: 'js-vars',
            label: 'Variables',
            type: 'branch',
            level: 2,
            children: [
              { id: 'vars-let', label: 'let', type: 'leaf', level: 3 },
            ],
          },
          {
            id: 'js-async',
            label: 'Async',
            type: 'branch',
            level: 2,
            children: [
              { id: 'async-promise', label: 'Promise', type: 'leaf', level: 3 },
            ],
          },
        ],
      },
      {
        id: 'dom',
        label: 'DOM',
        type: 'trunk',
        level: 1,
        children: [
          {
            id: 'dom-query',
            label: 'Query',
            type: 'branch',
            level: 2,
            children: [
              { id: 'query-getid', label: 'getElementById', type: 'leaf', level: 3 },
            ],
          },
          {
            id: 'dom-events',
            label: 'Events',
            type: 'branch',
            level: 2,
            children: [
              { id: 'events-click', label: 'click', type: 'leaf', level: 3 },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * Utility function to convert hierarchical tree data to ReactFlow nodes and edges
 */
export function convertTreeToReactFlow(treeData: KnowledgeTreeData | null): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const HORIZONTAL_SPACING = 200;
  const VERTICAL_SPACING = 150;
  const BRANCH_SPACING = 170;

  function processNode(
    nodeData: TreeNodeData,
    parentId: string | null,
    xPosition: number,
    yPosition: number,
    parentHandle?: string
  ) {
    // Create ReactFlow node
    const rootNode: Node = {
      id: nodeData.id,
      type: nodeData.type,
      position: { x: xPosition, y: yPosition }, // Starting position
      data: { label: nodeData.label },
    };

    // Check if the node is on the right side, if so, use the right side node type instead
    if (parentHandle === 'right' && nodeData.type === 'branch') {
      console.log('Changing branch to branchRight for node:', nodeData.id);
      rootNode.type = 'branchRight';
    }
    // If the node is at the root center it by adding a offset
    if (nodeData.type === 'pot') {
      rootNode.position.x -= 65; // Half the pot width
    }
    nodes.push(rootNode);

    // Create edge any previous parent to this node
    if (parentId) {
      console.log('Creating edge from', parentId, 'to', nodeData.id);

      // Default source handle for vertical connections
      let sourceHandle = 'top';
      let targetHandle = 'bottom';

      // For horizontal branches
      if (parentHandle === 'left') {
        sourceHandle = 'left';
        targetHandle = 'right';
      } else if (parentHandle === 'right') {
        sourceHandle = 'right';
        targetHandle = 'left';
      }

      console.log('Node data:', {
        nodeData,
        parentId,
        nodeId: nodeData.id,
        xPosition,
        yPosition,
        parentHandle,
        sourceHandle,
        targetHandle,
      });

      const edgeId = `e-${parentId}-${nodeData.id}`;
      console.log('Edge being pushed:', {
        id: edgeId,
        source: parentId,
        sourceHandle,
        target: nodeData.id,
        targetHandle,
        edgeId: edgeId,
        currentChild: nodeData,
        childId: nodeData.id,
        parentId: parentId,
      })

      edges.push({
        id: `e-${parentId}-${nodeData.id}`,
        source: parentId,
        target: nodeData.id,
        sourceHandle,
        targetHandle,
        type: nodeData.type === 'trunk' ? 'trunk' : 'branch',
      });
    }

    // Process children
    if (nodeData.children && nodeData.children.length > 0) {
      const childCount = nodeData.children.length;

      if (nodeData.type === 'pot' || nodeData.level === 0) {
        // Pot: children grow vertically upward
        nodeData.children.forEach((child, index) => {
          const childY = yPosition - VERTICAL_SPACING * (index + 1);
          console.log('Processing node from pot:', nodeData)
          processNode(child, nodeData.id, xPosition, childY, 'top');
        });
      } else if (nodeData.type === 'trunk' && childCount > 0) {
        // Trunk: children branch horizontally (left and right)
        const leftChildren = nodeData.children.filter((_, i) => i % 2 === 0);
        const rightChildren = nodeData.children.filter((_, i) => i % 2 === 1);

        // Left branches
        leftChildren.forEach((child, index) => {
          const childX = xPosition - BRANCH_SPACING * (index + 1);
          processNode(child, nodeData.id, childX, yPosition, 'left');
        });

        // Right branches
        rightChildren.forEach((child, index) => {
          const childX = xPosition + BRANCH_SPACING * (index + 1);
          processNode(child, nodeData.id, childX, yPosition, 'right');
        });
      } else {
        // This shit is processing branch
        console.log('[Location]:', {
          nodeData: nodeData,
          parentHandle: parentHandle,

        });
        nodeData.children.forEach((child, index) => {
          let childX = parentHandle
            ? xPosition - HORIZONTAL_SPACING
            : xPosition + HORIZONTAL_SPACING;
          if (parentHandle === 'right') {
            childX = parentHandle
              ? xPosition + HORIZONTAL_SPACING
              : xPosition - HORIZONTAL_SPACING;
          }
          console.log('[Location] Processing leaf children:', {
            nodeId: nodeData.id,
            childId: child.id,
            parentHandle: parentHandle,
            childX: childX
          });
          processNode(child, nodeData.id, childX, yPosition, parentHandle);
        });
      }
    }
  }

  // Start from the root (pot) at the bottom center
  if (treeData != null) {
    processNode(treeData.root, null, 0, 0);
  }
  // resolveAllLevels(nodes);
  // addNaturalRandomness(nodes);
  finalPolish(nodes);

  return { nodes, edges };
}

/**
 * Backend API Response Format
 * This is what the backend should return
 */
export interface BackendTreeResponse {
  success: boolean;
  data: KnowledgeTreeData;
  message?: string;
}

/**
 * Example of what backend should send
 */
export const exampleBackendResponse: BackendTreeResponse = {
  success: true,
  data: mockFrontendTree,
  message: 'Tree data fetched successfully',
};

/**
 * Additional mock data examples for different learning paths
 */
export const mockBackendTree: KnowledgeTreeData = {
  metadata: {
    title: 'Backend Development',
    description: 'Server-side development learning path',
  },
  root: {
    id: 'pot',
    label: 'Back-end',
    type: 'pot',
    level: 0,
    children: [
      {
        id: 'nodejs',
        label: 'Node.js',
        type: 'trunk',
        level: 1,
        children: [
          {
            id: 'express',
            label: 'Express',
            type: 'trunk',
            level: 2,
            children: [
              { id: 'routing', label: 'Routing', type: 'leaf', level: 3 },
              { id: 'middleware', label: 'Middleware', type: 'leaf', level: 3 },
            ],
          },
          {
            id: 'npm',
            label: 'NPM',
            type: 'trunk',
            level: 2,
            children: [
              { id: 'packages', label: 'Packages', type: 'leaf', level: 3 },
            ],
          },
        ],
      },
      {
        id: 'database',
        label: 'Database',
        type: 'trunk',
        level: 1,
        children: [
          {
            id: 'sql',
            label: 'SQL',
            type: 'trunk',
            level: 2,
            children: [
              { id: 'select', label: 'SELECT', type: 'leaf', level: 3 },
              { id: 'join', label: 'JOIN', type: 'leaf', level: 3 },
            ],
          },
          {
            id: 'nosql',
            label: 'NoSQL',
            type: 'trunk',
            level: 2,
            children: [
              { id: 'mongodb', label: 'MongoDB', type: 'leaf', level: 3 },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * Helper function to validate tree data structure
 */
export function validateTreeData(data: KnowledgeTreeData | null): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  function validateNode(node: TreeNodeData, path: string) {
    if (!node.id) errors.push(`${path}: Missing id`);
    if (!node.label) errors.push(`${path}: Missing label`);
    if (!['pot', 'trunk', 'leaf', 'branch'].includes(node.type)) {
      errors.push(`${path}: Invalid type '${node.type}'`);
    }
    if (typeof node.level !== 'number') {
      errors.push(`${path}: Invalid level`);
    }

    if (node.children) {
      node.children.forEach((child, index) => {
        validateNode(child, `${path}.children[${index}]`);
      });
    }
  }

  if (data == null || !data.root) {
    errors.push('Missing root node');
  } else {
    validateNode(data.root, 'root');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

