import { create } from "zustand";

const useSidebarStore = create((set) => ({
    sideBarStat: false,
    toggleSidebar: () => set((state) => ({ sideBarStat: !state.sideBarStat })),
}));

export default useSidebarStore;
