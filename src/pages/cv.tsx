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
import { loadImageAsBase64 } from "../utils/image_as_base64";
import profile from "../assets/profile.jpg";
import { certifications, technologies } from "../statics/objects";
import { format } from "date-fns";
import { isPhone } from "../utils/detect_phone";

type CVPageProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  locale: Locale;
};

const CVPage: Component<CVPageProps> = (props) => {
  const [pdfUrl, setPdfUrl] = createSignal<string>();
  const [isLoading, setIsLoading] = createSignal(true);
  const [previousLocale, setPreviousLocale] = createSignal<Locale>();
  const [isMobile] = createSignal(isPhone());

  const leftSide = 14;

  const createPDF = async () => {
    try {
      setIsLoading(true);

      // Initialize jsPDF with Letter size
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
      });

      doc.setProperties({
        title: "marino_gomez_cv",
        author: "Marino Gomez",
        subject: "Software Engineer CV",
        keywords: "Software Engineer, React, TypeScript, Node.js, Full-Stack Developer",
        creator: "Marino Gomez Portfolio",
      });

      // Add custom fonts to jsPDF
      await loadFonts(doc);

      // Top Left Corner Column
      try {
        const imgData = await loadImageAsBase64(profile);
        doc.addImage(imgData, "JPEG", leftSide, 14, 36, 36);
      } catch (error) {
        console.error("Error loading image", error);
      }

      doc.setFont("Satoshi", "medium");
      doc.setFontSize(34);
      doc.setCharSpace(-0.5);
      doc.text("Marino Gomez", 52, 36);

      // Top Right Corner Column
      doc.setCharSpace(0);
      doc.setFont("Satoshi", "italic");
      doc.setFontSize(10);
      doc.text("United States", 202, 18, { align: "right" });
      doc.text("Passaic, New Jersey", 202, 22, { align: "right" });
      doc.text("+18299265003", 202, 26, { align: "right" });
      doc.text("+186228712411", 202, 30, { align: "right" });
      doc.text("marinogomez24@gmail.com", 202, 34, { align: "right" });
      doc.text("github.com/DarthMarino", 202, 38, { align: "right" });
      doc.text("linkedin.com/in/maghiworks", 202, 42, { align: "right" });

      // Main Description
      doc.setFont("Satoshi", "regular");
      doc.setFontSize(12);
      doc.setCharSpace(0.07);
      const introLines = doc.splitTextToSize(props.t("cv_intro"), 186);
      introLines.forEach((line: string, index: number) => {
        doc.text(line, leftSide, 56 + index * PDF_SPACING.LINE_HEIGHT, {
          align: "justify",
        });
      });

      // Dynamic Y position tracker
      let currentY =
        56 +
        introLines.length * PDF_SPACING.LINE_HEIGHT +
        PDF_SPACING.INTRO_TO_FIRST;

      // Work Experience Section
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("experience_title"),
      });

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

      // Technical Skills Section
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("skills_title"),
      });

      currentY = genPdfRow({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("coding_tools_title"),
        description: technologies.join(", "),
      });

      // Education Section
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

      // Extra Certifications Section
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("certifications_title"),
      });

      currentY = genPdfBoldRowWithLink({
        doc,
        x: leftSide,
        y: currentY,
        boldText: certifications[0].title,
        title: format(certifications[0].date, "MMM yyyy"),
        description: certifications[0].description,
        url: `https://${certifications[0].description}`,
        tight: true,
      });

      currentY = genPdfBoldRowWithLink({
        doc,
        x: leftSide,
        y: currentY,
        boldText: certifications[1].title,
        title: format(certifications[1].date, "MMM yyyy"),
        description: certifications[1].description,
        url: `https://${certifications[1].description}`,
        tight: true,
      });

      // Languages Section
      currentY = genPdfSection({
        doc,
        x: leftSide,
        y: currentY,
        title: props.t("languages"),
      });

      currentY = genPdfBoldRow({
        doc,
        x: leftSide,
        y: currentY,
        boldText: props.t("lang_1"),
        description: props.t("lang_1_level"),
      });

      currentY = genPdfBoldRow({
        doc,
        x: leftSide,
        y: currentY,
        boldText: props.t("lang_2"),
        description: props.t("lang_2_level"),
      });

      currentY = genPdfBoldRow({
        doc,
        x: leftSide,
        y: currentY,
        boldText: props.t("lang_3"),
        description: props.t("lang_3_level"),
      });

      // Generate PDF and create blob URL with filename hint
      const pdfArrayBuffer = doc.output('arraybuffer');
      const blob = new Blob([pdfArrayBuffer], { 
        type: 'application/pdf' 
      });
      
      // Create object URL
      const url = URL.createObjectURL(blob);
      setPdfUrl(url + '#filename=marino_gomez_cv.pdf');
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
    // Only regenerate if locale actually changed and we have a previous PDF
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
                  <p class="text-lg mb-4">Mobile browsers don't support PDF viewing. Download the PDF to view it.</p>
                </div>
                <a
                  href={pdfUrl()!}
                  download="marino_gomez_cv.pdf"
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
                title="marino_gomez_cv"
              />
            </div>
          </Show>
        </Show>
      </Show>
    </div>
  );
};

export default CVPage;
