type ConstellationTool = {
  name: string;
  logoSrc: string;
  accent: string;
};

const NODES = [
  { x: 48, y: 34, bow: -16 },
  { x: 138, y: 124, bow: 14 },
  { x: 402, y: 124, bow: 14 },
  { x: 492, y: 34, bow: -16 },
];

const TWINKLES = [
  { x: 95, y: 88 },
  { x: 182, y: 38 },
  { x: 214, y: 122 },
  { x: 330, y: 28 },
  { x: 362, y: 112 },
  { x: 452, y: 86 },
];

const CX = 270;
const CY = 76;

/**
 * The hub-and-spokes constellation, fully alive: each spoke carries its
 * tool's accent colour with a flowing particle stream along the line and
 * comet pulses (with fading tails) travelling into the hub, leaving a
 * departure ripple at the node. The hub breathes with a glow, a slowly
 * rotating dashed orbit and double ripple rings, and sends smaller teal
 * pulses back out — traffic in both directions. All SMIL + CSS, no JS.
 */
export function HubConstellation({ tools }: { tools: ConstellationTool[] }) {
  return (
    <div className="constellation" aria-hidden="true">
      <svg viewBox="0 0 540 156" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hubGlow">
            <stop offset="0%" stopColor="rgba(13, 148, 136, 0.4)" />
            <stop offset="55%" stopColor="rgba(13, 148, 136, 0.14)" />
            <stop offset="100%" stopColor="rgba(13, 148, 136, 0)" />
          </radialGradient>
        </defs>

        {TWINKLES.map((spot, index) => (
          <circle
            className="c-twinkle"
            cx={spot.x}
            cy={spot.y}
            key={`${spot.x}-${spot.y}`}
            r="1.1"
            style={{ animationDelay: `${index * 0.55}s` }}
          />
        ))}

        {tools.slice(0, NODES.length).map((tool, index) => {
          const node = NODES[index];
          const midX = (node.x + CX) / 2;
          const midY = (node.y + CY) / 2 + node.bow;
          const pathD = `M ${node.x} ${node.y} Q ${midX} ${midY} ${CX} ${CY}`;
          const beat = index * 0.9;
          return (
            <g
              className="c-spoke"
              key={tool.name}
              style={{ "--spoke-accent": tool.accent } as React.CSSProperties}
            >
              <path className="c-line" d={pathD} id={`c-path-${index}`} />
              <path className="c-flow" d={pathD} />

              {/* Departure ripple where the comet leaves the node. */}
              <circle className="c-ripple" cx={node.x} cy={node.y} r="4">
                <animate
                  attributeName="r"
                  begin={`${beat}s`}
                  dur="3.6s"
                  keyTimes="0;0.3;1"
                  repeatCount="indefinite"
                  values="4;15;15"
                />
                <animate
                  attributeName="opacity"
                  begin={`${beat}s`}
                  dur="3.6s"
                  keyTimes="0;0.05;0.3;1"
                  repeatCount="indefinite"
                  values="0;0.6;0;0"
                />
              </circle>

              {/* Comet with a fading tail: lead dot + two trailers. */}
              {[
                { delay: 0, r: 2.8, peak: 1 },
                { delay: 0.12, r: 1.9, peak: 0.55 },
                { delay: 0.24, r: 1.3, peak: 0.3 },
              ].map((dot) => (
                <circle className="c-comet" key={dot.delay} r={dot.r}>
                  <animateMotion
                    begin={`${beat + dot.delay}s`}
                    calcMode="linear"
                    dur="3.6s"
                    repeatCount="indefinite"
                  >
                    <mpath href={`#c-path-${index}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    begin={`${beat + dot.delay}s`}
                    dur="3.6s"
                    keyTimes="0;0.1;0.85;1"
                    repeatCount="indefinite"
                    values={`0;${dot.peak};${dot.peak};0`}
                  />
                </circle>
              ))}

              {/* Return traffic: a smaller teal pulse from the hub back out. */}
              <circle className="c-out" r="1.8">
                <animateMotion
                  begin={`${1.9 + index * 1.1}s`}
                  calcMode="linear"
                  dur="4.4s"
                  keyPoints="1;0"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                >
                  <mpath href={`#c-path-${index}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  begin={`${1.9 + index * 1.1}s`}
                  dur="4.4s"
                  keyTimes="0;0.12;0.85;1"
                  repeatCount="indefinite"
                  values="0;0.55;0.55;0"
                />
              </circle>

              {/* Breathing accent halo behind the node. */}
              <circle className="c-halo" cx={node.x} cy={node.y} r="22">
                <animate
                  attributeName="r"
                  begin={`${index * 0.7}s`}
                  dur="5s"
                  repeatCount="indefinite"
                  values="21;24;21"
                />
              </circle>
              <circle className="c-node" cx={node.x} cy={node.y} r="20" />
              <image
                height="22"
                href={tool.logoSrc}
                preserveAspectRatio="xMidYMid meet"
                width="22"
                x={node.x - 11}
                y={node.y - 11}
              />
            </g>
          );
        })}

        {/* Hub: breathing glow, rotating dashed orbit, double ripple rings. */}
        <circle className="c-glow" cx={CX} cy={CY} r="40">
          <animate
            attributeName="opacity"
            dur="4s"
            repeatCount="indefinite"
            values="0.45;0.85;0.45"
          />
        </circle>
        <circle className="c-orbit" cx={CX} cy={CY} r="33" />
        <circle className="c-ring" cx={CX} cy={CY} r="27">
          <animate
            attributeName="r"
            dur="3s"
            repeatCount="indefinite"
            values="27;40"
          />
          <animate
            attributeName="opacity"
            dur="3s"
            repeatCount="indefinite"
            values="0.55;0"
          />
        </circle>
        <circle className="c-ring" cx={CX} cy={CY} r="27">
          <animate
            attributeName="r"
            begin="1.5s"
            dur="3s"
            repeatCount="indefinite"
            values="27;40"
          />
          <animate
            attributeName="opacity"
            begin="1.5s"
            dur="3s"
            repeatCount="indefinite"
            values="0.55;0"
          />
        </circle>
        <circle className="c-node c-node-center" cx={CX} cy={CY} r="27" />
        <image
          height="32"
          href="/repsuite-mark.png"
          preserveAspectRatio="xMidYMid meet"
          width="32"
          x={CX - 16}
          y={CY - 16}
        />
      </svg>
    </div>
  );
}
