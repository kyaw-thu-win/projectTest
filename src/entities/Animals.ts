import moment from "moment";

export interface Animal {
  id: string;
  name?: string;
  age?: number;
  color?: string;
  dob?: Date;
  imgUrl?: string;
  ownerId: any;
}

export default interface AnimalResult {
  count: number;
  result: Animal[];
}

interface Column {
  key?: "name" | "age" | "color" | "dob" | "imgUrl"; // For Excel Print
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
    key: "name",
    title: "Name",
    header: "Name",
    minWidth: 100,
    align: "left",
  },
  {
    key: "age",
    title: "Age",
    header: "Age",
    minWidth: 170,
    align: "center",
  },
  {
    key: "color",
    title: "Color",
    header: "Color",
    minWidth: 100,
    align: "center",
    // formatBol: (value: boolean) => value.toString(),
  },
  {
    key: "dob",
    title: "Date of Birth",
    header: "Date of Birth",
    minWidth: 170,
    align: "center",
    formatDate: (value: string) => moment(value).format("YYYY-MM-DD"),
  },
  {
    key: "imgUrl",
    title: "Image Url",
    header: "Image Url",
    minWidth: 170,
    align: "center",
  },
];
