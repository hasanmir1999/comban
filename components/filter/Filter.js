"use client";

import useSidebarStore from "@/store/useSideBarStore";

export default function Filter() {
    const sideBarStat = useSidebarStore((s) => s.sideBarStat);
    const closeSidebar = useSidebarStore((s) => s.closeSidebar);
    return (
        <div
            onClick={closeSidebar}
            className={`filter lg:hidden transition-all duration-300 ${sideBarStat ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed top-0 right-0 w-full h-full bg-gray-950/30`}
        ></div>
    );
}
