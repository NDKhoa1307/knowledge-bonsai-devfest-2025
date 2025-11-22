import React from "react";
import { BaseEdge, getBezierPath, type EdgeProps } from "reactflow";

const BranchEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // const { setEdges } = useReactFlow();
  // const onEdgeClick = () => {
  //   setEdges((edges) => edges.filter((edge) => edge.id !== id));
  // };

  return (
    <>
      {/* Thick main branch */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: "url(#branchGradient)",
          strokeWidth: 6,
          strokeLinecap: "round",
        }}
        markerEnd={markerEnd}
      />

      {/* <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className="button-edge__button" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer> */}
    </>
  );
};

export default BranchEdge;
