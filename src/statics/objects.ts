const technologies = [
  "React",
  "JavaScript/TypeScript",
  "Node.js",
  "TailwindCSS",
  "Three.js",
  "GraphQL",
  "MCP",
  "Docker & CI/CD",
  "AWS/GCP/Azure",
  "Git",
  "Rust",
  "Go",
  "MongoDB/PostgreSQL",
  "Testing (Jest/Playwright)",
  "UI/UX Design",
  "Performance Optimization",
  "Full-Stack Development",
  "RESTful APIs",
];

type Certification = {
  title: string;
  date: Date;
  description: string;
};
const certifications: Certification[] = [
  {
    title: "Three.JS Journey - Advanced 3D Web Development",
    date: new Date(2023, 0, 1),
    description: "",
  },
  {
    title: "UI/UX Design Professional Course",
    date: new Date(2022, 11, 1),
    description: "",
  },
];

export { technologies, certifications };
