import jsPDF from "jspdf";
import "jspdf-autotable";

const GenerateReport = (tableColumn, tableRows, title, fileName) => {
  const doc = new jsPDF();

  var img = new Image();
  img.src = "/logo_header.png";

  const date = new Date();
  const dateStr =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  doc.addImage(img, "png", 15, 16, 12, 15);

  doc.setFontSize(14);
  doc.text("FUNDACIÓN HALCONES POR EL DEPORTE", 55, 20);

  doc.setFontSize(12);
  doc.text("Porque el sueño, es triunfar...", 80, 28);

  doc.addImage(img, "png", 185, 16, 12, 15);

  doc.setDrawColor(84, 65, 96);
  doc.setLineWidth(0.5);
  doc.line(15, 35, 195, 35);

  doc.setFontSize(11);
  doc.text("Fecha: " + dateStr, 15, 40);

  doc.setFontSize(14);
  doc.text(title, 80, 55);

  doc.autoTable(tableColumn, tableRows, { startY: 60 });

  doc.save(`${fileName}${dateStr}.pdf`);
};

export default GenerateReport;
