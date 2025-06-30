import { jsPDF } from "jspdf";
import { loadFontAsBase64 } from "./font_as_base64";
import SatoshiMedium from "../assets/Satoshi-Medium.ttf";
import SatoshiRegular from "../assets/Satoshi-Regular.ttf";
import SatoshiBold from "../assets/Satoshi-Bold.ttf";
import SatoshiItalic from "../assets/Satoshi-Italic.ttf";

const color_blue = [37, 124, 163];

// Spacing constants for easier adjustment
export const PDF_SPACING = {
  SECTION_HEADER: 10, // Space after section headers
  ROW_SPACING: 2, // Space after regular rows
  BOLD_ROW_SPACING: 0, // Space after bold rows
  BOLD_ROW_TIGHT: 0.5, // Space for grouped rows (certifications)
  WORK_EXP_SPACING: 2, // Space after work experience blocks
  INTRO_TO_FIRST: 2, // Space from intro to first section
  LINE_HEIGHT: 5, // Height between text lines
  LIST_ITEM_SPACING: 5.5, // Space between list items
};
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

const genPdfSection = ({ doc, x, y, title }: PDFProps): number => {
  doc.setFillColor(color_blue[0], color_blue[1], color_blue[2]);
  setColorBlue(doc);
  doc.rect(x, y, 22, 2, "F");
  doc.setFont("Satoshi", "regular");
  setColorBlue(doc);
  doc.setFontSize(16);
  doc.text(title || "", x + 26, y + 3);
  return y + PDF_SPACING.SECTION_HEADER; // Return next Y position with section spacing
};

type PDFRowProps = {
  description: string;
} & PDFProps;

const genPdfRow = ({ doc, x, y, title, description }: PDFRowProps): number => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);
  if (title) doc.text(title, x + 22, y, { align: "right" });

  const lines = doc.splitTextToSize(description, 160);
  lines.forEach((line: string, index: number) => {
    doc.text(line, x + 26, y + index * PDF_SPACING.LINE_HEIGHT, {
      align: "left",
    });
  });

  return y + lines.length * PDF_SPACING.LINE_HEIGHT + PDF_SPACING.ROW_SPACING; // Return next Y position with content height + spacing
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
}: PDFBoldRowProps): number => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);
  if (title) doc.text(title, x + 22, y, { align: "right" });
  doc.setFont("Satoshi", "bold");
  const boldTextWidth = doc.getTextWidth(boldText) + 2;
  doc.text(`${boldText},`, x + 26, y, { align: "left" });
  doc.setFont("Satoshi", "regular");

  const lines = doc.splitTextToSize(description, 160 - boldTextWidth);
  lines.forEach((line: string, index: number) => {
    doc.text(
      line,
      x + 26 + boldTextWidth,
      y + index * PDF_SPACING.LINE_HEIGHT,
      { align: "left" }
    );
  });

  return (
    y +
    Math.max(1, lines.length) * PDF_SPACING.LINE_HEIGHT +
    PDF_SPACING.BOLD_ROW_SPACING
  ); // Return next Y position with content height + spacing
};

const genPdfBoldRowWithLink = ({
  doc,
  x,
  y,
  title,
  boldText,
  description,
  url,
  tight = false,
}: PDFBoldRowProps & { url: string; tight?: boolean }): number => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);
  if (title) doc.text(title, x + 22, y, { align: "right" });
  doc.setFont("Satoshi", "bold");
  const boldTextToDisplay = description ? `${boldText},` : boldText;
  const boldTextWidth = doc.getTextWidth(boldTextToDisplay) + 2;
  doc.text(boldTextToDisplay, x + 26, y, { align: "left" });
  doc.setFont("Satoshi", "regular");

  const lines = description
    ? doc.splitTextToSize(description, 160 - boldTextWidth)
    : [];
  lines.forEach((line: string, index: number) => {
    doc.text(
      line,
      x + 26 + boldTextWidth,
      y + index * PDF_SPACING.LINE_HEIGHT,
      { align: "left" }
    );
  });

  if (description && url) {
    doc.textWithLink(description, x + 26 + boldTextWidth, y, {
      url: url,
      maxWidth: 160 - boldTextWidth,
      align: "left",
    });
  }

  const spacing = tight
    ? PDF_SPACING.BOLD_ROW_TIGHT
    : PDF_SPACING.BOLD_ROW_SPACING;
  return y + Math.max(1, lines.length) * PDF_SPACING.LINE_HEIGHT + spacing; // Return next Y position with content height + spacing
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
}: PDFWorkExpProps): number => {
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
      doc.text(
        "    " + line,
        x + 26,
        currentY + index * PDF_SPACING.LINE_HEIGHT,
        { align: "left" }
      );
    });

    currentY += lines.length * PDF_SPACING.LIST_ITEM_SPACING; // Adjust spacing between list items
  });

  return currentY + PDF_SPACING.WORK_EXP_SPACING; // Return next Y position after all list items + spacing
};

const genPdfBoldRowsInline = ({
  doc,
  x,
  y,
  items,
}: {
  doc: jsPDF;
  x: number;
  y: number;
  items: Array<{
    title?: string;
    boldText: string;
    description: string;
    url?: string;
  }>;
}): number => {
  doc.setFont("Satoshi", "regular");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setCharSpace(-0.005);

  // Combine all certification titles with their dates into a single flowing paragraph
  const combinedText = items
    .map((item) => {
      const prefix = item.title ? `${item.title} ` : "";
      const suffix = item.description ? `, ${item.description}` : "";
      return `${prefix}${item.boldText}${suffix}`;
    })
    .join(", ");

  doc.setFont("Satoshi", "bold");
  const lines = doc.splitTextToSize(combinedText, 160);
  lines.forEach((line: string, index: number) => {
    doc.text(line, x + 26, y + index * PDF_SPACING.LINE_HEIGHT, {
      align: "left",
    });
  });

  return (
    y + lines.length * PDF_SPACING.LINE_HEIGHT + PDF_SPACING.BOLD_ROW_SPACING
  );
};

export {
  genPdfSection,
  genPdfRow,
  genPdfBoldRow,
  genPdfBoldRowWithLink,
  genPdfBoldRowsInline,
  genPdfWorkExp,
  loadFonts,
  setColorBlue,
};
