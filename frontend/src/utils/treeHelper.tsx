import type { Node } from "reactflow";

// Spacing constants
const MIN_HORIZONTAL_SPACING = 160; // Increased for better separation
const MIN_VERTICAL_SPACING = 100; // Increased for leaves
const LEAF_VERTICAL_SPACING = 120; // Extra space for leaves specifically

function isRigidNode(n: Node) {
  // Nodes that must NEVER move after initial layout
  return n.type === "pot" || n.type === "trunk" || isBranchNode(n);
}

function isBranchNode(n: Node) {
  return n.type === "branch" || n.type === "branchRight";
}

function resolveCollisions(nodesOnLevel: Node[]) {
  nodesOnLevel.sort((a, b) => a.position.x - b.position.x);

  for (let i = 1; i < nodesOnLevel.length; i++) {
    const prev = nodesOnLevel[i - 1];
    const curr = nodesOnLevel[i];

    // Horizontal collision resolution
    const dx = curr.position.x - prev.position.x;
    const minSpacing =
      curr.type === "leaf" || prev.type === "leaf"
        ? MIN_HORIZONTAL_SPACING + 20 // Extra space for leaves
        : MIN_HORIZONTAL_SPACING;

    if (dx < minSpacing) {
      const shift = minSpacing - dx;
      curr.position.x += shift;
    }

    // Vertical staggering - push leaves upward when too close
    if (curr.type === "leaf" && prev.type === "leaf") {
      const dy = Math.abs(curr.position.y - prev.position.y);

      if (dy < LEAF_VERTICAL_SPACING) {
        // Alternate between moving up and slightly less up for variety
        const verticalShift = LEAF_VERTICAL_SPACING - dy;
        const upwardBias = i % 2 === 0 ? 1.2 : 0.8; // Vary the upward push
        curr.position.y -= verticalShift * upwardBias;
      }
    }
  }
}

export function resolveAllLevels(nodes: Node[]) {
  const levels: Record<number, Node[]> = {};

  nodes.forEach((n) => {
    if (isRigidNode(n)) return; // pot + trunk completely fixed

    // Group by Y position with tighter grouping for better collision detection
    const yKey = Math.round(n.position.y / 20);
    if (!levels[yKey]) levels[yKey] = [];
    levels[yKey].push(n);
  });

  // Resolve collisions for each level
  Object.values(levels).forEach(resolveCollisions);
}

export function addNaturalRandomness(nodes: Node[]) {
  nodes.forEach((n) => {
    let jitterX = 0;
    let jitterY = 0;

    switch (n.type) {
      case "branch":
      case "branchRight":
        // Branch: subtle horizontal sway, slight upward curve
        jitterX = (Math.random() - 0.5) * 50;
        // Very slight upward tendency for branches (natural growth)
        jitterY = -5 - Math.random() * 15; // -5 to -20
        break;

      case "leaf": { // Leaf: more pronounced horizontal sway
        jitterX = (Math.random() - 0.5) * 80; // -40 to +40

        // Strong upward sway with natural variation
        // Base upward movement: -20 to -60 (mostly up)
        const baseUpward = -20 - Math.random() * 40;

        // Add occasional extra lift for some leaves (30% chance)
        const extraLift = Math.random() < 0.3 ? -20 : 0;

        jitterY = baseUpward + extraLift; // Result: -20 to -80 (all upward)
        break;
      }

      // pot / trunk → do not move at all
      default:
        return;
    }

    n.position.x += jitterX;
    n.position.y += jitterY;
  });
}

// Additional utility: Apply final polish to prevent any remaining overlaps
export function finalPolish(nodes: Node[]) {
  const leafNodes = nodes.filter((n) => n.type === "leaf");

  // Sort by X position
  leafNodes.sort((a, b) => a.position.x - b.position.x);

  // Final pass: ensure no leaves are too close
  for (let i = 1; i < leafNodes.length; i++) {
    const prev = leafNodes[i - 1];
    const curr = leafNodes[i];

    const dx = curr.position.x - prev.position.x;
    const dy = Math.abs(curr.position.y - prev.position.y);

    // If leaves are close in both X and Y, push current one up and right
    if (dx < MIN_HORIZONTAL_SPACING && dy < LEAF_VERTICAL_SPACING) {
      curr.position.x += (MIN_HORIZONTAL_SPACING - dx) * 0.5;
      curr.position.y -= (LEAF_VERTICAL_SPACING - dy) * 1.2; // More upward push
    }
  }
}

// Usage in convertTreeToReactFlow:
// After: processNode(treeData.root, null, 0, 0);
// Call in sequence:
// 1. resolveAllLevels(nodes);      // Fix collisions
// 2. addNaturalRandomness(nodes);  // Add natural sway
// 3. finalPolish(nodes);           // Final cleanup pass
