const technologies = [
  "React",
  "JavaScript/TypeScript",
  "Node.js",
  "Next.js",
  "TailwindCSS",
  "Three.js",
  "GraphQL",
  "SQL",
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
  "Blender",
  "Affinity",
];

type Certification = {
  title: string;
  issuer: string;
  date: string | Date;
  description?: string;
  credentialId: string;
  credentialUrl: string;
  skills?: string[];
};
const certifications: Certification[] = [
  {
    title: "Three.js Journey",
    issuer: "Three.js Journey",
    date: "Jan 2023",
    credentialId: "1913",
    credentialUrl: "https://threejs-journey.com/certificate/view/1913",
    skills: ["Three.js", "React.js", "Blender"],
  },
  {
    title: "UI/UX Course Completion",
    issuer: "DesignCourse.com",
    date: "Dec 2022",
    credentialId: "63968757b7b36500195474bc",
    credentialUrl: "https://designcourse.com/certificate/63968757b7b36500195474bc",
    skills: ["Figma", "HTML/CSS"],
  },
];

export { technologies, certifications };
