import { type Component, For, createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import BackgroundScene from "../components/BackgroundScene";
import Breadcrumb, { type BreadcrumbItem } from "../components/Breadcrumb";
import Range from "../components/Range";
import Dropdown from "../components/Dropdown";
import "./StudiesSkills.css";

type StudiesSkillsProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

type Skill = {
  name: string;
  category:
    | "frontend"
    | "backend"
    | "mobile"
    | "devops"
    | "database"
    | "design"
    | "other";
  description: string;
  color: string;
  level: "expert" | "advanced" | "intermediate";
};

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl?: string;
  skills?: string[];
};

const StudiesSkills: Component<StudiesSkillsProps> = (props) => {
  const [hoveredSkill, setHoveredSkill] = createSignal<string | null>(null);

  const breadcrumbItems = (): BreadcrumbItem[] => [
    { label: props.t("home"), href: "/" },
    { label: "Studies & Skills" },
  ];

  const certificates: Certificate[] = [
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
      credentialUrl:
        "https://designcourse.com/certificate/63968757b7b36500195474bc",
      skills: ["Figma", "HTML/CSS"],
    },
  ];

  const skills: Skill[] = [
    // Frontend
    {
      name: "React",
      category: "frontend",
      description:
        "JavaScript library for building user interfaces with component-based architecture",
      color: "#61DAFB",
      level: "expert",
    },
    {
      name: "TypeScript",
      category: "frontend",
      description:
        "Typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality",
      color: "#3178C6",
      level: "expert",
    },
    {
      name: "JavaScript",
      category: "frontend",
      description:
        "Core programming language for web development, enabling interactive web pages",
      color: "#F7DF1E",
      level: "expert",
    },
    {
      name: "TailwindCSS",
      category: "frontend",
      description:
        "Utility-first CSS framework for rapidly building custom user interfaces",
      color: "#06B6D4",
      level: "advanced",
    },
    {
      name: "Three.js",
      category: "frontend",
      description:
        "JavaScript 3D library for creating and displaying animated 3D graphics in the browser",
      color: "#000000",
      level: "advanced",
    },
    {
      name: "HTML5/CSS3",
      category: "frontend",
      description:
        "Modern web markup and styling languages for structuring and presenting content",
      color: "#E34F26",
      level: "expert",
    },
    {
      name: "SolidJS",
      category: "frontend",
      description:
        "Reactive JavaScript library for building user interfaces with fine-grained reactivity",
      color: "#2C4F7C",
      level: "advanced",
    },

    // Backend
    {
      name: "Node.js",
      category: "backend",
      description:
        "JavaScript runtime built on Chrome's V8 engine for server-side applications",
      color: "#339933",
      level: "expert",
    },
    {
      name: "Express.js",
      category: "backend",
      description: "Fast, minimalist web framework for Node.js applications",
      color: "#000000",
      level: "expert",
    },
    {
      name: "Rust",
      category: "backend",
      description:
        "Systems programming language focused on safety, speed, and concurrency",
      color: "#CE412B",
      level: "advanced",
    },
    {
      name: "Go",
      category: "backend",
      description:
        "Statically typed language designed for simplicity and efficient concurrent programming",
      color: "#00ADD8",
      level: "intermediate",
    },
    {
      name: "GraphQL",
      category: "backend",
      description:
        "Query language and runtime for APIs, providing efficient data fetching",
      color: "#E10098",
      level: "advanced",
    },
    {
      name: "RESTful APIs",
      category: "backend",
      description:
        "Architectural style for designing networked applications using HTTP methods",
      color: "#009688",
      level: "expert",
    },
    {
      name: "C#",
      category: "backend",
      description:
        "Object-oriented language for building Windows applications and backend services",
      color: "#239120",
      level: "advanced",
    },

    // Mobile
    {
      name: "React Native",
      category: "mobile",
      description:
        "Framework for building native mobile apps using React and JavaScript",
      color: "#61DAFB",
      level: "expert",
    },
    {
      name: "Flutter",
      category: "mobile",
      description:
        "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop",
      color: "#02569B",
      level: "advanced",
    },
    {
      name: "Ionic",
      category: "mobile",
      description:
        "Cross-platform framework for building mobile apps using web technologies",
      color: "#3880FF",
      level: "advanced",
    },

    // Database
    {
      name: "MongoDB",
      category: "database",
      description:
        "NoSQL document database designed for scalability and flexibility",
      color: "#47A248",
      level: "advanced",
    },
    {
      name: "PostgreSQL",
      category: "database",
      description:
        "Advanced open-source relational database with strong SQL compliance",
      color: "#4169E1",
      level: "advanced",
    },
    {
      name: "Redis",
      category: "database",
      description:
        "In-memory data structure store used as cache, database, and message broker",
      color: "#DC382D",
      level: "intermediate",
    },
    {
      name: "SQL Server",
      category: "database",
      description:
        "Microsoft's relational database management system for enterprise applications",
      color: "#CC2927",
      level: "advanced",
    },

    // DevOps & Cloud
    {
      name: "AWS",
      category: "devops",
      description:
        "Amazon Web Services cloud platform offering compute, storage, and networking services",
      color: "#FF9900",
      level: "intermediate",
    },
    {
      name: "Docker",
      category: "devops",
      description:
        "Platform for developing, shipping, and running applications in containers",
      color: "#2496ED",
      level: "advanced",
    },
    {
      name: "CI/CD",
      category: "devops",
      description:
        "Continuous Integration and Deployment practices for automating software delivery",
      color: "#2088FF",
      level: "advanced",
    },
    {
      name: "Git",
      category: "devops",
      description:
        "Distributed version control system for tracking changes in source code",
      color: "#F05032",
      level: "expert",
    },
    {
      name: "GitHub Actions",
      category: "devops",
      description:
        "Automation platform for CI/CD workflows directly in GitHub repositories",
      color: "#2088FF",
      level: "advanced",
    },

    // Design
    {
      name: "Vector Design",
      category: "design",
      description:
        "Creating scalable graphics for logos, icons, and brand identity using vector tools",
      color: "#FF6B6B",
      level: "expert",
    },
    {
      name: "Logo Design",
      category: "design",
      description:
        "Crafting unique brand identities and memorable logo designs",
      color: "#4ECDC4",
      level: "expert",
    },
    {
      name: "Icon Design",
      category: "design",
      description:
        "Designing custom icon sets for applications and user interfaces",
      color: "#95E1D3",
      level: "expert",
    },
    {
      name: "Social Media Design",
      category: "design",
      description:
        "Creating engaging visual content for social media platforms and campaigns",
      color: "#F38181",
      level: "expert",
    },
    {
      name: "Web Advertising",
      category: "design",
      description:
        "Designing banner ads, promotional graphics, and marketing materials for web",
      color: "#AA96DA",
      level: "advanced",
    },
    {
      name: "Affinity",
      category: "design",
      description:
        "Professional creative suite for vector graphics, photo editing, and digital design (Designer & Photo)",
      color: "#7AB800",
      level: "expert",
    },
    {
      name: "Figma",
      category: "design",
      description: "Collaborative design tool for UI/UX design and prototyping",
      color: "#F24E1E",
      level: "advanced",
    },

    // Other
    {
      name: "Jest",
      category: "other",
      description:
        "JavaScript testing framework with focus on simplicity and developer experience",
      color: "#C21325",
      level: "advanced",
    },
    {
      name: "Playwright",
      category: "other",
      description: "End-to-end testing framework for modern web applications",
      color: "#2EAD33",
      level: "advanced",
    },
    {
      name: "Cypress",
      category: "other",
      description:
        "JavaScript-based end-to-end testing framework for web applications",
      color: "#17202C",
      level: "advanced",
    },
  ];

  const getSkillsByCategory = (category: Skill["category"]) => {
    return skills.filter((skill) => skill.category === category);
  };

  const categoryLabels = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    mobile: "Mobile Development",
    database: "Databases",
    devops: "DevOps & Cloud",
    design: "Design & Graphics",
    other: "Testing & Tools",
  };

  return (
    <div class="page-container">
      <BackgroundScene />

      <div class="page-content">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems()} />

        {/* Header */}
        <div class="page-header">
          <h1 class="page-title">Studies & Skills</h1>
          <p class="page-subtitle">
            Academic background and technical expertise across full-stack
            development.
          </p>
        </div>

        {/* Studies Section */}
        <div class="page-section">
          <h2 class="section-title">Education</h2>

          {/* INTEC - Software Engineering */}
          <div class="education-block">
            <Range
              t={props.t}
              year1={2017}
              year2={2021}
              roleKey="software_eng"
              companyKey="intec"
              link="https://www.intec.edu.do/en/"
            />
            <div class="education-details">
              <p class="education-description">
                Bachelor's degree in Software Engineering from Instituto
                Tecnológico de Santo Domingo (INTEC). Comprehensive program
                covering full-stack development, software architecture, and
                modern development practices.
              </p>
              <ul class="education-highlights">
                <li>Object-Oriented Programming & Design Patterns</li>
                <li>Database Design & Management</li>
                <li>Web Development (Frontend & Backend)</li>
                <li>Software Project Management</li>
                <li>Mobile Application Development</li>
                <li>Algorithms & Data Structures</li>
              </ul>
              <Dropdown
                text="Campus & Projects Gallery"
                images={[
                  "https://www.intec.edu.do/media/com_rsseo/images/webp/f7a2ded0e61fa3ccf50c616e2619dea1.webp",
                  "https://www.intec.edu.do/images/background/centros-estudios.jpg",
                ]}
              />
            </div>
          </div>

          {/* Loyola - Digital Electronics */}
          <div class="education-block">
            <Range
              t={props.t}
              year1={2017}
              year2={2021}
              roleKey="digital_electronics"
              companyKey="loyola"
              link="https://ipl.edu.do/"
            />
            <div class="education-details">
              <p class="education-description">
                Technical degree in Digital Electronics & Automation from
                Instituto Politécnico Loyola. Focused on electronics, circuit
                design, microcontrollers, and industrial automation systems.
              </p>
              <ul class="education-highlights">
                <li>Digital & Analog Circuit Design</li>
                <li>Microcontroller Programming (Arduino, PIC)</li>
                <li>Industrial Automation & PLC Programming</li>
                <li>Electronics Repair & Maintenance</li>
                <li>Sensor Integration & Control Systems</li>
                <li>Robotics & Mechatronics</li>
              </ul>
              <Dropdown
                text="Projects & Lab Work Gallery"
                images={[
                  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
                  "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800",
                  "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800",
                ]}
              />
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <div class="page-section">
          <h2 class="section-title">Certificates & Courses</h2>
          <div class="certificates-grid">
            <For each={certificates}>
              {(cert) => (
                <div class="certificate-card">
                  <h3 class="certificate-title">{cert.title}</h3>
                  <p class="certificate-issuer">{cert.issuer}</p>
                  <p class="certificate-date">{cert.date}</p>
                  <div class="certificate-credential">
                    <span class="credential-label">Credential ID:</span>
                    <span class="credential-id">{cert.credentialId}</span>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="certificate-link"
                    >
                      Show certificate →
                    </a>
                  )}
                  {cert.skills && cert.skills.length > 0 && (
                    <div class="certificate-skills">
                      <For each={cert.skills}>
                        {(skill) => (
                          <span class="certificate-skill-tag">{skill}</span>
                        )}
                      </For>
                    </div>
                  )}
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Skills Section */}
        <div class="page-section">
          <h2 class="section-title">Technical Skills</h2>

          <For each={Object.entries(categoryLabels)}>
            {([category, label]) => {
              const categorySkills = getSkillsByCategory(
                category as Skill["category"],
              );
              return categorySkills.length > 0 ? (
                <div class="skills-category">
                  <h3 class="category-heading">{label}</h3>
                  <div class="skills-grid">
                    <For each={categorySkills}>
                      {(skill) => (
                        <div
                          class="skill-badge"
                          style={{ "border-left": `4px solid ${skill.color}` }}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <span class="skill-name">{skill.name}</span>
                          {hoveredSkill() === skill.name && (
                            <div class="skill-tooltip">
                              <p class="tooltip-text">{skill.description}</p>
                              <span class="tooltip-level">
                                Level: {skill.level}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              ) : null;
            }}
          </For>
        </div>
      </div>
    </div>
  );
};

export default StudiesSkills;
