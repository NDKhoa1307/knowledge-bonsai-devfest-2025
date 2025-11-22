// GraphPage.tsx
import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  type Connection,
  type Edge,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import the custom nodes we made above
import { PotNode, TrunkNode, LeafNode } from './CustomNodes';

// Register the types
const nodeTypes = {
  pot: PotNode,
  trunk: TrunkNode,
  leaf: LeafNode,
};

// Initial Data - Vertical Trunk with Horizontal Branches
// Structure:
//        Left Branch --- Trunk --- Right Branch
//                          |
//                       (repeat)
const initialNodes: Node[] = [
  // ========== THE POT (Foundation - Bottom) ==========
  { 
    id: 'pot', 
    type: 'pot', 
    position: { x: 500, y: 700 },
    data: { label: 'Front-end' } 
  },
  
  // ========== LEVEL 1: HTML (Main Trunk) ==========
  { 
    id: 'html', 
    type: 'trunk', 
    position: { x: 485, y: 550 }, 
    data: { label: 'HTML' } 
  },
  // HTML - Left Branch
  { 
    id: 'html-div', 
    type: 'trunk', 
    position: { x: 250, y: 550 }, 
    data: { label: 'div' } 
  },
  // HTML - Right Branch
  { 
    id: 'html-span', 
    type: 'trunk', 
    position: { x: 720, y: 550 }, 
    data: { label: 'span' } 
  },
  // Leaves from div (left)
  { id: 'div-leaf1', type: 'leaf', position: { x: 100, y: 550 }, data: { label: 'class' } },
  { id: 'div-leaf2', type: 'leaf', position: { x: 150, y: 600 }, data: { label: 'id' } },
  // Leaves from span (right)
  { id: 'span-leaf1', type: 'leaf', position: { x: 870, y: 550 }, data: { label: 'inline' } },
  { id: 'span-leaf2', type: 'leaf', position: { x: 820, y: 600 }, data: { label: 'text' } },

  // ========== LEVEL 2: CSS (Main Trunk) ==========
  { 
    id: 'css', 
    type: 'trunk', 
    position: { x: 485, y: 400 }, 
    data: { label: 'CSS' } 
  },
  // CSS - Left Branch
  { 
    id: 'css-grid', 
    type: 'trunk', 
    position: { x: 250, y: 400 }, 
    data: { label: 'Grid' } 
  },
  // CSS - Right Branch
  { 
    id: 'css-selector', 
    type: 'trunk', 
    position: { x: 720, y: 400 }, 
    data: { label: 'Selectors' } 
  },
  // Leaves from grid (left)
  { id: 'grid-leaf1', type: 'leaf', position: { x: 100, y: 400 }, data: { label: 'template' } },
  // Leaves from selector (right)
  { id: 'selector-leaf1', type: 'leaf', position: { x: 870, y: 400 }, data: { label: '.class' } },

  // ========== LEVEL 3: JavaScript (Main Trunk) ==========
  { 
    id: 'js', 
    type: 'trunk', 
    position: { x: 485, y: 250 }, 
    data: { label: 'JavaScript' } 
  },
  // JS - Left Branch
  { 
    id: 'js-vars', 
    type: 'trunk', 
    position: { x: 250, y: 250 }, 
    data: { label: 'Variables' } 
  },
  // JS - Right Branch
  { 
    id: 'js-async', 
    type: 'trunk', 
    position: { x: 720, y: 250 }, 
    data: { label: 'Async' } 
  },
  // Leaves from vars (left)
  { id: 'vars-leaf1', type: 'leaf', position: { x: 100, y: 250 }, data: { label: 'let' } },
  // Leaves from async (right)
  { id: 'async-leaf1', type: 'leaf', position: { x: 870, y: 250 }, data: { label: 'Promise' } },

  // ========== LEVEL 4: DOM (Main Trunk - Top) ==========
  { 
    id: 'dom', 
    type: 'trunk', 
    position: { x: 485, y: 100 }, 
    data: { label: 'DOM' } 
  },
  // DOM - Left Branch
  { 
    id: 'dom-query', 
    type: 'trunk', 
    position: { x: 250, y: 100 }, 
    data: { label: 'Query' } 
  },
  // DOM - Right Branch
  { 
    id: 'dom-events', 
    type: 'trunk', 
    position: { x: 720, y: 100 }, 
    data: { label: 'Events' } 
  },
  // Leaves from query (left)
  { id: 'query-leaf1', type: 'leaf', position: { x: 100, y: 100 }, data: { label: 'getElementById' } },
  // Leaves from events (right)
  { id: 'events-leaf1', type: 'leaf', position: { x: 870, y: 100 }, data: { label: 'click' } },
];

