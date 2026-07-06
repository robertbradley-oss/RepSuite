import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const toolsPath = path.join(root, "app", "tools.json");
const tools = JSON.parse(await readFile(toolsPath, "utf8"));
const timeoutMs = 15_000;

async function checkUrl(label, href) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response = await fetch(href, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });

    if (response.status === 405 || response.status === 403) {
      response = await fetch(href, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    console.log(`ok ${label}: ${response.status} ${href}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${label}: ${message} (${href})`);
  } finally {
    clearTimeout(timer);
  }
}

const checks = tools.flatMap((tool) => [
  checkUrl(`${tool.name} app`, tool.appHref),
  checkUrl(`${tool.name} GitHub`, tool.githubHref),
]);

const results = await Promise.allSettled(checks);
const failures = results.filter((result) => result.status === "rejected");

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`failed ${failure.reason.message}`);
  }
  process.exit(1);
}
