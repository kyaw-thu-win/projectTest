import Excel from "exceljs";
import { saveAs } from "file-saver";

interface Props {
  heading: string;
  headerColumn: any;
  data: any;
  fileName: any;
}

export const ExportExcel = async ({
  // heading,
  headerColumn,
  data,
  fileName,
}: Props) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("User List"); // Sheet Name
  worksheet.columns = headerColumn;
  data.forEach((data: any) => {
    worksheet.addRow(data);
  });

  /// Styling =========================
  worksheet.columns.forEach((sheetColumn) => {
    sheetColumn.font = {
      size: 12,
    };
    sheetColumn.width = 30;
  });

  worksheet.getRow(1).font = {
    bold: true,
    size: 13,
  };
  //=========================

  const buffer = await workbook.xlsx.writeBuffer();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const fileExtension = ".xlsx";

  const blob = new Blob([buffer], { type: fileType });

  saveAs(blob, fileName + fileExtension);
};
