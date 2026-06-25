# RepSuite

RepSuite is the static front door for the Rep tools ecosystem. It gives the
individual Rep apps a single polished launcher/dashboard with shared branding,
suite status, and quick links into each tool.

Live app: [https://repsuite.vercel.app](https://repsuite.vercel.app)

## What It Is

RepSuite is a lightweight hub for navigating the current Rep toolset. It does
not replace the individual apps; each tool keeps its own product surface,
repository, and deployment.

## Projects

### RepSuite

The central launcher hub for the Rep tools ecosystem. RepSuite brings RepStack,
RepReport, RepOS, and RepGuard into one polished front door without replacing
the individual apps.

### RepStack

A review collection and tracking app built to manage review cards, pay periods,
bonus estimates, promises, and export readiness.

### RepReport

A review parsing and export tool that turns collected review information into a
clean report-ready format.

### RepOS

A customer support operating system prototype focused on cleaner ticket
handling, internal workflows, and support team visibility.

### RepGuard

An evidence and claim review tool for organizing claim details, uploaded
evidence, and risk signals in a cleaner workflow.

## Current MVP Scope

RepSuite is intentionally simple at this stage:

- Static launcher/dashboard
- Built with Next.js and TypeScript
- Local/static UI only
- Deployed on Vercel
- No authentication
- No database
- No backend services
- No third-party integrations
- No monorepo structure

Some downstream app links may still be placeholders while the individual tools
continue to mature.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run type checks:

```bash
npm run typecheck
```

Build for production:

```bash
npm run build
```

The app runs locally at [http://localhost:3000](http://localhost:3000) by
default.

## Repository Notes

This repository contains the RepSuite launcher only. It is not a backend,
shared package workspace, or replacement for the child app repositories.
