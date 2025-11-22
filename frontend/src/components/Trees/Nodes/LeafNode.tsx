import { Handle, Position } from "reactflow";

type Props = {
  data?: {
    label?: string;
  };
};

function LeafNode({ data }: Props) {
  return (
    <div className="relative">
      {/* Leaf shape container with enhanced styling */}
<div
          className="relative flex items-center justify-center group cursor-pointer"
          style={{
            width: "169px",
            height: "65px",
            background: "linear-gradient(135deg, #bbf7d0 0%, #4ade80 30%, #22c55e 60%, #16a34a 100%)",
            borderRadius: "0% 80% 50% 80%",
            boxShadow: `
              0 4px 12px rgba(34, 197, 94, 0.3),
              inset -2px -2px 8px rgba(0, 0, 0, 0.1),
              inset 2px 2px 8px rgba(255, 255, 255, 0.2)
            `,
            transform: "rotate(-15deg)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.3s ease",
          }}
        >

        {/* Central vein (midrib) */}
        <div
          className="absolute top-0 left-1/2"
          style={{
            width: "2px",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(22,163,74,0.3) 50%, rgba(22,163,74,0) 100%)",
            transform: "translateX(-50%)",
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
          }}
        />

        {/* Secondary veins - left side */}
        <div
          className="absolute"
          style={{
            width: "50%",
            height: "100%",
            left: "0",
            top: "0",
            background: `
              linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.15) 49%, rgba(255,255,255,0.15) 51%, transparent 52%),
              linear-gradient(50deg, transparent 58%, rgba(255,255,255,0.1) 59%, rgba(255,255,255,0.1) 61%, transparent 62%),
              linear-gradient(40deg, transparent 68%, rgba(255,255,255,0.1) 69%, rgba(255,255,255,0.1) 71%, transparent 72%)
            `,
          }}
        />

        {/* Secondary veins - right side */}
        <div
          className="absolute"
          style={{
            width: "50%",
            height: "100%",
            right: "0",
            top: "0",
            background: `
              linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.15) 49%, rgba(255,255,255,0.15) 51%, transparent 52%),
              linear-gradient(-50deg, transparent 58%, rgba(255,255,255,0.1) 59%, rgba(255,255,255,0.1) 61%, transparent 62%),
              linear-gradient(-40deg, transparent 68%, rgba(255,255,255,0.1) 69%, rgba(255,255,255,0.1) 71%, transparent 72%)
            `,
          }}
        />

        {/* Subtle texture overlay for organic feel */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 40%),
              radial-gradient(circle at 70% 60%, rgba(0,0,0,0.05) 0%, transparent 30%)
            `,
            borderRadius: "0% 50% 50% 50%",
            pointerEvents: "none",
          }}
        />

        {/* Text overlay */}
        <span
          className="relative z-10 text-white drop-shadow-[0_0_2px_black] font-bold text-xs text-center px-2 leading-tight drop-shadow-md"
          style={{
            transform: "rotate(15deg)",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          {data?.label || "Leaf"}
        </span>

        {/* Subtle highlight at the tip */}
        <div
          className="absolute"
          style={{
            top: "5%",
            right: "15%",
            width: "15px",
            height: "15px",
            background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Stem connecting to branch */}
      {/* <div
        className="absolute"
        style={{
          width: "3px",
          height: "12px",
          background: "linear-gradient(180deg, #78350f 0%, #a16207 100%)",
          bottom: "50%",
          left: "50%",
          transform: "translateX(-50%) rotate(-15deg)",
          transformOrigin: "bottom",
          borderRadius: "2px",
          boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      /> */}

      {/* Connection handles */}
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        style={{
          opacity: 0,
          background: "linear-gradient(135deg, #a16207 0%, #78350f 100%)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
          width: "10px",
          height: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      />

      <Handle
        id="right"
        type="target"
        position={Position.Right}
        style={{
          opacity: 0,
          background: "linear-gradient(135deg, #a16207 0%, #78350f 100%)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
          width: "10px",
          height: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      />

      {/* Optional: Add CSS for hover animation
      <style>{`
        .group:hover {
          transform: rotate(-12deg) scale(1.05) !important;
          box-shadow: 
            0 6px 20px rgba(34, 197, 94, 0.4),
            inset -2px -2px 8px rgba(0, 0, 0, 0.15),
            inset 2px 2px 10px rgba(255, 255, 255, 0.3) !important;
        }
      `}</style> */}
    </div>
  );
}

export default LeafNode;
