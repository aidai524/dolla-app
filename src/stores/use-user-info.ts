import { create } from "zustand/index";

interface UserInfoState {
  userInfo: any;
  prize: any;
  set: (params: any) => void;
}

const useUserInfoStore = create<UserInfoState>((set) => ({
  userInfo: null,
  prize: {
    points: 0,
    tickets: 0
  },
  set: (params) => set(() => ({ ...params }))
}));

export default useUserInfoStore;
