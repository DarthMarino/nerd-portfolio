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
  event_detector_date: "2025",
  event_detector_company: "Event Detector (Contrato)",
  tinacos_cibao_date: "2026",
  tinacos_cibao_company: "Polímeros del Cibao (Contrato)",

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

  // PVenta Mobile - Aplicación ERP Móvil
  pventa_exp:
    "Aplicación ERP móvil interna diseñada para optimizar ventas, inventario y gestión de clientes para Xoultec. Construida con React Native y Node.js, con escaneo de códigos de barras en tiempo real, seguimiento de stock y operaciones de campo sincronizadas en dispositivos iOS y Android.",

  pventa_problem:
    "El equipo de ventas de Xoultec necesitaba una solución móvil para gestionar inventario, rastrear ventas y manejar relaciones con clientes sobre la marcha. El sistema existente solo de escritorio creaba cuellos de botella, con operaciones de campo requiriendo entrada manual de datos en la oficina, causando retrasos e inconsistencias.",

  pventa_solution:
    "Desarrollé ERP móvil multiplataforma usando React Native e Ionic con backend Node.js. Diseñé interfaz intuitiva en Figma priorizando facilidad de uso para trabajadores de campo. Implementé escaneo de códigos de barras en tiempo real para consultas instantáneas de inventario, arquitectura offline-first para operaciones de campo, y sincronización fluida al restaurar conectividad.",

  pventa_challenges:
    "Arquitecturé sincronización de datos offline-first para manejar conectividad poco confiable en campo. Construí escaneo de códigos de barras en tiempo real con integración de cámara para iOS y Android. Diseñé sistema de resolución de conflictos para actualizaciones concurrentes de inventario desde múltiples usuarios. Optimicé rendimiento móvil para dispositivos de gama baja manteniendo funcionalidad completa.",

  pventa_results:
    "Reduje tiempo de procesamiento en 35% mediante flujos de trabajo móviles optimizados. Logré mejora de más del 50% en adopción de usuarios según encuestas, atribuido a la interfaz cuidadosamente diseñada en Figma. Habilité seguimiento de inventario en tiempo real para más de 20 cuentas de clientes, mejorando significativamente la eficiencia operativa.",

  // SIC System - Plataforma Web ERP y Contabilidad
  sic_exp:
    "Plataforma integral interna web ERP y contabilidad sirviendo a más de 20 clientes diversos en Xoultec. Modernizé sistema contable legacy de Windows Forms a aplicación web pulida usando React, TypeScript y Node.js, con gestión de inventario integrada y dashboard de clientes.",

  sic_problem:
    "Xoultec dependía de un sistema contable legacy construido en Windows Forms que era lento, difícil de mantener y limitado a instalaciones de escritorio. Gestionar inventario para más de 20 clientes requería una solución centralizada y accesible con mejor rendimiento y UX moderna. El sistema antiguo sufría de tiempos de carga lentos y pobre escalabilidad.",

  sic_solution:
    "Migré el sistema contable legacy a stack web moderno usando React, TypeScript y Node.js con backend SQL Server. Construí dashboard web interno con React, Ionic y Tailwind CSS para gestión integral de inventario. Creé control de acceso basado en roles para gestión multi-cliente, dashboards de reportes en tiempo real y flujos de trabajo contables automatizados.",

  sic_challenges:
    "Gestioné migración compleja de datos desde aplicación legacy Windows Forms asegurando cero pérdida de datos. Mantuve compatibilidad retroactiva durante período de transición. Arquitecturé sistema multi-tenant soportando más de 20 clientes con datos aislados y flujos de trabajo personalizables. Optimicé consultas de base de datos e implementé estrategias de caché para grandes conjuntos de datos de inventario.",

  sic_results:
    "Mejoré precisión de inventario en 40% mediante seguimiento y validación automatizados. Reduje tiempos de carga de aplicación en 45% comparado con sistema legacy mediante optimización de rendimiento. Migré exitosamente todos los más de 20 clientes a nueva plataforma sin tiempo de inactividad. Mejoré satisfacción de usuarios con interfaz moderna, responsiva y mejor accesibilidad.",

  curbo_exp:
    "Plataforma marketplace automotriz full-stack B2B y C2C actuando como intermediario entre concesionarios y clientes. Construí ecosistema completo incluyendo dashboard para gestión de inventario de concesionarios, sistema de integración de técnicos para inspecciones vehiculares, marketplace para clientes, y herramientas administrativas de backoffice.",

  curbo_problem:
    "Los concesionarios necesitaban una plataforma digital moderna para gestionar inventario y alcanzar clientes en línea, mientras los compradores carecían de transparencia sobre condiciones de vehículos. El mercado requería un intermediario confiable que facilitara transacciones, coordinara inspecciones profesionales y proporcionara herramientas de gestión integral para dealers.",

  curbo_solution:
    "Desarrollé plataforma multi-lateral con tres componentes clave: (1) Dashboard de Dealers - sistema intuitivo de gestión de inventario permitiendo listar, actualizar y rastrear vehículos con analíticas en tiempo real; (2) Integración de Técnicos - sistema de programación y coordinación conectando técnicos certificados con vehículos para evaluaciones profesionales e informes de condición; (3) Backoffice - panel administrativo completo para gestión de plataforma, verificación de usuarios, supervisión de transacciones y analítica de datos.",

  curbo_challenges:
    "Arquitecturé sistema complejo de control de acceso basado en roles gestionando dealers, técnicos, clientes y administradores. Construí sistema de notificaciones en tiempo real para programación de inspecciones y actualizaciones de estado. Implementé manejo seguro de documentos para reportes vehiculares y certificaciones. Optimicé consultas de base de datos para grandes conjuntos de inventario vehicular manteniendo búsqueda y filtrado rápidos.",

  curbo_results:
    "Lancé exitosamente plataforma sirviendo múltiples concesionarios con miles de listados vehiculares. Logré cobertura de pruebas 90%+ asegurando confiabilidad. Mejoré significativamente rendimiento de carga mediante optimización de base de datos y caché Redis. Creé arquitectura escalable soportando operaciones B2B de dealers y marketplace C2C de clientes simultáneamente.",

  curbo_exp_1:
    "Desarrollé funcionalidades e-commerce con React y Node.js, implementando algoritmos de búsqueda avanzada y filtros que mejoraron participación de usuarios.",
  curbo_exp_2:
    "Implementé suite de automatización con Jest y Playwright, logrando alta cobertura de código y reduciendo significativamente el tiempo de testing QA.",
  curbo_exp_3:
    "Mejoré rendimiento mediante optimización de base de datos, caché Redis y mejoras de API, entregando tiempos de carga más rápidos y mejor SEO.",

  // Event Detector CV entries
  event_detector_exp_1:
    "Construí plataforma full-stack de descubrimiento de eventos con React/Node.js/PostgreSQL permitiendo a miembros de comunidad enviar y explorar eventos locales con imágenes de volantes e integración de calendario.",
  event_detector_exp_2:
    "Implementé dashboard administrativo de moderación con flujo de trabajo aprobar/rechazar y opciones de visualización flexibles incluyendo vistas responsivas de calendario y lista.",
  event_detector_exp_3:
    "Integré API de calendario con funcionalidad de agregar a calendario y presets de notificaciones configurables, mejorando asistencia a eventos mediante recordatorios automatizados.",

  // Tinacos Cibao CV entries
  tinacos_cibao_exp_1:
    "Entregué transformación completa de marca para Polímeros del Cibao incluyendo desarrollo web, rebranding de logo, y etiquetas de producto listas para producción con especificaciones de colores Pantone.",
  tinacos_cibao_exp_2:
    "Construí sistema automatizado de redención de garantías usando Google Forms, Apps Script, e integración API con dashboard seguro de Google Sheets para monitoreo de reclamos en tiempo real.",
  tinacos_cibao_exp_3:
    "Desarrollé generador de PDFs de escritorio capaz de producir miles de certificados de garantía optimizados (7,000+ páginas) en una sola ejecución, eliminando procesamiento manual.",

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
  curbo_project: "Curbo Website",
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

  // Event Detector - Plataforma de Gestión y Envío de Eventos
  event_detector: "Event Detector",
  event_detector_desc:
    "Plataforma de descubrimiento de eventos impulsada por la comunidad permitiendo a usuarios enviar eventos locales con imágenes de volantes, sistema de moderación administrativa, múltiples opciones de vista (calendario/lista), y notificaciones de calendario integradas con funcionalidad de agregar a calendario.",

  event_detector_problem:
    "Las comunidades carecían de una plataforma centralizada para descubrir y compartir eventos locales. Los organizadores de eventos luchaban por alcanzar su audiencia objetivo, mientras los asistentes no tenían forma confiable de encontrar próximos eventos en su área. Las soluciones existentes eran demasiado complejas o no proporcionaban moderación adecuada e integración de calendario.",

  event_detector_solution:
    "Construí plataforma full-stack de gestión de eventos con formularios de envío amigables permitiendo a organizadores subir detalles de eventos e imágenes de volantes. Implementé dashboard administrativo para revisar y moderar envíos con flujo de trabajo aprobar/rechazar. Creé opciones de visualización flexibles incluyendo vistas de calendario y lista, integré API de calendario para funcionalidad fluida de agregar a calendario con presets de notificaciones personalizables.",

  event_detector_challenges:
    "Diseñé sistema eficiente de carga y almacenamiento de imágenes para volantes de eventos con optimización para carga rápida. Arquitecturé flujo de trabajo de moderación asegurando control de calidad mientras mantenía tiempos de aprobación rápidos. Construí interfaz de calendario responsiva soportando múltiples modos de vista. Implementé sistema de notificaciones con tiempos de recordatorio configurables para eventos agregados. Optimicé consultas de base de datos para filtrado rápido de eventos por fecha, categoría y ubicación.",

  event_detector_results:
    "Lancé exitosamente plataforma sirviendo comunidad local con descubrimiento de eventos optimizado. Logré alto engagement de usuarios mediante proceso de envío intuitivo y atractiva visualización de volantes. Habilité flujo de trabajo de aprobación rápida de eventos reduciendo sobrecarga administrativa. Entregué integración de calendario fluida mejorando asistencia a eventos mediante recordatorios automatizados.",

  // Tinacos Cibao - Transformación Completa de Marca y Digital
  tinacos_cibao: "Tinacos Cibao",
  tinacos_cibao_desc:
    "Proyecto completo de transformación digital y rebranding para fabricante de tinacos Polímeros del Cibao. Desarrollé nuevo sitio web, rediseñé logo, creé etiquetas físicas de producto con colores Pantone apropiados, construí sistema automatizado de redención de garantías con integración de Google Apps Script, y generador de PDFs de escritorio para impresión masiva de garantías.",

  tinacos_cibao_problem:
    "Polímeros del Cibao necesitaba una renovación completa de marca y presencia digital para su línea de productos de tinacos Cibao. Carecían de sitio web profesional, tenían branding desactualizado, etiquetas de producto físicas inconsistentes, y un proceso manual de seguimiento de garantías que era ineficiente y propenso a errores. La empresa necesitaba una solución cohesiva abarcando identidad de marca digital y física.",

  tinacos_cibao_solution:
    "Entregué transformación completa de marca y digital: (1) Desarrollo Web - construí sitio web moderno y responsivo mostrando productos e información de la empresa; (2) Rebranding de Logo - diseñé nuevo logo profesional reflejando estándares de calidad de la empresa; (3) Diseño de Etiqueta Física - creé etiquetas de producto con especificaciones apropiadas de colores Pantone y dimensionamiento para manufactura; (4) Sistema Automatizado de Garantías - desarrollé plataforma personalizada de redención de garantías usando Google Forms para usuarios autorizados, automatización Google Apps Script para activar actualizaciones de API, y dashboard seguro de solo lectura en Google Sheets para staff de empresa monitoreando reclamos de garantía en tiempo real; (5) Generador Masivo de PDFs - creé aplicación de escritorio capaz de generar miles de certificados de garantía optimizados (ej., 7,000+ páginas) en una sola ejecución con máxima calidad dentro de los márgenes de tamaño de documento, eliminando procesamiento manual.",

  tinacos_cibao_challenges:
    "Diseñé identidad de marca cohesiva a través de puntos de contacto digitales y físicos manteniendo consistencia. Implementé sistema seguro de garantías con control de acceso apropiado usando verificación de email de empresa. Construí automatización confiable de Google Apps Script para conectar formularios y comunicación API. Aseguré precisión de color Pantone para impresión de etiquetas físicas coincidiendo con guías de marca digitales. Creé infraestructura escalable de seguimiento de garantías manejando envíos concurrentes y sincronización automatizada de datos. Optimicé algoritmo de generación de PDFs para manejar procesamiento masivo de miles de certificados manteniendo alta calidad y tamaños de archivo razonables.",

  tinacos_cibao_results:
    "Lancé exitosamente transformación completa de marca con presencia digital moderna en tinacoscibao.com.do. Entregué etiquetas físicas listas para producción con especificaciones Pantone precisas adoptadas por manufactura. Sistema automatizado de redención de garantías eliminando procesamiento manual y reduciendo significativamente tiempo de procesamiento de reclamos. Proporcioné a staff de empresa dashboard de seguimiento de garantías en tiempo real mejorando tiempos de respuesta de servicio al cliente y precisión de datos. Generador de PDFs de escritorio permitió al staff producir miles de certificados de garantía en minutos con ejecución de un solo clic, reduciendo drásticamente tiempo de preparación de impresión.",

  // Location information
  location_us: "Estados Unidos • Passaic, Nueva Jersey",
  location_dr: "República Dominicana, Distrito Nacional",

  // Common words
  at: "en",
  present: "Presente",
};
