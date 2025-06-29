import { createSignal, onMount, Show, type Component } from "solid-js";
import { jsPDF } from "jspdf";
import * as i18n from "@solid-primitives/i18n";
import {
  genPdfBoldRow,
  genPdfBoldRowWithLink,
  genPdfRow,
  genPdfSection,
  genPdfWorkExp,
  loadFonts,
} from "../utils/pdf_templates";
import { loadImageAsBase64 } from "../utils/image_as_base64";
import profile from "../assets/profile.jpg";
import { certifications, technologies } from "../statics/objects";
import { format } from "date-fns";

type CVPageProps = {
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
};

const CVPage: Component<CVPageProps> = (props) => {
  const [pdfUrl, setPdfUrl] = createSignal<string>();
  const [isLoading, setIsLoading] = createSignal(true);

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
        title: "Marino Gómez English CV",
        subject: "Subject of the PDF",
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
      doc.text(props.t("cv_intro"), leftSide, 56, {
        maxWidth: 186,
        align: "justify",
      });

      // Work Experience Section
      genPdfSection({
        doc,
        x: leftSide,
        y: 76,
        title: props.t("experience_title"),
      });
      
      genPdfWorkExp({
        doc,
        x: leftSide,
        y: 86,
        title: props.t("tecno_date"),
        boldText: props.t("software_eng_title"),
        company: "Tecno-Logica",
        list: [
          props.t("tecno_exp_1"),
          props.t("tecno_exp_2"),
          props.t("tecno_exp_3"),
          props.t("tecno_exp_4"),
        ],
      });
      
      genPdfWorkExp({
        doc,
        x: leftSide,
        y: 132,
        title: props.t("curbo_date"),
        boldText: props.t("frontend_eng_title"),
        company: "Curbo Tecnologies",
        list: [
          props.t("curbo_exp_1"),
          props.t("curbo_exp_2"),
          props.t("curbo_exp_3"),
        ],
      });

      // Technical Skills Section
      genPdfSection({
        doc,
        x: leftSide,
        y: 162,
        title: props.t("skills_title"),
      });
      
      genPdfRow({
        doc,
        x: leftSide,
        y: 172,
        title: props.t("coding_tools_title"),
        description: technologies.join(", "),
      });

      // Education Section
      genPdfSection({
        doc,
        x: leftSide,
        y: 184,
        title: props.t("education_title"),
      });

      genPdfBoldRow({
        doc,
        x: leftSide,
        y: 194,
        title: "2017 - 2021",
        boldText: props.t("intec"),
        description: props.t("software_eng"),
      });
      
      genPdfBoldRow({
        doc,
        x: leftSide,
        y: 200,
        title: "2014 - 2017",
        boldText: props.t("loyola"),
        description: props.t("digital_electronics"),
      });

      // Extra Certifications Section
      genPdfSection({
        doc,
        x: leftSide,
        y: 208,
        title: props.t("certifications_title"),
      });
      
      genPdfBoldRowWithLink({
        doc,
        x: leftSide,
        y: 218,
        boldText: certifications[0].title,
        title: format(certifications[0].date, "MMM yyyy"),
        description: certifications[0].description,
        url: `https://${certifications[0].description}`,
      });
      
      genPdfBoldRowWithLink({
        doc,
        x: leftSide,
        y: 224,
        boldText: certifications[1].title,
        title: format(certifications[1].date, "MMM yyyy"),
        description: certifications[1].description,
        url: `https://${certifications[1].description}`,
      });

      // Languages Section
      genPdfSection({
        doc,
        x: leftSide,
        y: 232,
        title: props.t("languages"),
      });
      
      genPdfBoldRow({
        doc,
        x: leftSide,
        y: 242,
        boldText: props.t("lang_1"),
        description: props.t("lang_1_level"),
      });
      
      genPdfBoldRow({
        doc,
        x: leftSide,
        y: 248,
        boldText: props.t("lang_2"),
        description: props.t("lang_2_level"),
      });

      const pdfBlob = doc.output("blob");
      setPdfUrl(URL.createObjectURL(pdfBlob));
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating PDF:", error);
      setIsLoading(false);
    }
  };

  onMount(() => {
    createPDF();
  });

  return (
    <div class="min-h-screen bg-base-100">
      <Show 
        when={!isLoading()} 
        fallback={
          <div class="flex justify-center items-center min-h-screen">
            <div class="flex flex-col items-center gap-4">
              <span class="loading loading-spinner loading-lg"></span>
              <p class="text-lg">Generating PDF...</p>
            </div>
          </div>
        }
      >
        <Show 
          when={pdfUrl()} 
          fallback={
            <div class="flex justify-center items-center min-h-screen">
              <p class="text-lg">No PDF to display.</p>
            </div>
          }
        >
          <div class="w-full h-screen">
            <iframe
              id="pdf-viewer"
              class="w-full h-full border-0"
              src={pdfUrl()!}
              title="Curriculum"
            />
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default CVPage;