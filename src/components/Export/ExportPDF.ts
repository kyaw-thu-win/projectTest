import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
import "jspdf-autotable";
import { applyPlugin } from "jspdf-autotable";
applyPlugin(jsPDF);

interface Props {
  heading: string;
  headerColumn: any;
  data: any;
  fileName: any;
}

export const ExportPDF = ({ heading, headerColumn, data, fileName }: Props) => {
  const doc = new jsPDF("l", "mm", "a4"); // l-landscape, p-potrait

  var width = doc.internal.pageSize.getWidth();
  doc.text(heading, width / 2, 20, { align: "center" });
  //   let content = `Content Text alignment Paragraph Testing. Content Text alignment Paragraph Testing. Content Text alignment Paragraph Testing. `;
  //   doc.text(content, 20, 30, { maxWidth: 170, align: "justify" });
  (doc as any).autoTable({
    // margin: 10,
    margin: { top: 20 },
    tableLineColor: [189, 195, 199],
    tableLineWidth: 0.75,
    bodyStyles: { lineColor: [189, 195, 199] },
    theme: "grid",
    styles: {
      font: "courier",
      fontSize: 12,
      overflow: "linebreak",
      minCellHeight: 8,
      cellPadding: 1,
      halign: "left",
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 30 },
      4: { cellWidth: "auto" },
      // etc
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontSize: 8,
      padding: 0,
    },
    startY: 30,
    columns: headerColumn.map((col: any) => ({ ...col, dataKey: col.key })),
    body: data,
  });
  let finalY = (doc as any).autoTable.previous.finalY;
  doc.text("Text to be shown relative to the table", 12, finalY + 10); //you use the variable and add the number of pixels you want it to move.
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      "Page " + String(i) + " of " + String(pageCount),
      297 - 30,
      210 - 10,
      { align: "center" }
    );
  }

  doc.save(`${fileName}.pdf`);
};

//     const myFont = ... // load the *.ttf font file as binary string
// // add the font to jsPDF
// doc.addFileToVFS("MyFont.ttf", myFont);
// doc.addFont("MyFont.ttf", "MyFont", "normal");
// doc.setFont("MyFont");

//   autoTable(doc, {
//     columns: headerColumn.map((col: any) => ({ ...col, dataKey: col.field })),
//     body: data,
//   });
