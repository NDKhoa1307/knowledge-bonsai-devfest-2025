import { Handle, Position } from "reactflow";

type Props = {
  data?: {
    label?: string;
  };
};

function RootNode({ data }: Props) {
  return (
    <div className="relative">
      {/* Bonsai pot */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "160px",
          height: "80px",
          background: "linear-gradient(180deg, #8b5a2b 0%, #5c3b17 100%)",
          borderRadius: "0 0 30px 30px",
          boxShadow: "inset 0 4px 6px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.25)",
          border: "3px solid #3a2412",
        }}
      >
        {/* Label (inside pot) */}
        <span className="text-white font-semibold text-sm text-center px-2">{data?.label || "Pot"}</span>

        {/* Inner rim highlight */}
        <div
          className="absolute"
          style={{
            top: 0,
            left: "8%",
            width: "84%",
            height: "12px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0))",
            borderRadius: "0 0 10px 10px",
          }}
        />

        {/* Front lip shadow */}
        <div
          className="absolute"
          style={{
            bottom: 0,
            left: "8%",
            width: "84%",
            height: "12px",
            background: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.4))",
            borderRadius: "0 0 20px 20px",
          }}
        />
      </div>

      {/* Outgoing root → trunk connection */}
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        style={{
          background: "#5c3b17",
          border: "2px solid white",
          width: "10px",
          height: "10px",
        }}
      />
    </div>
  );
}

export default RootNode;
