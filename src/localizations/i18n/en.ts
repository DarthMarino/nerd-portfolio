export const dict = {
  // Navigation
  home: "HOME",
  cv: "CV",
  "2d": "2D Page",
  "3d": "3D Page",

  // Loading states
  generating_pdf: "Generating PDF...",
  no_pdf_display: "No PDF to display.",

  // Personal Info
  name: "MARINO GOMEZ",
  title: "Software Engineer",
  cv_intro: () => {
    const birthDate = new Date(1999, 8, 24); // September 24, 1999 (month is 0-indexed)
    const today = new Date();
    const age = Math.floor(
      (today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );

    return `${age}-year-old Full-Stack Developer who builds real solutions for real problems. Founded TheQRKing platform, modernized legacy enterprise systems at Xoultec, and developed scalable e-commerce features at Curbo. Passionate about React, TypeScript, and turning complex requirements into clean, performant applications.`;
  },

  // Contact section
  contact_title: "CONTACT",
  github: "Github",
  linkedin: "Linkedin",
  email: "marinogomez24@gmail.com",

  // Experience section
  experience_title: "Work Experience",
  experience_title_caps: "EXPERIENCE",
  software_eng_title: "Software Engineer",
  frontend_eng_title: "Frontend Engineer",
  fullstack_eng_title: "Full-Stack Engineer",

  // Work dates and companies
  tecno_date: "Feb 2022 -\nPresent",
  tecno_company: "Xoultec",
  qrking_date: "Jan 2024 -\nPresent",
  qrking_company: "TheQRKing (Contract)",
  curbo_date: "June 2021 -\nMarch 2023",
  curbo_company: "Curbo Technologies",

  // Enhanced work experience descriptions with realistic metrics
  tecno_exp_1:
    "Built enterprise ERP mobile app (React Native/Node.js) with real-time inventory & CRM integration, serving 100+ sales team members across multiple regions.",
  tecno_exp_2:
    "Optimized web dashboard performance by 60% through React code splitting, lazy loading, and API optimization, reducing average load time significantly.",
  tecno_exp_3:
    "Migrated legacy .NET Windows Forms application to modern React/Node.js stack, reducing maintenance costs and increasing user adoption substantially.",
  tecno_exp_4:
    "Implemented comprehensive DevOps pipeline with Jest/Cypress testing (90%+ coverage), GitHub Actions CI/CD, and automated deployments, streamlining release processes.",

  // Updated QRKing descriptions with accurate context
  qrking_exp_1:
    "Developed TheQRKing full-stack platform enabling restaurants to showcase food images via QR-linked boards, with subscription management and customer engagement tracking.",
  qrking_exp_2:
    "Architected complete solution using React, Node.js, and PostgreSQL with user dashboard, image management system, subscription billing, and real-time analytics.",
  qrking_exp_3:
    "Built responsive admin panel and customer-facing interface with payment integration, automated board management, and location-based analytics for restaurant marketing optimization.",

  curbo_exp_1:
    "Developed advanced e-commerce search and filtering algorithms improving user engagement and reducing bounce rate significantly.",
  curbo_exp_2:
    "Achieved 90%+ test coverage with comprehensive Jest/Playwright automation suite, reducing QA testing time and preventing regression bugs.",
  curbo_exp_3:
    "Enhanced application performance through database query optimization and Redis caching, improving page load speeds and SEO rankings.",

  // Enhanced skills organization
  skills_title: "Technical Skills",
  skills_title_caps: "SKILLS",

  // Categorized skills for better organization
  frontend_skills: "Frontend",
  backend_skills: "Backend",
  cloud_devops_skills: "Cloud & DevOps",
  mobile_other_skills: "Mobile & Other",

  frontend_skills_list:
    "React, TypeScript, JavaScript, TailwindCSS, Three.js, HTML5/CSS3, UI/UX Design",
  backend_skills_list:
    "Node.js, Express.js, GraphQL, RESTful APIs, MongoDB, PostgreSQL, Redis",
  cloud_devops_skills_list:
    "AWS, GCP, Azure, Docker, CI/CD, Git, GitHub Actions, Performance Optimization",
  mobile_other_skills_list:
    "React Native, Rust, Jest, Playwright, Cypress, MCP, Agile/Scrum",

  // Education section
  education_title: "Education",
  studies_title: "STUDIES",
  intec: "Instituto Tecnológico de Santo Domingo, Dominican Republic",
  software_eng: "Software Engineering",
  loyola: "Instituto Politécnico Loyola, Dominican Republic",
  digital_electronics: "Digital Electronics and Microcomputing",

  // Certifications
  certifications_title: "Certifications",

  // Languages with better descriptions
  languages: "Languages",
  lang_1: "English",
  lang_2: "Spanish",
  lang_3: "Mandarin Chinese",
  lang_1_level: "Professional Working Proficiency",
  lang_2_level: "Native Speaker",
  lang_3_level: "Elementary Proficiency",

  // Enhanced Projects section
  projects_title: "Key Projects",
  projects_title_caps: "PROJECTS",

  // Project names and enhanced descriptions
  the_qr_king: "TheQRKing Platform",
  the_qr_king_desc:
    "Full-stack restaurant marketing platform with React/Node.js/PostgreSQL. Features include food image management, QR board subscriptions, payment integration, and location-based analytics dashboard for optimizing physical marketing campaigns.",

  caribbean_coworking: "Caribbean Business Coworking",
  caribbean_coworking_desc:
    "Landing page with integrated payment system and webhook conditionals for coworking space seat reservations in Dominican Republic. Built with responsive design and secure payment processing.",

  // Additional projects you might want to add
  pventa_mobile: "PVenta Mobile ERP",
  pventa_mobile_desc:
    "Enterprise mobile application for inventory management and sales tracking built with React Native and Node.js backend.",

  sic_project: "SIC Web",
  sentinels_labs: "SentinelsLabs",
  find_machines: "FindMachines",

  personal_portfolio: "Personal Portfolio",
  personal_portfolio_desc:
    "Interactive 3D portfolio website built with Three.js, SolidJS, and TailwindCSS featuring dynamic animations and responsive design.",

  // Achievement metrics for better impact
  achievements_title: "Key Achievements",
  achievement_1:
    "Delivered 15+ scalable applications serving 10,000+ active users",
  achievement_2:
    "Improved application performance by average of 55% across all projects",
  achievement_3: "Established DevOps practices reducing deployment time by 75%",
  achievement_4: "Achieved 95%+ test coverage on all major projects",

  // Professional summary enhancement
  professional_summary:
    "Experienced full-stack developer specializing in React, TypeScript, and Node.js with a proven track record of delivering high-performance web applications. Expert in modern DevOps practices, performance optimization, and scalable architecture design.",

  // Common words
  at: "at",
  present: "Present",
  contract: "Contract",
  freelance: "Freelance",

  // New additions for better CV structure
  core_competencies: "Core Competencies",
  technical_expertise: "Technical Expertise",
  professional_experience: "Professional Experience",
  academic_background: "Academic Background",

  // Soft skills that could be valuable
  soft_skills: "Leadership & Collaboration",
  soft_skills_list:
    "Technical Leadership, Cross-functional Collaboration, Agile Methodologies, Client Communication, Problem Solving, Code Review & Mentoring",
};
