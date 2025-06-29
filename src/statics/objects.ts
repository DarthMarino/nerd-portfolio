const technologies = [
  // Frontend & Core
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "SolidJS",
  "Three.js",
  "CSS",
  "TailwindCSS",
  
  // Backend & APIs
  "Node.js",
  "GraphQL",
  "REST APIs",
  "C#",
  ".NET",
  "GoLang",
  "SQL",
  
  // Modern Tools & AI
  "MCP (Model Context Protocol)",
  "Claude Code",
  "AI Integration",
  "Prompt Engineering",
  
  // DevOps & Automation
  "Docker",
  "CI/CD",
  "GitHub Actions", 
  "Vercel",
  "Git",
  "Automation",
  
  // Design & 3D
  "UI/UX Design",
  "Figma",
  "Blender",
  "3D Development",
  
  // Additional Modern Skills
  "Progressive Web Apps",
  "Performance Optimization",
  "Testing (Jest, Playwright)",
  "Rust",
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
    description: "Comprehensive 3D web development with WebGL and Three.js",
  },
  {
    title: "UI/UX Design Professional Course",
    date: new Date(2022, 11, 1),
    description: "User-centered design principles and modern interface design",
  },
  {
    title: "MCP & AI Integration Specialist",
    date: new Date(2024, 11, 1),
    description: "Model Context Protocol implementation and AI tool integration",
  },
  {
    title: "DevOps & Automation Fundamentals",
    date: new Date(2024, 5, 1),
    description: "CI/CD pipelines, Docker containerization, and deployment automation",
  },
  {
    title: "Advanced TypeScript & Modern JavaScript",
    date: new Date(2023, 8, 1),
    description: "Advanced type systems, performance optimization, and modern ES features",
  },
];

export { technologies, certifications };
