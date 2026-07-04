type ConstellationTool = {
  name: string;
  logoSrc: string;
};

const NODES = [
  { x: 48, y: 34, bow: -16 },
  { x: 138, y: 124, bow: 14 },
  { x: 402, y: 124, bow: 14 },
  { x: 492, y: 34, bow: -16 },
];

const CX = 270;
const CY = 76;

/**
 * The hub-and-spokes constellation: the four tool marks connected to a
 * central RepSuite node by hairline curves, with small pulses of light
 * travelling inward along each spoke (SMIL — no client JS needed).
 */
export function HubConstellation({ tools }: { tools: ConstellationTool[] }) {
  return (
    <div className="constellation" aria-hidden="true">
      <svg viewBox="0 0 540 156" xmlns="http://www.w3.org/2000/svg">
        {tools.slice(0, NODES.length).map((tool, index) => {
          const node = NODES[index];
          const midX = (node.x + CX) / 2;
          const midY = (node.y + CY) / 2 + node.bow;
          const pathD = `M ${node.x} ${node.y} Q ${midX} ${midY} ${CX} ${CY}`;
          return (
            <g key={tool.name}>
              <path className="c-line" d={pathD} id={`c-path-${index}`} />
              <circle className="c-pulse" r="2.6">
                <animateMotion
                  begin={`${index * 0.9}s`}
                  calcMode="linear"
                  dur="3.6s"
                  repeatCount="indefinite"
                >
                  <mpath href={`#c-path-${index}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  begin={`${index * 0.9}s`}
                  dur="3.6s"
                  keyTimes="0;0.12;0.82;1"
                  repeatCount="indefinite"
                  values="0;1;1;0"
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

        <circle className="c-ring" cx={CX} cy={CY} r="27">
          <animate
            attributeName="r"
            dur="3s"
            repeatCount="indefinite"
            values="27;38"
          />
          <animate
            attributeName="opacity"
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
