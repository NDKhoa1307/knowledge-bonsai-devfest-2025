import { Handle, Position } from "reactflow";

type Props = {
  data?: {
    label?: string;
  };
};

function LeafNode({ data }: Props) {
  return (
    <div className="relative">
      {/* Leaf shape container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "40px",
          height: "50px",
          background: "linear-gradient(135deg, #86efac 0%, #22c55e 50%, #16a34a 100%)",
          borderRadius: "0% 50% 50% 50%",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          transform: "rotate(-15deg)",
        }}
      >
        {/* Text overlay */}
        <span className="text-white font-semibold text-xs text-center px-2" style={{ transform: "rotate(15deg)" }}>
          {data?.label || "Leaf"}
        </span>

        {/* Leaf vein effect */}
        <div
          className="absolute top-0 left-1/2"
          style={{
            width: "1px",
            height: "100%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Incoming branch → leaf connection */}
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        style={{
          background: "#16a34a",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />

      {/* Branch can either connect at the top or bottom so this one is also a target */}
      <Handle
        id="right"
        type="target"
        position={Position.Right}
        style={{
          background: "#16a34a",
          border: "2px solid white",
          width: "8px",
          height: "8px",
        }}
      />
    </div>
  );
}

export default LeafNode;
