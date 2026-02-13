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
      (today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
    );

    return `${age}-year-old Software Engineer with 4+ years in full-stack development, specialized in React, TypeScript, Node.js, and Rust, with a strong track record leading projects from conception to deployment.`;
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
  find_machines_date: "2025",
  find_machines_company: "Find & Supply Solutions",
  event_detector_date: "2025",
  event_detector_company: "Event Detector (Contract)",
  tinacos_cibao_date: "2026",
  tinacos_cibao_company: "Polímeros del Cibao (Contract)",

  // Enhanced work experience descriptions with realistic metrics
  tecno_exp_1:
    "Built enterprise ERP mobile app (React Native/Node.js) with real-time inventory & CRM integration, serving 100+ sales team members across multiple regions.",
  tecno_exp_2:
    "Optimized web dashboard performance by 60% through React code splitting, lazy loading, and API optimization, reducing average load time significantly.",
  tecno_exp_3:
    "Migrated legacy .NET Windows Forms application to modern React/Node.js stack, reducing maintenance costs and increasing user adoption substantially.",
  tecno_exp_4:
    "Implemented comprehensive DevOps pipeline with Jest/Cypress testing (90%+ coverage), GitHub Actions CI/CD, and automated deployments, streamlining release processes.",
  tecno_exp_5:
    "Developing Flutter-based inventory management application with cross-platform mobile support, while migrating backend API to Rust for enhanced performance and reduced operational costs, maintaining retrocompatibility with legacy systems.",

  // Updated QRKing descriptions with accurate context
  qrking_exp_1:
    "Developed TheQRKing full-stack platform enabling restaurants to showcase food images via QR-linked boards, with subscription management and customer engagement tracking.",
  qrking_exp_2:
    "Architected complete solution using React, Node.js, and PostgreSQL with user dashboard, image management system, subscription billing, and real-time analytics.",
  qrking_exp_3:
    "Built responsive admin panel and customer-facing interface with payment integration, automated board management, and location-based analytics for restaurant marketing optimization.",

  // PVenta Mobile - Mobile ERP Application
  pventa_exp:
    "Internal mobile ERP application designed to optimize sales, inventory, and client management for Xoultec. Built with React Native and Node.js, featuring real-time barcode scanning, stock tracking, and field operations synchronized across iOS and Android devices.",

  pventa_problem:
    "Xoultec's sales team needed a mobile solution to manage inventory, track sales, and handle client relationships on the go. The existing desktop-only system created bottlenecks, with field operations requiring manual data entry back at the office, leading to delays and data inconsistencies.",

  pventa_solution:
    "Developed a cross-platform mobile ERP using React Native and Ionic with a Node.js backend. Designed an intuitive UI in Figma that prioritized ease of use for field workers. Implemented real-time barcode scanning for instant inventory lookups, offline-first architecture for field operations, and seamless synchronization when connectivity was restored.",

  pventa_challenges:
    "Architected offline-first data synchronization to handle unreliable connectivity in the field. Built real-time barcode scanning with camera integration for both iOS and Android. Designed conflict resolution system for concurrent inventory updates from multiple users. Optimized mobile performance for low-end devices while maintaining rich functionality.",

  pventa_results:
    "Reduced processing time by 35% through streamlined mobile workflows. Achieved over 50% improvement in user adoption based on user surveys, attributed to the carefully designed Figma interface. Enabled real-time inventory tracking across 20+ client accounts, significantly improving operational efficiency.",

  // SIC System - Web ERP & Accounting Platform
  sic_exp:
    "Comprehensive internal web ERP and accounting platform serving 20+ diverse clients at Xoultec. Modernized a legacy Windows Forms accounting system into a polished web application using React, TypeScript, and Node.js, with integrated inventory management and client dashboard.",

  sic_problem:
    "Xoultec relied on a legacy accounting system built in Windows Forms that was slow, difficult to maintain, and limited to desktop installations. Managing inventory for 20+ clients required a centralized, accessible solution with better performance and modern UX. The old system suffered from slow load times and poor scalability.",

  sic_solution:
    "Migrated the legacy accounting system to a modern web stack using React, TypeScript, and Node.js with SQL Server backend. Built an internal web dashboard with React, Ionic, and Tailwind CSS for comprehensive inventory management. Created role-based access control for multi-client management, real-time reporting dashboards, and automated accounting workflows.",

  sic_challenges:
    "Managed complex data migration from legacy Windows Forms application while ensuring zero data loss. Maintained backward compatibility during the transition period. Architected multi-tenant system supporting 20+ clients with isolated data and customizable workflows. Optimized database queries and implemented caching strategies for large inventory datasets.",

  sic_results:
    "Improved inventory accuracy by 40% through automated tracking and validation. Reduced application load times by 45% compared to the legacy system through performance optimization. Successfully migrated all 20+ clients to the new platform without downtime. Enhanced user satisfaction with modern, responsive interface and improved accessibility.",

  curbo_exp:
    "Full-stack B2B and C2C automotive marketplace platform serving as an intermediary between car dealers and customers. Built comprehensive ecosystem including dealer dashboard for inventory management, technician integration system for vehicle inspections, customer-facing marketplace, and powerful backoffice administration tools.",

  curbo_problem:
    "Car dealers needed a modern digital platform to manage inventory and reach customers online, while buyers lacked transparency about vehicle conditions. The market required a trusted intermediary that could facilitate transactions, coordinate professional vehicle inspections, and provide comprehensive management tools for dealers.",

  curbo_solution:
    "Developed a multi-sided platform with three key components: (1) Dealer Dashboard - intuitive inventory management system allowing dealers to list, update, and track vehicles with real-time analytics; (2) Technician Integration - scheduling and coordination system connecting certified technicians with vehicles for professional condition assessments and reports; (3) Backoffice - comprehensive administrative panel for platform management, user verification, transaction oversight, and data analytics.",

  curbo_challenges:
    "Architected complex role-based access control system managing dealers, technicians, customers, and administrators. Built real-time notification system for inspection scheduling and status updates. Implemented secure document handling for vehicle reports and certifications. Optimized database queries for large vehicle inventory datasets while maintaining fast search and filtering.",

  curbo_results:
    "Successfully launched platform serving multiple car dealerships with thousands of vehicle listings. Achieved 90%+ test coverage ensuring reliability. Significantly improved page load performance through database optimization and Redis caching. Created scalable architecture supporting B2B dealer operations and C2C customer marketplace simultaneously.",

  curbo_exp_1:
    "Developed advanced e-commerce search and filtering algorithms improving user engagement and reducing bounce rate significantly.",
  curbo_exp_2:
    "Achieved 90%+ test coverage with comprehensive Jest/Playwright automation suite, reducing QA testing time and preventing regression bugs.",
  curbo_exp_3:
    "Enhanced application performance through database query optimization and Redis caching, improving page load speeds and SEO rankings.",

  // Event Detector CV entries
  event_detector_exp_1:
    "Built full-stack event discovery platform with React/Node.js/PostgreSQL enabling community members to submit and browse local events with flier images and calendar integration.",
  event_detector_exp_2:
    "Implemented admin moderation dashboard with approve/decline workflow and flexible viewing options including responsive calendar and list views.",
  event_detector_exp_3:
    "Integrated calendar API with add-to-calendar functionality and configurable notification presets, improving event attendance through automated reminders.",

  // Tinacos Cibao CV entries
  tinacos_cibao_exp_1:
    "Delivered complete brand transformation for Polímeros del Cibao including website development, logo rebranding, and production-ready product labels with Pantone color specifications.",
  tinacos_cibao_exp_2:
    "Built automated warranty redemption system using Google Forms, Apps Script, and API integration with secure Google Sheets dashboard for real-time claim monitoring.",
  tinacos_cibao_exp_3:
    "Developed desktop PDF generator capable of producing thousands of optimized warranty certificates (7,000+ pages) in single execution, eliminating manual processing.",

  // Enhanced skills organization
  skills_title: "Technical Skills",
  skills_title_caps: "SKILLS",

  // Categorized skills for better organization
  frontend_skills: "Frontend",
  backend_skills: "Backend",
  cloud_devops_skills: "Cloud & DevOps",
  mobile_other_skills: "Mobile & Other",

  frontend_skills_list:
    "React, TypeScript, JavaScript, Flutter, TailwindCSS, Three.js, HTML5/CSS3, UI/UX Design",
  backend_skills_list:
    "Node.js, Express.js, Rust, Go, GraphQL, RESTful APIs, MongoDB, PostgreSQL, Redis",
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
  projects_title: "Projects",
  projects_title_caps: "PROJECTS",

  // Project names and enhanced descriptions
  the_qr_king: "TheQRKing Platform",
  the_qr_king_desc:
    "Full-stack restaurant marketing platform with React/Node.js/PostgreSQL. Features include food image management, QR board subscriptions, payment integration, and location-based analytics dashboard for optimizing physical marketing campaigns.",

  // Event Detector - Event Submission & Management Platform
  event_detector: "Event Detector",
  event_detector_desc:
    "Community-driven event discovery platform enabling users to submit local events with flier images, admin moderation system, multiple view options (calendar/list), and integrated calendar notifications with add-to-calendar functionality.",

  event_detector_problem:
    "Communities lacked a centralized platform for discovering and sharing local events. Event organizers struggled to reach their target audience, while attendees had no reliable way to find upcoming events in their area. Existing solutions were either too complex or didn't provide adequate moderation and calendar integration.",

  event_detector_solution:
    "Built a full-stack event management platform with user-friendly event submission forms allowing organizers to upload event details and flier images. Implemented admin dashboard for reviewing and moderating submissions with approve/decline workflow. Created flexible viewing options including calendar and list views, integrated calendar API for seamless add-to-calendar functionality with customizable notification presets.",

  event_detector_challenges:
    "Designed efficient image upload and storage system for event fliers with optimization for fast loading. Architected moderation workflow ensuring quality control while maintaining quick approval times. Built responsive calendar interface supporting multiple view modes. Implemented notification system with configurable reminder times for added events. Optimized database queries for fast event filtering by date, category, and location.",

  event_detector_results:
    "Successfully launched platform serving local community with streamlined event discovery. Achieved high user engagement through intuitive submission process and attractive flier display. Enabled quick event approval workflow reducing admin overhead. Delivered seamless calendar integration improving event attendance through automated reminders.",

  // Tinacos Cibao - Complete Brand & Digital Transformation
  tinacos_cibao: "Tinacos Cibao",
  tinacos_cibao_desc:
    "Complete digital transformation and rebranding project for water tank manufacturer Polímeros del Cibao. Developed new website, redesigned logo, created physical product labels with proper Pantone colors, built automated warranty redemption system with Google Apps Script integration, and desktop PDF generator for bulk warranty printing.",

  tinacos_cibao_problem:
    "Polímeros del Cibao needed a complete brand refresh and digital presence for their Tinacos Cibao water tank product line. They lacked a professional website, had outdated branding, inconsistent physical product labels, and a manual warranty tracking process that was inefficient and error-prone. The company needed a cohesive solution spanning digital and physical brand identity.",

  tinacos_cibao_solution:
    "Delivered comprehensive brand and digital transformation: (1) Website Development - built modern, responsive website showcasing products and company information; (2) Logo Rebranding - designed new professional logo reflecting the company's quality standards; (3) Physical Label Design - created product labels with proper Pantone color specifications and sizing for manufacturing; (4) Automated Warranty System - developed custom warranty redemption platform using Google Forms for authorized users, Google Apps Script automation to trigger API updates, and secure view-only Google Sheets dashboard for company staff to monitor warranty claims in real-time; (5) Bulk PDF Generator - created desktop application capable of generating thousands of optimized warranty certificates (e.g., 7,000+ pages) in a single execution with maximum quality within document size margins, eliminating manual processing.",

  tinacos_cibao_challenges:
    "Designed cohesive brand identity across digital and physical touchpoints maintaining consistency. Implemented secure warranty system with proper access control using company email verification. Built reliable Google Apps Script automation to bridge forms and API communication. Ensured Pantone color accuracy for physical label printing matching digital brand guidelines. Created scalable warranty tracking infrastructure handling concurrent submissions and automated data synchronization. Optimized PDF generation algorithm to handle bulk processing of thousands of certificates while maintaining high quality and reasonable file sizes.",

  tinacos_cibao_results:
    "Successfully launched complete brand transformation with modern digital presence at tinacoscibao.com.do. Delivered production-ready physical labels with accurate Pantone specifications adopted by manufacturing. Automated warranty redemption system eliminating manual processing and reducing claim processing time significantly. Provided company staff with real-time warranty tracking dashboard improving customer service response times and data accuracy. Desktop PDF generator enabled staff to produce thousands of warranty certificates in minutes with single-click execution, dramatically reducing printing preparation time.",

  caribbean_coworking: "Caribbean Business Coworking",
  caribbean_coworking_desc:
    "Landing page with integrated payment system and webhook conditionals for coworking space seat reservations in Dominican Republic. Built with responsive design and secure payment processing.",

  // Additional projects you might want to add
  pventa_mobile: "PVenta Mobile ERP",
  pventa_mobile_desc:
    "Enterprise mobile application for inventory management and sales tracking built with React Native and Node.js backend.",

  sic_project: "SIC Web",
  curbo_project: "Curbo Website",
  sentinels_labs: "SentinelsLabs",
  find_machines: "Find & Supply Solutions",

  find_machines_desc:
    "Designed and developed a comprehensive WordPress e-commerce website for Find & Supply Solutions (findmachines.com.do), enabling the company to sell machinery and equipment online. Built custom WordPress theme with advanced product catalog, inventory management, and seamless checkout experience.",

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

  // Location information
  location_us: "United States • Passaic, New Jersey",
  location_dr: "Dominican Republic, Distrito Nacional",

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
