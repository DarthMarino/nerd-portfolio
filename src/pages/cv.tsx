import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import i18n from "i18next";
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

function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState<string>();

  const leftSide = 14;

  async function createPDF() {
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
      const imgData = await loadImageAsBase64(profile); // Update the path to your image
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
    doc.text(i18n.t("cv_intro"), leftSide, 56, {
      maxWidth: 186,
      align: "justify",
    });

    // Education Section
    genPdfSection({
      doc,
      x: leftSide,
      y: 76,
      title: i18n.t("education_title"),
    });

    genPdfBoldRow({
      doc,
      x: leftSide,
      y: 86,
      title: "2017 - 2021",
      boldText: i18n.t("intec"),
      description: i18n.t("software_eng"),
    });
    genPdfBoldRow({
      doc,
      x: leftSide,
      y: 92,
      title: "2014 - 2017",
      boldText: i18n.t("loyola"),
      description: i18n.t("digital_electronics"),
    });

    // Technical Skills Section
    genPdfSection({
      doc,
      x: leftSide,
      y: 98,
      title: i18n.t("skills_title"),
    });
    genPdfRow({
      doc,
      x: leftSide,
      y: 108,
      title: i18n.t("coding_tools_title"),
      description: technologies.join(", "),
    });

    // Work Experience Section
    genPdfSection({
      doc,
      x: leftSide,
      y: 118,
      title: i18n.t("experience_title"),
    });
    genPdfWorkExp({
      doc,
      x: leftSide,
      y: 128,
      title: i18n.t("tecno_date"),
      boldText: i18n.t("software_eng_title"),
      company: "Tecno-Logica",
      list: [
        i18n.t("tecno_exp_1"),
        i18n.t("tecno_exp_2"),
        i18n.t("tecno_exp_3"),
        i18n.t("tecno_exp_4"),
      ],
    });
    genPdfWorkExp({
      doc,
      x: leftSide,
      y: 175,
      title: i18n.t("curbo_date"),
      boldText: i18n.t("frontend_eng_title"),
      company: "Curbo Tecnologies",
      list: [
        i18n.t("curbo_exp_1"),
        i18n.t("curbo_exp_2"),
        i18n.t("curbo_exp_3"),
      ],
    });

    // Extra Certifications Section
    genPdfSection({
      doc,
      x: leftSide,
      y: 204,
      title: i18n.t("certifications_title"),
    });
    genPdfBoldRowWithLink({
      doc,
      x: leftSide,
      y: 214,
      boldText: certifications[0].title,
      title: format(certifications[0].date, "MMM yyyy"),
      description: certifications[0].description,
      url: `https://${certifications[0].description}`,
    });
    genPdfBoldRowWithLink({
      doc,
      x: leftSide,
      y: 220,
      boldText: certifications[1].title,
      title: format(certifications[1].date, "MMM yyyy"),
      description: certifications[1].description,
      url: `https://${certifications[1].description}`,
    });

    // Languaegs Section
    genPdfSection({
      doc,
      x: leftSide,
      y: 226,
      title: i18n.t("languages"),
    });
    genPdfBoldRow({
      doc,
      x: leftSide,
      y: 236,
      boldText: i18n.t("lang_1"),
      description: i18n.t("lang_1_level"),
    });
    genPdfBoldRow({
      doc,
      x: leftSide,
      y: 242,
      boldText: i18n.t("lang_2"),
      description: i18n.t("lang_2_level"),
    });

    const pdfBlob = doc.output("blob");
    setPdfUrl(URL.createObjectURL(pdfBlob));
  }

  useEffect(() => {
    createPDF();
  }, []);

  return (
    <>
      {pdfUrl ? (
        <div className="fullscreen-container">
          <iframe
            id="pdf-viewer"
            className="fullscreen-iframe"
            src={pdfUrl}
            title="Curriculum"
          ></iframe>
        </div>
      ) : (
        <p>No PDF to display.</p>
      )}
    </>
  );
}

export default PdfViewer;
