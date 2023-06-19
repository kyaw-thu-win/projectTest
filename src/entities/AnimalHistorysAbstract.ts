import moment from "moment";

export interface AnimalHistory {
  id: string;
  returnDate?: Date;
  reason?: string;
  animalId: any;
  ownerId: any;
}

export default interface AnimalHistoryResult {
  count: number;
  result: AnimalHistory[];
}

interface Column {
  key?: "userId" | "animalId" | "returnDate" | "reason"; // For Excel Print
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
    key: "userId",
    title: "User Name",
    header: "User Name",
    minWidth: 100,
    align: "left",
  },
  {
    key: "animalId",
    title: "Animal Name",
    header: "Animal Name",
    minWidth: 170,
    align: "center",
    // formatDate: (value: string) => moment(value).format("YYYY-MM-DD"),
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
];
