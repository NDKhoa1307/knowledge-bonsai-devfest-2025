import { Handle, Position } from "reactflow";

type Props = {
  data?: {
    label?: string;
  };
};

function BranchNode({ data }: Props) {
  return (
    <div className="relative">
      {/* Branch shape container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "124px",
          height: "32px",
          background: "linear-gradient(90deg, #92400e 0%, #a16207 50%, #92400e 100%)",
          borderRadius: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Text overlay */}
        <span className="text-white drop-shadow-[0_0_2px_black] font-semibold text-xs text-center px-2">{data?.label || ""}</span>

        {/* Branch texture detail */}
        <div
          className="absolute"
          style={{
            width: "6px",
            height: "6px",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            top: "25%",
            left: "15%",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "6px",
            height: "6px",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
            top: "60%",
            right: "20%",
          }}
        />
      </div>

      {/* Handles */}

      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{
          background: "#92400e",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />

      {/* Right should be the source that will connect to other branch if possible */}
      <Handle
        id="right"
        type="target"
        position={Position.Right}
        style={{
          background: "#92400e",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />

      {/* Top and Bottom handles - for connecting to leaves => source*/}
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        style={{
          opacity: 0,
          background: "#22c55e",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />

      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        style={{
          opacity: 0,
          background: "#22c55e",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />
    </div>
  );
}

export default BranchNode;
