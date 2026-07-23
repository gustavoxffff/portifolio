export interface StackLayer {
  layer: string;
  technologies: string[];
}

export const stack: StackLayer[] = [
  {
    layer: "baixo nível",
    technologies: ["C", "Rust", "Linux", "Assembly", "Performance Profiling"],
  },
  {
    layer: "web",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "REST APIs"],
  },
  {
    layer: "IA agêntica",
    technologies: [
      "LLM Integration",
      "RAG",
      "Tool-use Agents",
      "Multi-agent Systems",
      "Prompt Engineering",
    ],
  },
];
