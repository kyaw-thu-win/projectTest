import moment from "moment";

export interface Message {
  id: string;
  title?: string;
  description?: string;
  receiverId?: any;
  creationDate?: Date;
}

export default interface MessageResult {
  count: number;
  result: Message[];
}

interface Column {
  key?: "title" | "description" | "receiverId" | "creationDate"; // For Excel Print
  // id: ; // label: string;
  title?: string; // for PDF Title
  header?: string; // for Excel File
  minWidth?: number;
  align?: "right" | "left" | "center";
  formatSubStr?: (value: string) => string;
  formatDate?: (value: string) => string;
}

export const tableHeader: Column[] = [
  {
    key: "title",
    title: "Subject Title",
    header: "Subject Title",
    minWidth: 100,
    align: "left",
  },
  {
    key: "description",
    title: "Description",
    header: "Description",
    minWidth: 150,
    align: "left",
    formatSubStr: (value: string) => value.substring(0, 50) + " ...",
  },
  {
    key: "receiverId",
    title: "Receiver",
    header: "Receiver",
    minWidth: 150,
    align: "center",
    formatSubStr: (value: string) =>
      value !== "" ? value.substring(0, 50) + " ..." : "",
  },
  {
    key: "creationDate",
    title: "Send Time",
    header: "Send Time",
    minWidth: 150,
    align: "center",
    formatDate: (value: string) => moment(value).format("YYYY-MM-DD"),
  },
];
