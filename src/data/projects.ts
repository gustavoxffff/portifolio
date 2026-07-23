export interface Project {
  name: string;
  description: string;
  stack: string[];
  link: string;
}

export const projects: Project[] = [
  {
    name: "system-runtime",
    description: "Custom runtime for embedded systems with zero-copy IPC",
    stack: ["C", "Linux", "IPC"],
    link: "#",
  },
  {
    name: "agent-orchestrator",
    description: "Multi-agent coordination framework with tool-use and memory",
    stack: ["TypeScript", "LLM", "RAG"],
    link: "#",
  },
  {
    name: "web-platform",
    description: "Full-stack web application with real-time collaboration",
    stack: ["TypeScript", "React", "PostgreSQL"],
    link: "#",
  },
];
