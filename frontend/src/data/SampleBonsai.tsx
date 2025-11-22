// src/data/sampleBonsai.ts
import type { Node, Edge } from "reactflow";

export const sampleNodes: Node[] = [
  // ROOT
  {
    id: "root-1",
    type: "rootNode",
    position: { x: 400, y: 650 },
    data: { label: "Pot" },
  },

  // TRUNKS
  {
    id: "trunk-1",
    type: "trunkNode",
    position: { x: 400, y: 560 },
    data: {},
  },
  {
    id: "trunk-2",
    type: "trunkNode",
    position: { x: 400, y: 465 },
    data: {},
  },

  // BRANCHES
  { id: "branch-1", type: "branchNode", position: { x: 260, y: 540 }, data: {} },
  { id: "branch-2", type: "branchNode", position: { x: 540, y: 540 }, data: {} },

  // LEAVES
  { id: "leaf-1", type: "leafNode", position: { x: 220, y: 500 }, data: {} },
  { id: "leaf-2", type: "leafNode", position: { x: 300, y: 480 }, data: {} },

  { id: "leaf-3", type: "leafNode", position: { x: 580, y: 500 }, data: {} },
  { id: "leaf-4", type: "leafNode", position: { x: 500, y: 480 }, data: {} },
];

export const sampleEdges: Edge[] = [
  // ROOT → TRUNK
  {
    id: "e-root-t1",
    source: "root-1",
    sourceHandle: "top",
    target: "trunk-1",
    targetHandle: "bottom",
    type: "trunk",
  },

  // TRUNK → TRUNK
  {
    id: "e-t1-t2",
    source: "trunk-1",
    sourceHandle: "top",
    target: "trunk-2",
    targetHandle: "bottom",
    type: "trunk",
  },

  // TRUNK → BRANCHES
  {
    id: "e-t1-b1",
    source: "trunk-1",
    sourceHandle: "left",
    target: "branch-1",
    targetHandle: "right",
    type: "branch",
  },
  {
    id: "e-t1-b2",
    source: "trunk-1",
    sourceHandle: "right",
    target: "branch-2",
    targetHandle: "left",
    type: "branch",
  },

  // BRANCH → LEAF
  {
    id: "e-b1-l1",
    source: "branch-1",
    sourceHandle: "top",
    target: "leaf-1",
    targetHandle: "bottom",
    type: "branch",
  },
  {
    id: "e-b1-l2",
    source: "branch-1",
    sourceHandle: "bottom",
    target: "leaf-2",
    targetHandle: "top",
    type: "branch",
  },

  {
    id: "e-b2-l3",
    source: "branch-2",
    sourceHandle: "top",
    target: "leaf-3",
    targetHandle: "bottom",
    type: "branch",
  },
  {
    id: "e-b2-l4",
    source: "branch-2",
    sourceHandle: "bottom",
    target: "leaf-4",
    targetHandle: "top",
    type: "branch",
  },
];
