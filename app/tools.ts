import toolData from "./tools.json";

export type ToolStatus = "Live" | "Prototype";

export type RepTool = {
  name: string;
  initials: string;
  logoSrc: string;
  accent: string;
  label: string;
  description: string;
  status: ToolStatus;
  appHref: string;
  githubHref: string;
};

function normalizeStatus(status: string): ToolStatus {
  if (status === "Live" || status === "Prototype") {
    return status;
  }
  throw new Error(`Unsupported Rep tool status: ${status}`);
}

export const tools = toolData.map((tool) => ({
  ...tool,
  status: normalizeStatus(tool.status),
})) satisfies RepTool[];
