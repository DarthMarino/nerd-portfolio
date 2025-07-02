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

    return `${age}-year-old Software Engineer with 4+ years of full-stack development expertise. Specializes in requirements analysis, system design, and scalable web application implementation. Proven track record leading projects from conception to deployment using React, TypeScript, Node.js, and cloud infrastructure.`;
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

  // Work dates and companies
  tecno_date: "Feb 2022 -\nPresent",
  tecno_company: "Tecno-Logica",
  curbo_date: "June 2021 -\nMarch 2023",
  curbo_company: "Curbo Technologies",

  // Work experience descriptions
  tecno_exp_1:
    "Developed enterprise mobile ERP application using React Native and Node.js, implementing real-time inventory tracking and CRM integration for sales team productivity.",
  tecno_exp_2:
    "Built responsive web dashboard with React, TypeScript, and REST APIs, significantly improving load times through performance optimization and code splitting.",
  tecno_exp_3:
    "Migrated legacy .NET Windows Forms application to modern web stack (React/Node.js), substantially reducing maintenance costs and enhancing user adoption.",
  tecno_exp_4:
    "Established DevOps practices including automated testing (Jest/Cypress), CI/CD pipelines (GitHub Actions), and code quality standards, streamlining deployment processes.",
  curbo_exp_1:
    "Developed e-commerce platform features using React and Node.js, implementing advanced search algorithms and filtering systems that enhanced user engagement.",
  curbo_exp_2:
    "Implemented comprehensive test automation suite with Jest and Playwright, achieving high code coverage and significantly reducing QA testing time.",
  curbo_exp_3:
    "Enhanced application performance through database optimization, Redis caching, and API improvements, delivering faster page load times and improved SEO rankings.",

  // Skills section
  skills_title: "Technical Skills",
  skills_title_caps: "SKILLS",
  coding_tools_title: "Coding &\nTools",

  // Education section
  education_title: "Education",
  studies_title: "STUDIES",
  intec: "Instituto Tecnológico de Santo Domingo, Dominican Republic",
  software_eng: "Software Engineering",
  loyola: "Instituto Politécnico Loyola, Dominican Republic",
  digital_electronics: "Digital Electronics and Microcomputing",

  // Certifications
  certifications_title: "Extra Certifications",

  // Languages
  languages: "Languages",
  lang_1: "English",
  lang_2: "Spanish",
  lang_3: "Mandarin",
  lang_1_level: "Professional",
  lang_2_level: "Native",
  lang_3_level: "Basic",

  // Projects section
  projects_title: "PROJECTS",

  // Project names and descriptions
  pventa_mobile: "PVenta Mobile",
  sic_project: "SIC",
  curbo_project: "Curbo",
  sentinels_labs: "SentinelsLabs",
  find_machines: "FindMachines",
  the_qr_king: "TheQRKing",

  // Common words
  at: "at",
  present: "Present",
};