const initialEdges: Edge[] = [
    // ========== TRUNK CONNECTIONS (Vertical) ==========
    // Pot -> HTML (Bottom Up)
    { id: 'e-pot-html', source: 'pot', target: 'html', sourceHandle: 'top', targetHandle: 'bottom' },
    // HTML -> CSS (Bottom Up)
    { id: 'e-html-css', source: 'html', target: 'css', sourceHandle: 'top', targetHandle: 'bottom' },
    // CSS -> JS (Bottom Up)
    { id: 'e-css-js', source: 'css', target: 'js', sourceHandle: 'top', targetHandle: 'bottom' },
    // JS -> DOM (Bottom Up)
    { id: 'e-js-dom', source: 'js', target: 'dom', sourceHandle: 'top', targetHandle: 'bottom' },
  
    // ========== HTML BRANCHES ==========
    // HTML (Left Side) -> DIV (Right Side)
    { 
      id: 'e-html-div', 
      source: 'html', 
      target: 'html-div', 
      sourceHandle: 'left',    // <--- Out from Left of Parent
      targetHandle: 'target-right' // <--- In to Right of Child
    },
    // HTML (Right Side) -> SPAN (Left Side)
    { 
      id: 'e-html-span', 
      source: 'html', 
      target: 'html-span', 
      sourceHandle: 'right',   // <--- Out from Right of Parent
      targetHandle: 'target-left' // <--- In to Left of Child
    },
    
    // Leaves for Div (These are to the LEFT of 'div', so connect div-left -> leaf-right)
    { id: 'e-div-leaf1', source: 'html-div', target: 'div-leaf1', sourceHandle: 'left', targetHandle: 'right' },
    { id: 'e-div-leaf2', source: 'html-div', target: 'div-leaf2', sourceHandle: 'left', targetHandle: 'right' },
  
    // Leaves for Span (These are to the RIGHT of 'span', so connect span-right -> leaf-left)
    { id: 'e-span-leaf1', source: 'html-span', target: 'span-leaf1', sourceHandle: 'right', targetHandle: 'left' },
    { id: 'e-span-leaf2', source: 'html-span', target: 'span-leaf2', sourceHandle: 'right', targetHandle: 'left' },
  
  
    // ========== CSS BRANCHES ==========
    { id: 'e-css-grid', source: 'css', target: 'css-grid', sourceHandle: 'left', targetHandle: 'target-right' },
    { id: 'e-css-selector', source: 'css', target: 'css-selector', sourceHandle: 'right', targetHandle: 'target-left' },
    // Leaves
    { id: 'e-grid-leaf1', source: 'css-grid', target: 'grid-leaf1', sourceHandle: 'left', targetHandle: 'right' },
    { id: 'e-selector-leaf1', source: 'css-selector', target: 'selector-leaf1', sourceHandle: 'right', targetHandle: 'left' },
  
  
    // ========== JS BRANCHES ==========
    { id: 'e-js-vars', source: 'js', target: 'js-vars', sourceHandle: 'left', targetHandle: 'target-right' },
    { id: 'e-js-async', source: 'js', target: 'js-async', sourceHandle: 'right', targetHandle: 'target-left' },
    // Leaves
    { id: 'e-vars-leaf1', source: 'js-vars', target: 'vars-leaf1', sourceHandle: 'left', targetHandle: 'right' },
    { id: 'e-async-leaf1', source: 'js-async', target: 'async-leaf1', sourceHandle: 'right', targetHandle: 'left' },
  
  
    // ========== DOM BRANCHES ==========
    { id: 'e-dom-query', source: 'dom', target: 'dom-query', sourceHandle: 'left', targetHandle: 'target-right' },
    { id: 'e-dom-events', source: 'dom', target: 'dom-events', sourceHandle: 'right', targetHandle: 'target-left' },
    // Leaves
    { id: 'e-query-leaf1', source: 'dom-query', target: 'query-leaf1', sourceHandle: 'left', targetHandle: 'right' },
    { id: 'e-events-leaf1', source: 'dom-events', target: 'events-leaf1', sourceHandle: 'right', targetHandle: 'left' },
  ];

export const GraphPage = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full bg-stone-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        // Styling the connections to look like wood/branches
        defaultEdgeOptions={{
          animated: false, // Trees are static usually, but can animate if "growing"
          type: 'bezier', // Curved lines look more organic
          style: { 
            stroke: '#5D4037', // Wood color
            strokeWidth: 6,     // Thick branches
          },
        }}
      >
        <Controls className="bg-white border-stone-200 shadow-lg" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'leaf') return '#22c55e'; // Green on map
            if (n.type === 'trunk') return '#5D4037'; // Brown on map
            return '#44403c';
          }}
        />
        {/* A subtle grid or dots helps engineering feel, but you can remove for pure organic look */}
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#d6d3d1" />
      </ReactFlow>
    </div>
  );
};