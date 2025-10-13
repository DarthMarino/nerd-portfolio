export const dict = {
  // Navigation
  home: "INICIO",
  cv: "CV",
  "2d": "Sólo HTML",
  "3d": "3D HTML",

  // Loading states
  generating_pdf: "Generando PDF...",
  no_pdf_display: "No hay PDF para mostrar.",

  // Personal Info
  name: "MARINO GOMEZ",
  title: "Ingeniero de Software",
  cv_intro: () => {
    const birthDate = new Date(1999, 8, 24); // September 24, 1999 (month is 0-indexed)
    const today = new Date();
    const age = Math.floor(
      (today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
    );

    return `Ingeniero de Software de ${age} años con 4+ años en desarrollo full-stack, especializado en React, TypeScript, Node.js y Rust, con sólido historial liderando proyectos desde la concepción hasta el despliegue.`;
  },

  // Contact section
  contact_title: "CONTACTO",
  github: "Github",
  linkedin: "Linkedin",
  email: "marinogomez24@gmail.com",

  // Experience section
  experience_title: "Experiencia Laboral",
  experience_title_caps: "EXPERIENCIA",
  software_eng_title: "Ingeniero de Software",
  frontend_eng_title: "Ingeniero Frontend",

  // Work dates and companies
  tecno_date: "Feb 2022 -\nPresent",
  tecno_company: "Xoultec",
  qrking_date: "Ene 2024 -\nPresente",
  qrking_company: "TheQRKing",
  curbo_date: "Jun 2021 -\nMarzo 2023",
  curbo_company: "Curbo Technologies",
  find_machines_date: "2025",
  find_machines_company: "Find & Supply Solutions",

  // Work experience descriptions
  tecno_exp_1:
    "Desarrollé aplicación móvil ERP con React Native y Node.js, implementando seguimiento de inventario en tiempo real e integración CRM.",
  tecno_exp_2:
    "Construí dashboard responsivo con React, TypeScript y APIs REST, mejorando significativamente los tiempos de carga mediante optimización y code splitting.",
  tecno_exp_3:
    "Migré aplicación legacy .NET Windows Forms a stack web moderno (React/Node.js), reduciendo costos de mantenimiento y mejorando adopción de usuarios.",
  tecno_exp_4:
    "Establecí prácticas DevOps con testing automatizado (Jest/Cypress), pipelines CI/CD (GitHub Actions) y estándares de calidad, optimizando despliegues.",
  tecno_exp_5:
    "Desarrollando aplicación de gestión de inventario con Flutter para soporte multiplataforma móvil, mientras migro la API backend a Rust para mayor rendimiento y reducción de costos de hosting, manteniendo retrocompatibilidad con sistemas legacy.",
  qrking_exp_1:
    "Fundé y desarrollé TheQRKing, una plataforma integral de análisis de marketing que utiliza tecnología QR para rastrear participación de clientes por ubicación en entornos retail físicos.",
  qrking_exp_2:
    "Arquitecturé solución full-stack usando React, Node.js y PostgreSQL, implementando dashboard de análisis en tiempo real y sistema automatizado de gestión de campañas para optimización de marketing retail.",
  qrking_exp_3:
    "Integré servicios de geolocalización y análisis avanzado para proporcionar insights accionables sobre patrones de comportamiento de clientes, aumentando ROI de marketing hasta 40% para adoptadores tempranos.",
  curbo_exp_1:
    "Desarrollé funcionalidades e-commerce con React y Node.js, implementando algoritmos de búsqueda avanzada y filtros que mejoraron participación de usuarios.",
  curbo_exp_2:
    "Implementé suite de automatización con Jest y Playwright, logrando alta cobertura de código y reduciendo significativamente el tiempo de testing QA.",
  curbo_exp_3:
    "Mejoré rendimiento mediante optimización de base de datos, caché Redis y mejoras de API, entregando tiempos de carga más rápidos y mejor SEO.",

  // Skills section
  skills_title: "Habilidades Técnicas",
  skills_title_caps: "HABILIDADES",
  coding_tools_title: "Tecnologías",

  // Categorized skills for better organization
  frontend_skills: "Frontend",
  backend_skills: "Backend",
  cloud_devops_skills: "Cloud & DevOps",
  mobile_other_skills: "Mobile & Otros",

  frontend_skills_list:
    "React, TypeScript, JavaScript, Flutter, TailwindCSS, Three.js, HTML5/CSS3, Diseño UI/UX",
  backend_skills_list:
    "Node.js, Express.js, Rust, Go, GraphQL, APIs RESTful, MongoDB, PostgreSQL, Redis",
  cloud_devops_skills_list:
    "AWS, GCP, Azure, Docker, CI/CD, Git, GitHub Actions, Optimización de Rendimiento",
  mobile_other_skills_list:
    "React Native, Flutter, Jest, Playwright, Cypress, MCP, Agile/Scrum",

  // Education section
  education_title: "Educación",
  studies_title: "ESTUDIOS",
  intec: "Instituto Tecnológico de Santo Domingo, República Dominicana",
  software_eng: "Ingeniería de Software",
  loyola: "Instituto Politécnico Loyola, República Dominicana",
  digital_electronics: "Electrónica Digital y Microcomputación",

  // Certifications
  certifications_title: "Certificaciones Extra",

  // Languages
  languages: "Idiomas",
  lang_1: "Inglés",
  lang_2: "Español",
  lang_3: "Mandarín",
  lang_1_level: "Profesional",
  lang_2_level: "Nativo",
  lang_3_level: "Básico",

  // Projects section
  projects_title: "PROYECTOS",

  // Project names and descriptions
  pventa_mobile: "PVenta Mobile",
  sic_project: "SIC Web",
  curbo_project: "Curbo",
  sentinels_labs: "SentinelsLabs",
  find_machines: "Find & Supply Solutions",
  the_qr_king: "TheQRKing",

  // Project descriptions
  find_machines_desc:
    "Diseñé y desarrollé un sitio web e-commerce completo en WordPress para Find & Supply Solutions (findmachines.com.do), permitiendo a la empresa vender maquinaria y equipos en línea. Construí tema WordPress personalizado con catálogo de productos avanzado, gestión de inventario y experiencia de checkout fluida.",

  caribbean_coworking: "Caribbean Business Coworking",
  caribbean_coworking_desc:
    "Landing Page con sistema de pago integrado y condicionales webhook para reservas de cupos en espacio de coworking en República Dominicana. Construida con diseño responsivo y pensado para pagos seguros y delimitados.",

  the_qr_king_desc:
    "Plataforma de marketing basada en escaneo de códigos QR en carteles distribuidos en zonas de venta. Ayuda a empresas a rastrear interacción de clientes y optimizar campañas de marketing físico mediante análisis de códigos QR por ubicación.",

  // Location information
  location_us: "Estados Unidos • Passaic, Nueva Jersey",
  location_dr: "República Dominicana, Distrito Nacional",

  // Common words
  at: "en",
  present: "Presente",
};
