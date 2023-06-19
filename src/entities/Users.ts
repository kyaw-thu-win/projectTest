import moment from "moment";

export interface User {
  data: any;
  id?: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  creationDate?: Date | string;
  imgUrl?: string;
  roles?: string[];
  imageFile: any;
}

export default interface UserResult {
  count: number;
  result: User[];
}

interface Column {
  key?: "name" | "email" | "isActive" | "creationDate" | "imgUrl" | "roles"; // For Excel Print
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
    key: "email",
    title: "Email",
    header: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    key: "isActive",
    title: "Activate",
    header: "Activate",
    minWidth: 100,
    align: "center",
    formatBol: (value: boolean) => value.toString(),
  },
  {
    key: "creationDate",
    title: "Creation Date",
    header: "Creation Date",
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
  {
    key: "roles",
    title: "Roles",
    header: "Roles",
    minWidth: 100,
    align: "center",
    formatArr: (value: string[]) => value.toString(),
    // formatArr: (value: any) => {
    //   let returnValue = "";
    //   for (let i = 0; i < value.length; i++) returnValue += value[i] + ",";
    //   return returnValue;
    // },
  },

  //   {
  //     id: "population",
  //     label: "Population",
  //     minWidth: 170,
  //     align: "right",
  //       format: (value: number) => value.toLocaleString("en-US"),
  //   }
];
