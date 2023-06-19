import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface QueryStore {
  page?: number;
  pageSize?: number;
  searchText?: string;
  roles?: string[];
  receiverList?: string[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchText: (searchText: string) => void;
  setRoles: (roles: string[]) => void;
  setReceiverList: (receiverList: string[]) => void;
}

const useQueryStore = create<QueryStore>((set) => ({
  page: 0,
  pageSize: 10,
  searchText: "",
  roles: [],
  receiverList: [],

  setPage: (page) =>
    set(() => ({
      page: page,
    })),

  setPageSize: (pageSize) =>
    set(() => ({
      pageSize: pageSize,
    })),

  setSearchText: (searchText) =>
    set(() => ({
      searchText: searchText,
    })),
  setRoles: (roles) => set(() => ({ roles: roles })),
  setReceiverList: (receiverList) => set(() => ({ receiverList })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Query Store", useQueryStore);
export default useQueryStore;
