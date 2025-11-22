// import { Handle, Position } from "@xyflow/react";

import { Handle, Position } from "reactflow";

type Props = {
  data?: {
    label?: string;
  };
};

function TrunkNode({ data }: Props) {
  return (
    <div className="relative">
      {/* Trunk shape container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "30px",
          height: "60px",
          background: "linear-gradient(90deg, #78350f 0%, #92400e 40%, #78350f 100%)",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Text overlay */}
        <span className="text-white drop-shadow-[0_0_2px_black] font-bold text-xs text-center px-2">{data?.label || ""}</span>
        {/* Wood grain texture lines */}
        <div
          className="absolute"
          style={{
            width: "80%",
            height: "2px",
            background: "rgba(0, 0, 0, 0.2)",
            top: "30%",
            left: "10%",
            borderRadius: "2px",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "70%",
            height: "2px",
            background: "rgba(0, 0, 0, 0.2)",
            top: "70%",
            left: "15%",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* The top will be source connecting to other trunk => source */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{
          opacity: 0,
          background: "#78350f",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />

      {/* The bottom will be target connecting from root or other trunk => target */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{
          opacity: 0,
          background: "#78350f",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />

      {/* The left and right will be source connecting to branches => source */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{
          opacity: 0,
          background: "#78350f",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />

      {/* The right will be source connecting to branches => source */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          opacity: 0,
          background: "#78350f",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />
    </div>
  );
}

export default TrunkNode;
