import { jsPDF } from "jspdf";
import { loadFontAsBase64 } from "./font_as_base64";
import SatoshiMedium from "../assets/Satoshi-Medium.ttf";
import SatoshiRegular from "../assets/Satoshi-Regular.ttf";
import SatoshiBold from "../assets/Satoshi-Bold.ttf";
import SatoshiItalic from "../assets/Satoshi-Italic.ttf";

const color_blue = [37, 124, 163];
const setColorBlue = (doc: jsPDF) => {
  doc.setTextColor(color_blue[0], color_blue[1], color_blue[2]);
};

// Load fonts
const loadFonts = async (doc: jsPDF) => {
  const fonts = [
    {
      name: "Satoshi-Medium.ttf",
      alias: "Satoshi",
      style: "medium",
      path: SatoshiMedium,
    },
    {
      name: "Satoshi-Regular.ttf",
      alias: "Satoshi",
      style: "regular",
      path: SatoshiRegular,
    },
    {
      name: "Satoshi-Bold.ttf",
      alias: "Satoshi",
      style: "bold",
      path: SatoshiBold,
    },
    {
      name: "Satoshi-Italic.ttf",
      alias: "Satoshi",
      style: "italic",
      path: SatoshiItalic,
    },
  ];

  for (const font of fonts) {
    try {
      const base64 = await loadFontAsBase64(font.path);
      doc.addFileToVFS(font.name, base64);
      doc.addFont(font.name, font.alias, font.style);
    } catch (error) {
      console.error(`Error loading font ${font.name}`, error);
    }
  }
};

type PDFProps = {
  doc: jsPDF;
  x: number;
  y: number;
  title?: string;
};

const genPdfSection = ({ doc, x, y, title }: PDFProps) => {
  doc.setFillColor(color_blue[0], color_blue[1], color_blue[2]);
  setColorBlue(doc);
  doc.rect(x, y, 22, 2, "F");
  doc.setFont("Satoshi", "regular");
  setColorBlue(doc);
  doc.setFontSize(16);
  doc.text(title || "", x + 26, y + 3);
};

type PDFRowProps = {
  description: string;
} & PDFProps;

const genPdfRow = ({ doc, x, y, title, description }: PDFRowProps) => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);
  if (title) doc.text(title, x + 22, y, { align: "right" });
  doc.text(description, x + 26, y, { maxWidth: 160, align: "left" });
};

type PDFBoldRowProps = {
  boldText: string;
} & PDFRowProps;

const genPdfBoldRow = ({
  doc,
  x,
  y,
  title,
  boldText,
  description,
}: PDFBoldRowProps) => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);
  if (title) doc.text(title, x + 22, y, { align: "right" });
  doc.setFont("Satoshi", "bold");
  const boldTextWidth = doc.getTextWidth(boldText) + 2;
  doc.text(`${boldText},`, x + 26, y, { align: "left" });
  doc.setFont("Satoshi", "regular");
  doc.text(description, x + 26 + boldTextWidth, y, {
    maxWidth: 160,
    align: "left",
  });
};

const genPdfBoldRowWithLink = ({
  doc,
  x,
  y,
  title,
  boldText,
  description,
  url,
}: PDFBoldRowProps & { url: string }) => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);
  if (title) doc.text(title, x + 22, y, { align: "right" });
  doc.setFont("Satoshi", "bold");
  const boldTextWidth = doc.getTextWidth(boldText) + 2;
  doc.text(`${boldText},`, x + 26, y, { align: "left" });
  doc.setFont("Satoshi", "regular");
  doc.text(description, x + 26 + boldTextWidth, y, {
    maxWidth: 160,
    align: "left",
  });
  doc.textWithLink(description, x + 26 + boldTextWidth, y, {
    url: url,
    maxWidth: 160,
    align: "left",
  });
};

type PDFWorkExpProps = {
  company: string;
  list: string[];
} & Omit<PDFBoldRowProps, "description">;

const genPdfWorkExp = ({
  doc,
  x,
  y,
  title,
  boldText,
  list,
  company,
}: PDFWorkExpProps) => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);
  if (title) doc.text(title, x + 22, y, { align: "right" });
  doc.setFont("Satoshi", "bold");
  const boldTextWidth = doc.getTextWidth(boldText) + 2;
  doc.text(`${boldText},`, x + 26, y, { align: "left" });
  doc.setFont("Satoshi", "regular");
  doc.text(company, x + 26 + boldTextWidth, y, {
    maxWidth: 70,
    align: "left",
  });

  let currentY = y + 6; // Start position for list items
  list.forEach((item) => {
    doc.setFontSize(6);
    doc.setFont("Satoshi", "bold");
    setColorBlue(doc);
    doc.text("○", x + 28, currentY - 0.7, { align: "right" });
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("Satoshi", "regular");
    const lines = doc.splitTextToSize(item, 160);
    lines.forEach((line: string, index: number) => {
      doc.text("    " + line, x + 26, currentY + index * 5, { align: "left" });
    });

    currentY += lines.length * 5.5; // Adjust spacing between list items
  });
};

export {
  genPdfSection,
  genPdfRow,
  genPdfBoldRow,
  genPdfBoldRowWithLink,
  genPdfWorkExp,
  loadFonts,
  setColorBlue,
};