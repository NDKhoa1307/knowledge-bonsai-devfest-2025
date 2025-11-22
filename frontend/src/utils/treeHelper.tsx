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
    if (isRigidNode(n)) return; // pot + trunk + branches completely fixed

    // Group by Y position with tighter grouping for better collision detection
    const yKey = Math.round(n.position.y / 20);
    if (!levels[yKey]) levels[yKey] = [];
    levels[yKey].push(n);
  });

  // Resolve collisions for each level
  Object.values(levels).forEach(resolveCollisions);

  // Additional pass: Check for leaf-branch collisions across different Y levels
  const leafNodes = nodes.filter((n) => n.type === "leaf");
  const branchNodes = nodes.filter((n) => n.type === "branch" || n.type === "branchRight");

  leafNodes.forEach((leaf) => {
    branchNodes.forEach((branch) => {
      const dx = Math.abs(leaf.position.x - branch.position.x);
      const dy = Math.abs(leaf.position.y - branch.position.y);

      // If too close, move leaf away (increased detection range)
      if (dx < 120 && dy < 90) {
        // Determine which side of trunk the leaf is on
        const isLeftSide = leaf.position.x < 0;

        // Move leaf AWAY from trunk (outward)
        // Left side: push more left (negative)
        // Right side: push more right (positive)
        const horizontalShift = isLeftSide ? -50 : 50;

        leaf.position.x += horizontalShift;
        leaf.position.y -= 30; // Reduced from 50 to be more gentle
      }
    });
  });
}

export function addNaturalRandomness(nodes: Node[]) {
  nodes.forEach((n) => {
    let jitterX = 0;
    let jitterY = 0;

    switch (n.type) {
      case "branch":
      case "branchRight":
        // Branch: subtle horizontal sway, slight upward curve
        // jitterX = (Math.random() - 0.5) * 50;
        // Very slight upward tendency for branches (natural growth)
        jitterY = -5 - Math.random() * 15; // -5 to -20
        break;

      case "leaf": {
        jitterX = (Math.random() - 0.5) * 80; // -40 to +40

        const baseUpward = -20 - Math.random() * 40;
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
  const allNonLeafNodes = nodes.filter((n) => n.type !== "leaf");

  // Check each leaf against ALL other nodes (especially branches)
  leafNodes.forEach((leaf) => {
    // Determine which side of the trunk this leaf is on
    const isLeftSide = leaf.position.x < -65;

    allNonLeafNodes.forEach((other) => {
      const dx = Math.abs(leaf.position.x - other.position.x);
      const dy = Math.abs(leaf.position.y - other.position.y);

      // Define collision zones based on node types
      const minHorizontalDistance = 120; // Increased from 100
      const minVerticalDistance = 90; // Increased from 80

      // If leaf is too close to another node, push it away
      if (dx < minHorizontalDistance && dy < minVerticalDistance) {
        // Calculate push amounts
        const horizontalPush = (minHorizontalDistance - dx) * 0.8; // Increased from 0.6
        const verticalPush = (minVerticalDistance - dy) * 1.6; // Reduced from 1.8 to be gentler

        // Push AWAY from trunk (outward)
        if (isLeftSide) {
          leaf.position.x -= horizontalPush; // Push more left
        } else {
          leaf.position.x += horizontalPush; // Push more right
        }

        // Always push up
        leaf.position.y -= verticalPush;
      }
    });
  });

  // Separate left and right leaves for better processing
  const leftLeaves = leafNodes.filter((n) => n.position.x < -65).sort((a, b) => b.position.x - a.position.x); // Sort right to left (closest to trunk first)
  const rightLeaves = leafNodes.filter((n) => n.position.x >= -65).sort((a, b) => a.position.x - b.position.x); // Sort left to right (closest to trunk first)

  // Process left side leaves
  for (let i = 1; i < leftLeaves.length; i++) {
    const prev = leftLeaves[i - 1];
    const curr = leftLeaves[i];

    const dx = Math.abs(curr.position.x - prev.position.x); // Use abs for left side
    const dy = Math.abs(curr.position.y - prev.position.y);

    if (dx < MIN_HORIZONTAL_SPACING && dy < LEAF_VERTICAL_SPACING) {
      curr.position.x -= (MIN_HORIZONTAL_SPACING - dx) * 0.5; // Reduced from 0.7
      curr.position.y -= (LEAF_VERTICAL_SPACING - dy) * 0.6; // Much gentler for left side
    }
  }

  // Process right side leaves
  for (let i = 1; i < rightLeaves.length; i++) {
    const prev = rightLeaves[i - 1];
    const curr = rightLeaves[i];

    const dx = curr.position.x - prev.position.x;
    const dy = Math.abs(curr.position.y - prev.position.y);

    if (dx < MIN_HORIZONTAL_SPACING && dy < LEAF_VERTICAL_SPACING) {
      curr.position.x += (MIN_HORIZONTAL_SPACING - dx) * 0.5; // Reduced from 0.7
      curr.position.y -= (LEAF_VERTICAL_SPACING - dy) * 0.6; // Match left side
    }
  }
}
