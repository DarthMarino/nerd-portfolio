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
      (today.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );

    return `Ingeniero de Software de ${age} años con 4+ años de experiencia en desarrollo full-stack. Especializado en análisis de requerimientos, diseño de sistemas e implementación de aplicaciones web escalables. Sólido historial liderando proyectos desde la concepción hasta el despliegue usando React, TypeScript, Node.js e infraestructura en la nube.`;
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

  // Work experience descriptions
  tecno_exp_1:
    "Desarrollé aplicación móvil ERP con React Native y Node.js, implementando seguimiento de inventario en tiempo real e integración CRM.",
  tecno_exp_2:
    "Construí dashboard responsivo con React, TypeScript y APIs REST, mejorando significativamente los tiempos de carga mediante optimización y code splitting.",
  tecno_exp_3:
    "Migré aplicación legacy .NET Windows Forms a stack web moderno (React/Node.js), reduciendo costos de mantenimiento y mejorando adopción de usuarios.",
  tecno_exp_4:
    "Establecí prácticas DevOps con testing automatizado (Jest/Cypress), pipelines CI/CD (GitHub Actions) y estándares de calidad, optimizando despliegues.",
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
  find_machines: "FindMachines",
  the_qr_king: "TheQRKing",

  // Project descriptions
  the_qr_king_desc: "Plataforma de marketing basada en escaneo de códigos QR de carteles distribuidos en zonas de venta. Ayuda a empresas a rastrear interacción de clientes y optimizar campañas de marketing físico mediante análisis de códigos QR por ubicación.",

  // Common words
  at: "en",
  present: "Presente",
};
