import { create } from "zustand";

interface AuthStore {
  user: string;
  num: number;
  login: (username: string) => void;
  numberInc: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: "",
  num: 0,
  login: (username) => set(() => ({ user: username })),
  numberInc: () => set((store) => ({ num: store.num + 1 })),
  logout: () => set(() => ({ user: "" })),
}));

export default useAuthStore;

// const {user, num, login, numberInc, logout} = useAuthStore()
// <div>Num {num} </div>
// <btn onClick={()=>numberInc()}></btn>

// const {num} = useAuthStore();
// <div>Number {num} </div>

// For Prevent Re Runder
// const num = useAuthStore(s=>s.num);
