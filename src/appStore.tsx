import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface AppStore {
  dopen: boolean;
  token: string;
  userId: string;
  messageCount: number;
  announcementCount: number;
  navSelect: string;
  updateOpen: (dopen: boolean) => void;
  updateNavSelect: (navSelect: string) => void;
  logIn: (data: any) => void;
  logOut: () => void;
  updatemessageCount: (messageCount: number) => void;
  updateannouncementCount: (announcementCount: number) => void;
}

const useAppStore = create(
  persist<AppStore>(
    (set) => ({
      dopen: true,
      token: "",
      userId: "",
      messageCount: 0,
      announcementCount: 0,
      navSelect: "",
      updateOpen: (dopen) => set(() => ({ dopen: dopen })),
      updateNavSelect: (navSelect) => set(() => ({ navSelect: navSelect })),
      logIn: (data) => set(() => ({ token: data.token, userId: data.userId })),
      logOut: () => set(() => ({ token: "", userId: "" })),
      updatemessageCount: (messageCount: any) =>
        set(() => ({ messageCount: messageCount })),
      updateannouncementCount: (announcementCount: any) =>
        set(() => ({ announcementCount: announcementCount })),
    }),
    {
      name: "my_app_store",
    }
  )
);

// const useAppStore = create(
//   persist(
//     (set, get) => ({
//       dopen: true,
//       token: "",
//       userId: "",
//       messageCount: 0,
//       navSelect: "",
//       updateOpen: (dopen: any) => set((state: any) => ({ dopen: dopen })),
//       updateNavSelect: (navSelect: any) =>
//         set((state: any) => ({ navSelect: navSelect })),
//       logIn: (data: any) =>
//         set((state: any) => ({ token: data.token, userId: data.userId })),
//       logOut: () => set(() => ({ token: "", userId: {} })),
//       updatemessageCount: (messageCount: any) =>
//         set((state: any) => ({ messageCount: messageCount })),
//     }),
//     {
//       name: "my_app_store",
//     }
//   )
// );

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Drawer Store", useAppStore);

export default useAppStore;
