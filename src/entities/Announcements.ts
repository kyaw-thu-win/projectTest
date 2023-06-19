import moment from "moment";

export interface Announcement {
  id: string;
  title?: string;
  description?: string;
  creationDate?: Date;
  endDate?: Date;
  roles?: string[];
}

export default interface AnnouncementResult {
  count: number;
  result: Announcement[];
}

interface Column {
  key?: "title" | "description" | "creationDate" | "endDate" | "roles"; // For Excel Print
  // id: ; // label: string;
  title?: string; // for PDF Title
  header?: string; // for Excel File
  minWidth?: number;
  align?: "right" | "left" | "center";
  formatSubStr?: (value: string) => string;
  formatDate?: (value: string) => string;
  formatArr?: (value: string[]) => string;
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
    minWidth: 170,
    align: "left",
    formatSubStr: (value: string) => value.substring(0, 50) + " ...",
  },
  {
    key: "creationDate",
    title: "Create Date",
    header: "Create Date",
    minWidth: 100,
    align: "center",
    formatDate: (value: string) => moment(value).format("YYYY-MM-DD"),
  },
  {
    key: "endDate",
    title: "Last Date",
    header: "Last Date",
    minWidth: 100,
    align: "center",
    formatDate: (value: string) => moment(value).format("YYYY-MM-DD"),
  },
  {
    key: "roles",
    title: "Roles",
    header: "Roles",
    minWidth: 100,
    align: "center",
    formatArr: (value: string[]) => value.toString(),
  },
];
