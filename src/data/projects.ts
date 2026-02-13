// Image imports
import sic1 from "../assets/images/sic-1.png";
import sic2 from "../assets/images/sic-2.png";
import sic3 from "../assets/images/sic-3.png";
import sic4 from "../assets/images/sic-4.png";
import sic5 from "../assets/images/sic-5.png";
import pventa1 from "../assets/images/pventa-1.png";
import pventa2 from "../assets/images/pventa-2.png";
import pventa3 from "../assets/images/pventa-3.png";
import pventa4 from "../assets/images/pventa-4.png";
import curbo1 from "../assets/images/curbo-1.png";
import curbo2 from "../assets/images/curbo-2.jpeg";
import curbo3 from "../assets/images/curbo-3.png";
import curbo4 from "../assets/images/curbo-4.png";
import qrking1 from "../assets/images/the-qr-king-1.png";
import qrking2 from "../assets/images/the-qr-king-2.png";
import qrking3 from "../assets/images/the-qr-king-3.png";
import qrking4 from "../assets/images/the-qr-king-4.png";
import qrking5 from "../assets/images/the-qr-king-5.png";
import qrking6 from "../assets/images/the-qr-king-6.png";
import qrking7 from "../assets/images/the-qr-king-7.png";

export type ProjectCategory = "employment" | "contract" | "personal" | "business";

export type Project = {
  id: string;
  titleKey: string; // i18n key for title
  slug: string; // URL-friendly identifier
  year: number;
  descriptionKey: string; // i18n key for short description
  category: ProjectCategory; // Type of project
  url?: string;
  images: string[];
  technologies: string[];

  // Detailed project page content
  problemKey?: string; // i18n key for problem statement
  solutionKey?: string; // i18n key for solution description
  challengesKey?: string; // i18n key for challenges faced
  resultsKey?: string; // i18n key for results/impact
  role?: string;
  duration?: string;
  company?: string; // Company/organization name
};

export const projects: Project[] = [
  // 2026
  {
    id: "tinacos-cibao",
    titleKey: "tinacos_cibao",
    slug: "tinacos-cibao",
    year: 2026,
    descriptionKey: "tinacos_cibao_desc",
    category: "contract",
    url: "https://www.tinacoscibao.com.do/",
    images: [],
    technologies: ["React", "TypeScript", "Node.js", "Google Apps Script", "Google Sheets API", "Figma", "PDF Generation"],
    role: "Full-Stack Developer & Brand Designer",
    duration: "4 months",
    company: "Polímeros del Cibao",
    problemKey: "tinacos_cibao_problem",
    solutionKey: "tinacos_cibao_solution",
    challengesKey: "tinacos_cibao_challenges",
    resultsKey: "tinacos_cibao_results",
  },
  // 2025
  {
    id: "find-machines",
    titleKey: "find_machines",
    slug: "find-machines",
    year: 2025,
    descriptionKey: "find_machines_desc",
    category: "employment",
    url: "https://www.findmachines.com.do/",
    images: [],
    technologies: ["React", "TypeScript", "TailwindCSS", "Next.js"],
    role: "Full-Stack Developer",
    duration: "3 months",
    company: "Find & Supply Solutions",
  },
  {
    id: "event-detector",
    titleKey: "event_detector",
    slug: "event-detector",
    year: 2025,
    descriptionKey: "event_detector_desc",
    category: "contract",
    url: "https://www.eventdetector.com/",
    images: [],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Calendar API"],
    role: "Full-Stack Developer",
    duration: "3 months",
    problemKey: "event_detector_problem",
    solutionKey: "event_detector_solution",
    challengesKey: "event_detector_challenges",
    resultsKey: "event_detector_results",
  },
  // 2024
  {
    id: "theqrking",
    titleKey: "the_qr_king",
    slug: "theqrking",
    year: 2024,
    descriptionKey: "the_qr_king_desc",
    category: "contract",
    url: "https://www.theqrking.com/",
    images: [qrking1, qrking2, qrking3, qrking4, qrking5, qrking6, qrking7],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    role: "Founder & Lead Developer",
    duration: "6 months",
    problemKey: "theqrking_problem",
    solutionKey: "theqrking_solution",
    challengesKey: "theqrking_challenges",
    resultsKey: "theqrking_results",
  },
  {
    id: "caribbean-coworking",
    titleKey: "caribbean_coworking",
    slug: "caribbean-coworking",
    year: 2024,
    descriptionKey: "caribbean_coworking_desc",
    category: "contract",
    url: "https://coworking.caribbeanbiz.com/",
    images: [],
    technologies: ["React", "TypeScript", "TailwindCSS", "Vite"],
    role: "Frontend Developer",
    duration: "2 months",
    company: "Caribbean Business",
  },
  // 2022
  {
    id: "pventa-mobile",
    titleKey: "pventa_mobile",
    slug: "pventa-mobile",
    year: 2022,
    descriptionKey: "pventa_exp",
    category: "employment",
    url: "https://play.google.com/store/apps/details?id=pventa.mobile",
    images: [pventa1, pventa2, pventa3, pventa4],
    technologies: ["React Native", "TypeScript", "Ionic", "C#", "Node.js"],
    role: "Full Stack Developer",
    duration: "2022 - Present",
    company: "Xoultec",
    problemKey: "pventa_problem",
    solutionKey: "pventa_solution",
    challengesKey: "pventa_challenges",
    resultsKey: "pventa_results",
  },
  {
    id: "sic-system",
    titleKey: "sic_project",
    slug: "sic-system",
    year: 2022,
    descriptionKey: "sic_exp",
    category: "employment",
    images: [sic1, sic2, sic3, sic4, sic5],
    technologies: ["React", "TypeScript", "TailwindCSS", "C#", "SQL Server"],
    role: "Full-Stack Developer",
    duration: "1 year",
    company: "Xoultec",
    problemKey: "sic_problem",
    solutionKey: "sic_solution",
    challengesKey: "sic_challenges",
    resultsKey: "sic_results",
  },
  // 2021
  {
    id: "curbo",
    titleKey: "curbo_project",
    slug: "curbo",
    year: 2021,
    descriptionKey: "curbo_exp",
    category: "employment",
    url: "https://curbo.do/",
    images: [curbo1, curbo2, curbo3, curbo4],
    technologies: ["React", "JavaScript", "Node.js", "MongoDB", "Express"],
    role: "Frontend Engineer",
    duration: "2021 - 2023",
    company: "Curbo Technologies",
    problemKey: "curbo_problem",
    solutionKey: "curbo_solution",
    challengesKey: "curbo_challenges",
    resultsKey: "curbo_results",
  },
];

// Helper functions
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter(p => p.category === category);
};

export const getProjectsByYear = (year: number): Project[] => {
  return projects.filter(p => p.year === year);
};
