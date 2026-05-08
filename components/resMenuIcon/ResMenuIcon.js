"use client";

import useSidebarStore from "@/store/useSideBarStore";
import { faEquals, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ResMenuIcon() {
    const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);
    const sideBarStat = useSidebarStore((s) => s.sideBarStat);

    return (
        <div
            onClick={toggleSidebar}
            className="res-menu-icon size-10 p-2 lg:hidden rounded-lg bg-emerald-600 cursor-pointer flex justify-center items-center text-white text-lg"
        >
            {sideBarStat ? (
                <FontAwesomeIcon icon={faTimes} />
            ) : (
                <FontAwesomeIcon icon={faEquals} />
            )}
        </div>
    );
}
