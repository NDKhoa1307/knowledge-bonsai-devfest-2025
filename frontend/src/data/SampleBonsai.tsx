// src/data/sampleBonsai.ts
import { R } from "@/utils/offset";

// Center alignment for trunk
const X = 400;

export const sampleNodes = [
  // ROOT
  {
    id: "root-1",
    type: "rootNode",
    position: { x: X + R(-10, 10), y: 650 + R(-5, 5) },
    data: { label: "Pot" },
  },

  // TRUNKS
  {
    id: "trunk-1",
    type: "trunkNode",
    position: { x: X + R(-15, 15), y: 560 + R(-8, 10) },
    data: {},
  },
  {
    id: "trunk-2",
    type: "trunkNode",
    position: { x: X + R(-15, 15), y: 465 + R(-10, 10) },
    data: {},
  },
  {
    id: "trunk-3",
    type: "trunkNode",
    position: { x: X + R(-20, 20), y: 370 + R(-10, 10) },
    data: {},
  },
  {
    id: "trunk-4",
    type: "trunkNode",
    position: { x: X + R(-20, 15), y: 275 + R(-10, 10) },
    data: {},
  },

  // BRANCHES (random positioning)
  { id: "branch-1", type: "branchNode", position: { x: X - 160 + R(-20, 15), y: 540 + R(-15, 15) }, data: {} },
  { id: "branch-2", type: "branchNode", position: { x: X + 155 + R(-20, 20), y: 530 + R(-15, 15) }, data: {} },

  { id: "branch-3", type: "branchNode", position: { x: X - 185 + R(-20, 20), y: 445 + R(-15, 15) }, data: {} },
  { id: "branch-4", type: "branchNode", position: { x: X + 175 + R(-15, 15), y: 445 + R(-15, 15) }, data: {} },

  { id: "branch-5", type: "branchNode", position: { x: X - 140 + R(-15, 20), y: 350 + R(-18, 20) }, data: {} },
  { id: "branch-6", type: "branchNode", position: { x: X + 150 + R(-15, 20), y: 350 + R(-18, 20) }, data: {} },

  { id: "branch-7", type: "branchNode", position: { x: X - 110 + R(-15, 20), y: 260 + R(-20, 20) }, data: {} },
  { id: "branch-8", type: "branchNode", position: { x: X + 120 + R(-20, 15), y: 260 + R(-20, 20) }, data: {} },

  // LEAVES (each branch gets 2 leaves)
  // NEW RULE: Leaf has top & bottom handles
  { id: "leaf-1", type: "leafNode", position: { x: X - 215 + R(-15, 15), y: 500 + R(-15, 10) }, data: {} },
  { id: "leaf-2", type: "leafNode", position: { x: X - 180 + R(-10, 15), y: 470 + R(-15, 15) }, data: {} },

  { id: "leaf-3", type: "leafNode", position: { x: X + 215 + R(-15, 15), y: 500 + R(-15, 10) }, data: {} },
  { id: "leaf-4", type: "leafNode", position: { x: X + 180 + R(-10, 15), y: 470 + R(-15, 15) }, data: {} },

  { id: "leaf-5", type: "leafNode", position: { x: X - 220 + R(-15, 15), y: 405 + R(-20, 15) }, data: {} },
  { id: "leaf-6", type: "leafNode", position: { x: X - 180 + R(-15, 15), y: 375 + R(-15, 20) }, data: {} },

  { id: "leaf-7", type: "leafNode", position: { x: X + 220 + R(-15, 15), y: 405 + R(-20, 15) }, data: {} },
  { id: "leaf-8", type: "leafNode", position: { x: X + 180 + R(-15, 15), y: 375 + R(-15, 20) }, data: {} },

  { id: "leaf-9", type: "leafNode", position: { x: X - 150 + R(-15, 15), y: 315 + R(-20, 20) }, data: {} },
  { id: "leaf-10", type: "leafNode", position: { x: X + 210 + R(-15, 15), y: 315 + R(-20, 20) }, data: {} },

  { id: "leaf-11", type: "leafNode", position: { x: X - 115 + R(-15, 15), y: 220 + R(-20, 20) }, data: {} },
  { id: "leaf-12", type: "leafNode", position: { x: X + 165 + R(-15, 15), y: 220 + R(-20, 20) }, data: {} },
];

// =====================================================
// 🚀 EDGE DEFINITIONS (Following UPDATED RULES)
// =====================================================
export const sampleEdges = [
  // ROOT → FIRST TRUNK
  {
    id: "e-root-t1",
    source: "root-1",
    sourceHandle: "top",
    target: "trunk-1",
    targetHandle: "bottom",
    type: "trunk",
  },

  // TRUNK VERTICAL CHAIN
  {
    id: "e-t1-t2",
    source: "trunk-1",
    sourceHandle: "top",
    target: "trunk-2",
    targetHandle: "bottom",
    type: "trunk",
  },
  {
    id: "e-t2-t3",
    source: "trunk-2",
    sourceHandle: "top",
    target: "trunk-3",
    targetHandle: "bottom",
    type: "trunk",
  },
  {
    id: "e-t3-t4",
    source: "trunk-3",
    sourceHandle: "top",
    target: "trunk-4",
    targetHandle: "bottom",
    type: "trunk",
  },

  // TRUNK → BRANCH
  { id: "e-t1-b1", source: "trunk-1", sourceHandle: "left", target: "branch-1", targetHandle: "right", type: "branch" },
  { id: "e-t1-b2", source: "trunk-1", sourceHandle: "right", target: "branch-2", targetHandle: "left", type: "branch" },

  { id: "e-t2-b3", source: "trunk-2", sourceHandle: "left", target: "branch-3", targetHandle: "right", type: "branch" },
  { id: "e-t2-b4", source: "trunk-2", sourceHandle: "right", target: "branch-4", targetHandle: "left", type: "branch" },

  { id: "e-t3-b5", source: "trunk-3", sourceHandle: "left", target: "branch-5", targetHandle: "right", type: "branch" },
  { id: "e-t3-b6", source: "trunk-3", sourceHandle: "right", target: "branch-6", targetHandle: "left", type: "branch" },

  { id: "e-t4-b7", source: "trunk-4", sourceHandle: "left", target: "branch-7", targetHandle: "right", type: "branch" },
  { id: "e-t4-b8", source: "trunk-4", sourceHandle: "right", target: "branch-8", targetHandle: "left", type: "branch" },

  // BRANCH → LEAF (NEW RULE: top → bottom, bottom → top)
  ...[
    ["branch-1", "leaf-1", "top", "bottom"],
    ["branch-1", "leaf-2", "bottom", "top"],

    ["branch-2", "leaf-3", "top", "bottom"],
    ["branch-2", "leaf-4", "bottom", "top"],

    ["branch-3", "leaf-5", "top", "bottom"],
    ["branch-3", "leaf-6", "bottom", "top"],

    ["branch-4", "leaf-7", "top", "bottom"],
    ["branch-4", "leaf-8", "bottom", "top"],

    ["branch-5", "leaf-9", "top", "bottom"],
    ["branch-6", "leaf-10", "top", "bottom"],

    ["branch-7", "leaf-11", "top", "bottom"],
    ["branch-8", "leaf-12", "top", "bottom"],
  ].map(([b, l, sH, tH], i) => ({
    id: `e-${b}-${l}-${i}`,
    source: b,
    sourceHandle: sH,
    target: l,
    targetHandle: tH,
    type: "branch",
  })),
];
