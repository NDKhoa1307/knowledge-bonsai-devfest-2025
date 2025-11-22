import React from "react";

type Props = {
  children?: React.ReactNode;
};

function SVGProvider({ children }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a2b0f" />
            <stop offset="50%" stopColor="#5c3b17" />
            <stop offset="100%" stopColor="#3a1f0c" />
          </linearGradient>

          <linearGradient id="trunkMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#70421e" />
            <stop offset="50%" stopColor="#8a5630" />
            <stop offset="100%" stopColor="#6f4320" />
          </linearGradient>
        </defs>
      </svg>

      {children}
    </div>
  );
}

export default SVGProvider;
