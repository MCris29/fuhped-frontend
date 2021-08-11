import jsPDF from "jspdf";
import "jspdf-autotable";

const GenerateReport = (tableColumn, tableRows, title, fileName) => {
  const doc = new jsPDF();

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.text(title, 14, 15);

  doc.save(`${fileName}${dateStr}.pdf`);
};

export default GenerateReport;
