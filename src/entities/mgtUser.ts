export interface MgtUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  creationDate?: Date;
  imgUrl?: string;
  roles?: rolesObj;
}

interface rolesObj {
  Admin: number;
  Management: number;
  User: number;
}

export default interface MgtUserResult {
  count: number;
  result: MgtUser[];
}

export const tableHeader = [
  { key: "_id", header: "Id", title: "Id", field: "_id", type: "string" },
  { key: "name", header: "Name", title: "Name", field: "name", type: "string" },
  {
    key: "email",
    header: "Email",
    title: "Email",
    field: "email",
    type: "string",
  },
  {
    key: "password",
    header: "Password",
    title: "Password",
    field: "password",
    type: "string",
  },
  {
    key: "isAdmin",
    header: "Is Admin",
    title: "IsAdmin",
    field: "isAdmin",
    type: "boolean",
  },
  {
    key: "creationDate",
    header: "Create Date",
    title: "Create Date",
    field: "creationDate",
    type: "string",
  },
  {
    key: "imgUrl",
    header: "Image",
    title: "Image",
    field: "imgUrl",
    type: "string",
  },
];
