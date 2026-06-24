import { LogoAsset } from "./components/LogoAsset";

const logoAssets = {
  wordmarkSrc: "/repsuite-logo.png",
  markSrc: "/repsuite-mark.png",
};

const tools = [
  {
    name: "RepStack",
    initials: "RS",
    label: "Reviews",
    description: "Review collection and pay-period tracking.",
    status: "Live",
    appHref: "https://rep-stack-gilt.vercel.app",
    githubHref: "#repstack-github",
  },
  {
    name: "RepReport",
    initials: "RR",
    label: "Exports",
    description: "Review parsing and export helper.",
    status: "Live",
    appHref: "#repreport-app",
    githubHref: "#repreport-github",
  },
  {
    name: "RepOS",
    initials: "OS",
    label: "Support",
    description: "Customer support workflow and ticket operating system prototype.",
    status: "Prototype",
    appHref: "#repos-app",
    githubHref: "#repos-github",
  },
  {
    name: "RepGuard",
    initials: "RG",
    label: "Claims",
    description: "Evidence and claim review workspace.",
    status: "Prototype",
    appHref: "#repguard-app",
    githubHref: "#repguard-github",
  },
];

const workflow = [
  "RepStack collects review data",
  "RepReport formats and exports reviews",
  "RepOS supports ticket workflows",
  "RepGuard supports claim and evidence review",
];

function externalLinkProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noreferrer" }
    : {};
}

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="RepSuite">
          <a className="brand" href="#" aria-label="RepSuite home">
            <LogoAsset
              alt="RepSuite mark"
              className="brand-mark"
              fallback="RS"
              src={logoAssets.markSrc}
            />
            <span>RepSuite</span>
          </a>
          <div className="suite-status">
            <span className="status-dot" />
            Static MVP
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <LogoAsset
              alt="RepSuite logo"
              className="hero-logo"
              fallback="RepSuite"
              src={logoAssets.wordmarkSrc}
            />
            <p className="eyebrow">Rep tools launcher</p>
            <h1 id="hero-title">All your Rep tools. One suite.</h1>
            <p className="hero-text">
              RepSuite is the central hub for RepStack, RepReport, RepOS, and
              RepGuard, giving every Rep tool a polished front door.
            </p>
          </div>

          <div className="hub-panel" aria-label="RepSuite tool overview">
            <div className="panel-header">
              <span>Suite overview</span>
              <span>4 tools</span>
            </div>
            <div className="mini-list">
              {tools.map((tool) => (
                <div className="mini-row" key={tool.name}>
                  <span className="mini-identity">
                    <span className="mini-icon">{tool.initials}</span>
                    <span>{tool.name}</span>
                  </span>
                  <span className={`status-badge ${tool.status.toLowerCase()}`}>
                    {tool.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" aria-labelledby="tools-title">
        <div className="section-heading">
          <p className="eyebrow">Launchpad</p>
          <h2 id="tools-title">Rep tools</h2>
        </div>

        <div className="tool-grid">
          {tools.map((tool) => (
            <article className="tool-card" key={tool.name}>
              <div className="card-topline">
                <div className="tool-heading">
                  <span className="tool-icon">{tool.initials}</span>
                  <div>
                    <h3>{tool.name}</h3>
                    <span className="tool-label">{tool.label}</span>
                  </div>
                </div>
                <span className={`status-badge ${tool.status.toLowerCase()}`}>
                  {tool.status}
                </span>
              </div>
              <p>{tool.description}</p>
              <div className="card-actions">
                <a
                  className="button primary"
                  href={tool.appHref}
                  {...externalLinkProps(tool.appHref)}
                >
                  Open App
                </a>
                <a
                  className="button secondary"
                  href={tool.githubHref}
                  {...externalLinkProps(tool.githubHref)}
                >
                  View GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block workflow-block" aria-labelledby="workflow-title">
        <div className="section-heading">
          <p className="eyebrow">Workflow</p>
          <h2 id="workflow-title">A simple path through the Rep ecosystem</h2>
        </div>

        <ol className="workflow-list">
          {workflow.map((step, index) => (
            <li className="workflow-step" key={step}>
              <span className="step-number">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
