import { LogoAsset } from "./components/LogoAsset";

const logoAssets = {
  markSrc: "/repsuite-mark.png",
};

const tools = [
  {
    name: "RepStack",
    initials: "RS",
    logoSrc: "/repstack-mark.png",
    accent: "#2563eb",
    label: "Reviews",
    description: "Review collection and pay-period tracking.",
    status: "Live",
    appHref: "https://rep-stack-gilt.vercel.app",
    githubHref: "https://github.com/robertbradley-oss/RepStack",
  },
  {
    name: "RepReport",
    initials: "RR",
    logoSrc: "/repreport-mark.png",
    accent: "#2ea44f",
    label: "Exports",
    description: "Review parsing and export helper.",
    status: "Live",
    appHref: "https://repreport-beige.vercel.app",
    githubHref: "https://github.com/robertbradley-oss/RepReport",
  },
  {
    name: "RepOS",
    initials: "OS",
    logoSrc: "/repos-mark.png",
    accent: "#6d49d4",
    label: "Support",
    description: "Customer support workflow and ticket operating system prototype.",
    status: "Prototype",
    appHref: "https://rep-os.vercel.app",
    githubHref: "https://github.com/robertbradley-oss/RepOS",
  },
  {
    name: "RepGuard",
    initials: "RG",
    logoSrc: "/repguard-mark.png",
    accent: "#b8801f",
    label: "Claims",
    description: "Evidence and claim review workspace.",
    status: "Prototype",
    appHref: "https://claimguard-taupe.vercel.app",
    githubHref: "https://github.com/robertbradley-oss/RepGuard",
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

// Lucide `arrow-right` (ISC) — inlined, no icon dependency.
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// GitHub mark (official octicon path, MIT) — inlined to avoid an icon dependency.
function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="page-shell">
      <header className="topbar" aria-label="RepSuite">
        <a className="brand" href="#" aria-label="RepSuite home">
          <LogoAsset
            alt="RepSuite mark"
            className="brand-mark"
            fallback="RS"
            src={logoAssets.markSrc}
          />
          <span className="brand-text">
            <span className="brand-name">
              Rep<span className="brand-accent">Suite</span>
            </span>
            <span className="brand-tagline">All your Rep tools. One suite.</span>
          </span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Rep tools launcher</span>
          <h1 id="hero-title">Your Rep tools, in one place.</h1>
          <p className="hero-sub">
            RepSuite is the central hub for RepStack, RepReport, RepOS, and
            RepGuard — a calm, frosted front door to every Rep tool.
          </p>
        </div>

        <aside className="hub-panel glass-strong refract" aria-label="Suite overview">
          <div className="panel-head">
            <span className="micro">Suite status</span>
          </div>
          <div className="mini-list">
            {tools.map((tool) => (
              <div className="mini-row" key={tool.name}>
                <span className="mini-id">
                  <LogoAsset
                    alt={`${tool.name} logo`}
                    className="chip-sm"
                    fallback={tool.initials}
                    src={tool.logoSrc}
                  />
                  {tool.name}
                </span>
                <span className={`badge ${tool.status.toLowerCase()}`}>
                  {tool.status}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="section" id="launchpad" aria-labelledby="tools-title">
        <div className="section-head">
          <h2 id="tools-title">Rep tools</h2>
        </div>

        <div className="tool-grid">
          {tools.map((tool) => (
            <article
              className="tool-card glass-strong refract"
              key={tool.name}
              style={{ "--tool-accent": tool.accent } as React.CSSProperties}
            >
              <div className="card-top">
                <LogoAsset
                  alt={`${tool.name} logo`}
                  className="chip"
                  fallback={tool.initials}
                  src={tool.logoSrc}
                />
              </div>
              <h3>{tool.name}</h3>
              <span className="tool-label">{tool.label}</span>
              <p>{tool.description}</p>
              <div className="card-actions">
                <a
                  className="learn-more"
                  href={tool.appHref}
                  aria-label={`Open ${tool.name}`}
                  {...externalLinkProps(tool.appHref)}
                >
                  <span className="lm-circle" aria-hidden="true" />
                  <span className="lm-arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                  <span className="lm-text">Open App</span>
                </a>
                <a
                  className="gh-button"
                  href={tool.githubHref}
                  {...externalLinkProps(tool.githubHref)}
                >
                  <GithubIcon />
                  <span className="text">View GitHub</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section workflow-section" aria-labelledby="workflow-title">
        <div className="section-head workflow-head">
          <span className="eyebrow-mono">Workflow</span>
          <h2 id="workflow-title">A simple path through the Rep ecosystem</h2>
        </div>

        <ol className="workflow-list">
          {workflow.map((step, index) => (
            <li className="workflow-step glass-strong refract" key={step}>
              <span className="step-index">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="footer">
        <span className="footer-lead">
          <span className="footer-brand">RepSuite, 2026.</span> All your Rep
          tools. One suite.
        </span>
        <span className="footer-right">
          <span className="footer-meta">Rep hub · v0.1</span>
        </span>
      </footer>
    </main>
  );
}
