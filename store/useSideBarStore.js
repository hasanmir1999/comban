import { create } from "zustand";

const useSidebarStore = create((set) => ({
    sideBarStat: false,
    closeSidebar: () => set((state) => ({ sideBarStat: false })),
    toggleSidebar: () => set((state) => ({ sideBarStat: !state.sideBarStat })),
}));

export default useSidebarStore;
