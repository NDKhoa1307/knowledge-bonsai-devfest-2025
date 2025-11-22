import React from "react";
import { type EdgeProps, getBezierPath, useReactFlow } from "reactflow";

const TrunkEdge: React.FC<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) => {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature: 0.1, // less curvature → more trunk-like
  });

  // const { setEdges } = useReactFlow();
  // const deleteEdge = () => {
  //   setEdges((edges) => edges.filter((e) => e.id !== id));
  // };

  return (
    <>
      {/* Outer bark (dark edge) */}
      <path d={path} stroke="url(#trunkGradient)" strokeWidth={18} strokeLinecap="round" fill="none" />

      {/* Mid tone for bark thickness */}
      <path d={path} stroke="url(#trunkMid)" strokeWidth={12} strokeLinecap="round" fill="none" />

      {/* Highlight layer */}
      <path d={path} stroke="rgba(255,255,255,0.15)" strokeWidth={4} strokeLinecap="round" fill="none" />

      {/* Optional: Delete button */}
      {/* <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            position: "absolute",
            zIndex: 1000,
            pointerEvents: "all",
          }}
        >
          <button
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#5c3b17",
              color: "white",
              border: "2px solid white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={deleteEdge}
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer> */}
    </>
  );
};

export default TrunkEdge;
