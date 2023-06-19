import moment from "moment";

export interface AnimalHistory {
  id: string;
  record?: string;
  recordDate?: Date;
  returnDate?: Date;
  reason?: string;
  cost?: number;
  animalId: any;
}

export default interface AnimalHistoryResult {
  count: number;
  result: AnimalHistory[];
}

interface Column {
  key?: "record" | "recordDate" | "returnDate" | "reason" | "cost"; // For Excel Print
  // id: ; // label: string;
  title?: string; // for PDF Title
  header?: string; // for Excel File
  minWidth?: number;
  align?: "right" | "left" | "center";
  formatNum?: (value: number) => string;
  formatBol?: (value: boolean) => string;
  formatArr?: (value: string[]) => string;
  formatDate?: (value: string) => string;
}

export const tableHeader: Column[] = [
  {
    key: "record",
    title: "Record",
    header: "Record",
    minWidth: 100,
    align: "left",
  },
  {
    key: "recordDate",
    title: "Record Date",
    header: "Record Date",
    minWidth: 170,
    align: "center",
    formatDate: (value: string) => moment(value).format("YYYY-MM-DD"),
  },
  {
    key: "returnDate",
    title: "Return Date",
    header: "Return Date",
    minWidth: 100,
    align: "center",
    formatDate: (value: string) => moment(value).format("YYYY-MM-DD"),
  },
  {
    key: "reason",
    title: "Reason",
    header: "Reason",
    minWidth: 170,
    align: "center",
  },
  {
    key: "cost",
    title: "Cost",
    header: "Cost",
    minWidth: 170,
    align: "center",
  },
];
