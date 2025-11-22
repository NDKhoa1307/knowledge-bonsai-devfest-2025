import React from "react";

type Props = {
  children?: React.ReactNode;
};

function SVGProvider({ children }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Branch Gradient - Warm, natural wood tones */}
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="25%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          {/* Branch with depth and highlights */}
          <radialGradient id="branchRadial" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          {/* Trunk Gradient - Rich, deep bark texture */}
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a1f0c" />
            <stop offset="20%" stopColor="#4a2b0f" />
            <stop offset="50%" stopColor="#6b3e1f" />
            <stop offset="80%" stopColor="#4a2b0f" />
            <stop offset="100%" stopColor="#2d1808" />
          </linearGradient>

          {/* Trunk with radial depth */}
          <radialGradient id="trunkRadial" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#8b5a3c" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#5c3b17" />
            <stop offset="100%" stopColor="#3a1f0c" />
          </radialGradient>

          {/* Trunk Mid - Lighter inner wood */}
          <linearGradient id="trunkMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a5630" />
            <stop offset="25%" stopColor="#a0673f" />
            <stop offset="50%" stopColor="#b8885a" />
            <stop offset="75%" stopColor="#a0673f" />
            <stop offset="100%" stopColor="#8a5630" />
          </linearGradient>

          {/* Additional beautiful gradients */}

          {/* Leaf Gradient - Vibrant green */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="30%" stopColor="#16a34a" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Leaf Radial - More depth */}
          <radialGradient id="leafRadial" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </radialGradient>

          {/* Golden highlights for special elements */}
          <linearGradient id="goldenHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Pot/Earth gradient */}
          <linearGradient id="potGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="30%" stopColor="#78350f" />
            <stop offset="70%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>

          {/* Subtle texture filter for organic feel */}
          <filter id="organicTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="atop" />
          </filter>

          {/* Soft glow for magical effect */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Drop shadow for depth */}
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {children}
    </div>
  );
}

export default SVGProvider;
