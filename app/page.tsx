import { Fragment } from "react";
import { AmbientBackground } from "./components/AmbientBackground";
import { CommandPalette } from "./components/CommandPalette";
import { HubConstellation } from "./components/HubConstellation";
import { LogoAsset } from "./components/LogoAsset";
import { SuiteStatus, type SuiteStatusTool } from "./components/SuiteStatus";

const logoAssets = {
  markSrc: "/repsuite-mark.png",
};

const heroHeadline = "Your Rep tools, in one place.";

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
    description: "Customer support workflow and ticket operating system.",
    status: "Live",
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
    status: "Live",
    appHref: "https://claimguard-taupe.vercel.app",
    githubHref: "https://github.com/robertbradley-oss/RepGuard",
  },
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

export default function Home() {
  return (
    <main className="page-shell">
      <AmbientBackground />
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
        <CommandPalette
          tools={tools.map((tool) => ({
            name: tool.name,
            label: tool.label,
            logoSrc: tool.logoSrc,
            appHref: tool.appHref,
            githubHref: tool.githubHref,
          }))}
        />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Rep tools launcher</span>
          <h1 id="hero-title">
            {heroHeadline.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                {index > 0 ? " " : null}
                <span
                  className="h1-word"
                  style={{ "--wi": index } as React.CSSProperties}
                >
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="hero-sub">
            RepSuite is the central hub for RepStack, RepReport, RepOS, and
            RepGuard — a calm, frosted front door to every Rep tool.
          </p>
          <HubConstellation
            tools={tools.map((tool) => ({
              name: tool.name,
              logoSrc: tool.logoSrc,
              accent: tool.accent,
            }))}
          />
        </div>

        <SuiteStatus
          tools={tools.map(
            (tool): SuiteStatusTool => ({
              name: tool.name,
              initials: tool.initials,
              logoSrc: tool.logoSrc,
              status: tool.status as SuiteStatusTool["status"],
              appHref: tool.appHref,
            }),
          )}
        />
      </section>

      <section className="section" id="launchpad" aria-labelledby="tools-title">
        <div className="section-head">
          <h2 id="tools-title">Rep tools</h2>
        </div>

        <div className="tool-grid">
          {tools.map((tool) => (
            <article
              className="tool-card glass-strong refract"
              data-tool={tool.name}
              key={tool.name}
              style={{ "--tool-accent": tool.accent } as React.CSSProperties}
            >
              <span aria-hidden="true" className="card-watermark">
                <img alt="" src={tool.logoSrc} />
              </span>
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
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span className="footer-lead">
          <LogoAsset
            alt="RepSuite mark"
            className="footer-mark"
            fallback="RS"
            src={logoAssets.markSrc}
          />
          <span className="footer-brand">RepSuite, 2026.</span>
        </span>
        <span className="footer-right">
          <span className="footer-meta">v0.1</span>
        </span>
      </footer>
    </main>
  );
}
