import {
  createSignal,
  onMount,
  Show,
  createEffect,
  type Component,
} from "solid-js";
import { jsPDF } from "jspdf";
import * as i18n from "@solid-primitives/i18n";
import { type Locale } from "../localizations/resources";
import {
  genPdfBoldRow,
  genPdfBoldRowWithLink,
  genPdfRow,
  genPdfSection,
  genPdfWorkExp,
  loadFonts,
  PDF_SPACING,
} from "../utils/pdf_templates";
import { certifications, technologies } from "../statics/objects";
import { format } from "date-fns";
import { isPhone } from "../utils/detect_phone";

type CVPageProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  locale: Locale;
  isDominican?: boolean;
};

const CVPage: Component<CVPageProps> = (props) => {
  const [pdfUrl, setPdfUrl] = createSignal<string>();
  const [isLoading, setIsLoading] = createSignal(true);
  const [previousLocale, setPreviousLocale] = createSignal<Locale>();
  const [isMobile] = createSignal(isPhone());

  const leftSide = 14;
  const pageHeight = 279; // Letter size height in mm
  const pageWidth = 216; // Letter size width in mm
  const rightMargin = 14;
  const contentWidth = pageWidth - leftSide - rightMargin;

  // Function to check if content fits on current page
  const checkPageBreak = (
    doc: jsPDF,
    currentY: number,
    requiredSpace: number
  ) => {
    if (currentY + requiredSpace > pageHeight - 20) {
      // 20mm bottom margin
      doc.addPage();
      return 25; // Top margin for new page
    }
    return currentY;
  };

  // Fixed layout function for projects only
  const genPdfBoldRowWithLinkFixed = ({
    doc,
    x,
    y,
    title,
    boldText,
    description,
    url,
    tight = false,
  }: any): number => {
    doc.setFont("Satoshi", "regular");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setCharSpace(-0.005);

    // Render the title (date) on the right
    if (title) doc.text(title, x + 22, y, { align: "right" });

    // Fixed width for project titles (based on "TheQRKing Platform" length)
    doc.setFont("Satoshi", "bold");
    const referenceText = "TheQRKing Platform,";
    const fixedTitleWidth = doc.getTextWidth(referenceText) + 2;
    const boldTextToDisplay = description ? `${boldText},` : boldText;

    // Split the project title if it's too long for the fixed width
    const titleLines = doc.splitTextToSize(
      boldTextToDisplay,
      fixedTitleWidth - 2
    );

    // Render the project title with link
    if (url) {
      titleLines.forEach((line: string, index: number) => {
        doc.textWithLink(line, x + 26, y + index * PDF_SPACING.LINE_HEIGHT, {
          url: url,
          align: "left",
        });
      });
    } else {
      titleLines.forEach((line: string, index: number) => {
        doc.text(line, x + 26, y + index * PDF_SPACING.LINE_HEIGHT, {
          align: "left",
        });
      });
    }

    // Calculate where description should start (always at fixed position)
    const descriptionStartX = x + 26 + fixedTitleWidth;
    const titleHeight = titleLines.length * PDF_SPACING.LINE_HEIGHT;

    // Render the description (plain text, no link) starting at fixed position
    doc.setFont("Satoshi", "regular");
    if (description) {
      const availableWidth = 160 - fixedTitleWidth;
      const descriptionLines = doc.splitTextToSize(description, availableWidth);

      descriptionLines.forEach((line: string, index: number) => {
        doc.text(line, descriptionStartX, y + index * PDF_SPACING.LINE_HEIGHT, {
          align: "left",
        });
      });

      // Return the maximum height used by either title or description
      const descriptionHeight =
        descriptionLines.length * PDF_SPACING.LINE_HEIGHT;
      const maxHeight = Math.max(titleHeight, descriptionHeight);
      const spacing = tight
        ? PDF_SPACING.BOLD_ROW_TIGHT
        : PDF_SPACING.BOLD_ROW_SPACING;
      return y + maxHeight + spacing;
    } else {
      // No description, just return with title height
      const spacing = tight
        ? PDF_SPACING.BOLD_ROW_TIGHT
        : PDF_SPACING.BOLD_ROW_SPACING;
      return y + titleHeight + spacing;
    }
  };

  // Fixed genPdfBoldRowWithLink for certifications (link on boldText, not description)
  const genPdfBoldRowWithLinkCerts = ({
    doc,
    x,
    y,
    title,
    boldText,
    description,
    url,
    tight = false,
  }: any): number => {
    doc.setFont("Satoshi", "regular");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setCharSpace(-0.005);

    // Render the title (date) on the right
    if (title) doc.text(title, x + 22, y, { align: "right" });

    // Render the boldText with link (certification name should be clickable)
    doc.setFont("Satoshi", "bold");
    const boldTextToDisplay = description ? `${boldText},` : boldText;
    const boldTextWidth = doc.getTextWidth(boldTextToDisplay) + 2;

    if (url) {
      // Make the boldText (certification name) clickable
      doc.textWithLink(boldTextToDisplay, x + 26, y, {
        url: url,
        align: "left",
      });
    } else {
      // No link, just regular bold text
      doc.text(boldTextToDisplay, x + 26, y, { align: "left" });
    }

    // Render the description (plain text, no link)
    doc.setFont("Satoshi", "regular");
    if (description) {
      const lines = doc.splitTextToSize(description, 160 - boldTextWidth);
      lines.forEach((line: string, index: number) => {
        doc.text(
          line,
          x + 26 + boldTextWidth,
          y + index * PDF_SPACING.LINE_HEIGHT,
          { align: "left" }
        );
      });

      const spacing = tight
        ? PDF_SPACING.BOLD_ROW_TIGHT
        : PDF_SPACING.BOLD_ROW_SPACING;
      return y + Math.max(1, lines.length) * PDF_SPACING.LINE_HEIGHT + spacing;
    } else {
      // No description, just return with spacing
      const spacing = tight
        ? PDF_SPACING.BOLD_ROW_TIGHT
        : PDF_SPACING.BOLD_ROW_SPACING;
      return y + PDF_SPACING.LINE_HEIGHT + spacing;
    }
  };

  const createPDF = async () => {
    try {
      setIsLoading(true);

      // Initialize jsPDF with Letter size
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
      });

      const filename = props.isDominican ? "marino_gomez_cv_rd" : "marino_gomez_cv";
      doc.setProperties({
        title: filename,
        author: "Marino Gomez",
        subject: "Software Engineer CV",
        keywords:
          "Software Engineer, React, TypeScript, Node.js, Full-Stack Developer",
        creator: "Marino Gomez Portfolio",
      });

      // Add custom fonts to jsPDF
      await loadFonts(doc);

      // HEADER SECTION - More compact
      doc.setFont("Satoshi", "medium");
      doc.setFontSize(30); // Smaller from 32
      doc.setCharSpace(-0.5);
      doc.text("Marino Gomez", leftSide, 12 + 6); // Aligned with contactInfo height

      // Add website URL under name
      doc.setFont("Satoshi", "italic");
      doc.setFontSize(8.5);
      doc.setCharSpace(0);
      doc.text("Website:", leftSide, 23, { align: "left" });
      const websiteLabelWidth = doc.getTextWidth("Website:  ");
      doc.textWithLink(
        "www.marinogomez.dev",
        leftSide + websiteLabelWidth,
        23,
        {
          url: "https://www.marinogomez.dev/",
          align: "left",
        }
      );

      // Contact info - more compact
      doc.setCharSpace(0);
      doc.setFont("Satoshi", "italic");
      doc.setFontSize(8.5); // Smaller from 9
      const contactInfo = [
        props.isDominican ? props.t("location_dr") : props.t("location_us"),
        props.isDominican ? "+1 (829) 926-5003" : "+1 (829) 926-5003 • +1 (862) 287-1241",
        "marinogomez24@gmail.com",
      ];

      contactInfo.forEach((info, index) => {
        doc.text(info, pageWidth - rightMargin, 12 + index * 3.2, {
          align: "right",
        }); // Tighter spacing
      });

      // Add clickable GitHub and LinkedIn links
      const linkY = 12 + contactInfo.length * 3.2;

      // GitHub link
      doc.textWithLink(
        "github.com/DarthMarino",
        pageWidth - rightMargin,
        linkY,
        {
          url: "https://github.com/DarthMarino",
          align: "right",
        }
      );

      // LinkedIn link
      doc.textWithLink(
        "linkedin.com/in/maghiworks",
        pageWidth - rightMargin,
        linkY + 3.2,
        {
          url: "https://linkedin.com/in/maghiworks",
          align: "right",
        }
      );

      // PROFESSIONAL SUMMARY - Enhanced with proper spacing
      doc.setFont("Satoshi", "regular");
      doc.setFontSize(11); // Back to standard size like other sections
      doc.setCharSpace(0.07); // Match the spacing from other sections

      // Enhanced summary - authentic and personal
      const enhancedSummary = props.t("cv_intro");
      const introLines = doc.splitTextToSize(enhancedSummary, contentWidth);

      let currentY = 32; // Keep the compact positioning
      introLines.forEach((line: string, index: number) => {
        doc.text(line, leftSide, currentY + index * 4.2, { align: "justify" }); // More generous line spacing like other sections
      });

      currentY += introLines.length * 4.2 + 2; // Better spacing after summary

      // WORK EXPERIENCE SECTION
      currentY = checkPageBreak(doc, currentY, 25); // Reduced more
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("experience_title"),
      });

      // Work experience entries - more compact
      currentY = checkPageBreak(doc, currentY, 18); // Reduced more
      currentY = genPdfWorkExp({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("tecno_date"),
        boldText: props.t("software_eng_title"),
        company: props.t("tecno_company"),
        list: [
          props.t("tecno_exp_1"),
          props.t("tecno_exp_2"),
          props.t("tecno_exp_3"),
          props.t("tecno_exp_4"),
        ],
      });

      currentY = checkPageBreak(doc, currentY, 15); // Reduced more
      currentY = genPdfWorkExp({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("curbo_date"),
        boldText: props.t("frontend_eng_title"),
        company: props.t("curbo_company"),
        list: [
          props.t("curbo_exp_1"),
          props.t("curbo_exp_2"),
          props.t("curbo_exp_3"),
        ],
      });

      // TECHNICAL SKILLS - More compact
      currentY = checkPageBreak(doc, currentY, 18); // Reduced more
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("skills_title"),
      });

      // Categorized skills - with even tighter spacing
      const skillCategories = {
        Frontend:
          "React, TypeScript, JavaScript, TailwindCSS, Three.js, UI/UX Design",
        Backend: "Node.js, GraphQL, RESTful APIs, MongoDB, PostgreSQL, Redis",
        "Cloud & DevOps":
          "AWS, GCP, Azure, Docker, CI/CD, Git, Performance Optimization",
        Other: "React Native, Rust, Jest, Playwright, MCP",
      };

      Object.entries(skillCategories).forEach(([category, skills]) => {
        currentY = checkPageBreak(doc, currentY, 5); // Reduced more
        currentY = genPdfRow({
          doc,
          x: leftSide,
          y: currentY,
          title: category,
          description: skills,
        });
      });

      // EDUCATION SECTION
      currentY = checkPageBreak(doc, currentY, 12); // Reduced more
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("education_title"),
      });

      currentY = genPdfBoldRow({
        doc,
        x: leftSide,
        y: currentY,
        title: "2017 - 2021",
        boldText: props.t("intec"),
        description: props.t("software_eng"),
      });

      currentY = genPdfBoldRow({
        doc,
        x: leftSide,
        y: currentY,
        title: "2014 - 2017",
        boldText: props.t("loyola"),
        description: props.t("digital_electronics"),
      });

      // CERTIFICATIONS SECTION
      currentY = checkPageBreak(doc, currentY, 12); // Reduced more
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("certifications_title"),
      });

      certifications.forEach((cert) => {
        currentY = checkPageBreak(doc, currentY, 4); // Reduced more
        currentY = genPdfBoldRowWithLinkCerts({
          doc,
          x: leftSide,
          y: currentY,
          boldText: cert.title,
          title: format(cert.date, "MMM yyyy"),
          description: cert.description,
          url: `https://${cert.description}`,
          tight: true,
        });
      });

      // LANGUAGES SECTION - Very compact to fit on first page
      currentY = checkPageBreak(doc, currentY, 10); // Reduced more
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("languages"),
      });

      const languages = [
        { lang: props.t("lang_1"), level: props.t("lang_1_level") },
        { lang: props.t("lang_2"), level: props.t("lang_2_level") },
        { lang: props.t("lang_3"), level: props.t("lang_3_level") },
      ];

      languages.forEach(({ lang, level }) => {
        currentY = checkPageBreak(doc, currentY, 4); // Reduced more
        currentY = genPdfBoldRow({
          doc,
          x: leftSide,
          y: currentY,
          boldText: lang,
          description: level,
        });
      });

      // PROJECTS SECTION - Ensure this goes to second page only
      // Force new page regardless of current position
      doc.addPage();
      currentY = 25; // Top margin for new page
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("projects_title"),
      });

      // Find & Supply Solutions project with fixed layout
      currentY = checkPageBreak(doc, currentY, 10);
      currentY = genPdfBoldRowWithLinkFixed({
        doc,
        x: leftSide,
        y: currentY,
        boldText: props.t("find_machines"),
        title: "2025",
        description: props.t("find_machines_desc"),
        url: "https://www.findmachines.com.do/",
        tight: false,
      });
      // TheQRKing project with fixed layout
      currentY = checkPageBreak(doc, currentY + 4, 8);
      currentY = genPdfBoldRowWithLinkFixed({
        doc,
        x: leftSide,
        y: currentY,
        boldText: props.t("the_qr_king"),
        title: "2024",
        description: props.t("the_qr_king_desc"),
        url: "https://www.theqrking.com/",
        tight: false,
      });

      // Caribbean Coworking project with fixed layout
      currentY = checkPageBreak(doc, currentY + 4, 8);
      currentY = genPdfBoldRowWithLinkFixed({
        doc,
        x: leftSide,
        y: currentY,
        boldText: props.t("caribbean_coworking"),
        title: "2024",
        description: props.t("caribbean_coworking_desc"),
        url: "https://coworking.caribbeanbiz.com/",
        tight: false,
      });

      // Add more projects if you have them
      // currentY = checkPageBreak(doc, currentY, 8);
      // currentY = genPdfBoldRowWithLink({
      //   doc,
      //   x: leftSide,
      //   y: currentY,
      //   boldText: "Personal Portfolio",
      //   title: "2023",
      //   description: "Interactive 3D portfolio with Three.js and SolidJS",
      //   url: "https://your-portfolio-url.com",
      //   tight: true,
      // });

      // Generate PDF and create blob URL with filename hint
      const pdfArrayBuffer = doc.output("arraybuffer");
      const blob = new Blob([pdfArrayBuffer], {
        type: "application/pdf",
      });

      // Create object URL
      const url = URL.createObjectURL(blob);
      setPdfUrl(url + `#filename=${filename}.pdf`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating PDF:", error);
      setIsLoading(false);
    }
  };

  onMount(() => {
    setPreviousLocale(props.locale);
    createPDF();
  });

  // Watch for locale changes and regenerate PDF
  createEffect(() => {
    if (previousLocale() !== undefined && previousLocale() !== props.locale) {
      setPreviousLocale(props.locale);
      createPDF();
    }
  });

  return (
    <div class="min-h-screen bg-base-100">
      <Show
        when={!isLoading()}
        fallback={
          <div class="flex justify-center items-center min-h-screen">
            <div class="flex flex-col items-center gap-4">
              <span class="loading loading-spinner loading-lg"></span>
              <p class="text-lg">{props.t("generating_pdf")}</p>
            </div>
          </div>
        }
      >
        <Show
          when={pdfUrl()}
          fallback={
            <div class="flex justify-center items-center min-h-screen">
              <p class="text-lg">{props.t("no_pdf_display")}</p>
            </div>
          }
        >
          <Show
            when={!isMobile()}
            fallback={
              <div class="flex flex-col justify-center items-center min-h-screen gap-4 p-8">
                <div class="text-center">
                  <h2 class="text-2xl font-bold mb-2">PDF Ready</h2>
                  <p class="text-lg mb-4">
                    Mobile browsers don't support PDF viewing. Download the PDF
                    to view it.
                  </p>
                </div>
                <a
                  href={pdfUrl()!}
                  download={`${props.isDominican ? "marino_gomez_cv_rd" : "marino_gomez_cv"}.pdf`}
                  class="btn btn-primary btn-lg"
                >
                  Download CV PDF
                </a>
              </div>
            }
          >
            <div class="w-full h-screen">
              <iframe
                id="pdf-viewer"
                class="w-full h-full border-0"
                src={pdfUrl()!}
                title={props.isDominican ? "marino_gomez_cv_rd" : "marino_gomez_cv"}
              />
            </div>
          </Show>
        </Show>
      </Show>
    </div>
  );
};

export default CVPage;
