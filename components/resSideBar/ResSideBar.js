"use client";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWrench,
    faChartLine,
    faUserPlus,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useSidebarStore from "@/store/useSideBarStore";
import ResUserInfoBox from "../resUserInfoBox/ResUserInfoBox";
import { usePathname } from "next/navigation";
import { logout } from "@/utils/logout";
import { decodeJWT } from "@/utils/decodeJWT";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ResSideBar() {
    const route = usePathname();
    const sideBarStat = useSidebarStore((s) => s.sideBarStat);
    const closeSidebar = useSidebarStore((s) => s.closeSidebar);
    const [allowedRoutes, setAllowedRoutes] = useState([]);

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            const payload = decodeJWT(token);
            if (payload?.user_permissions) {

                const routes = payload.user_permissions
                    .filter(per => per.startsWith("view_"))
                    .map(per => per.replace("view_", ""));
                setAllowedRoutes(routes);
            }
        }
    }, []);


    const menuItems = [
        {
            href: "/dashboard/newcombine",
            text: "ثبت کمباین جدید",
            icon: faPlus,
            route: "newcombine"
        },
        {
            href: "/dashboard/inspection",
            text: "بازرسی فنی",
            icon: faWrench,
            route: "inspection"
        },
        {
            href: "/dashboard/statistics",
            text: "گزارش گیری و لیست کمباین ها",
            icon: faChartLine,
            route: "statistics"
        },
        {
            href: "/dashboard/newinspector",
            text: "ثبت ناظر",
            icon: faUserPlus,
            route: "newinspector"
        },
        {
            href: "/dashboard/usersmanagement",
            text: "مدیریت کاربران",
            icon: faUsers,
            route: "usersmanagement"
        }
    ];


    const visibleMenuItems = menuItems.filter(item => 
        allowedRoutes.includes(item.route)
    );

    return (
        <div
            className={`res-side-bar lg:hidden transition-all duration-300 ${sideBarStat ? "translate-x-0" : "translate-x-80"} fixed top-0 right-0 bg-white h-full w-70 border-l border-gray-300 flex flex-col`}
        >
            <div className="res-user-info-box-container sm:hidden mt-25 px-3">
                <ResUserInfoBox />
            </div>
            <nav className="mt-10 sm:mt-30 flex-1 overflow-y-auto">
                <ul className="side-bar-list-item">
                    {visibleMenuItems.map((item) => (
                        <li key={item.route} className="px-3 py-1.5">
                            <Link
                                href={item.href}
                                onClick={closeSidebar}
                                className={`item-container group ${route === item.href && "bg-emerald-600"} flex gap-3 justify-between text-gray-800 items-center p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg`}
                            >
                                <div
                                    className={`text text-sm ${route === item.href && "text-white"} group-hover:text-white transition-all duration-300`}
                                >
                                    {item.text}
                                </div>
                                <div
                                    className={`icon ${route === item.href && "text-white"} group-hover:text-white transition-all duration-300 size-5`}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="logout-container mt-auto">
                <div
                    onClick={logout}
                    className="logout group cursor-pointer flex gap-3 justify-between text-gray-800 items-center px-3 py-2 m-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg"
                >
                    <div className="text text-sm group-hover:text-white transition-all duration-300">
                        خروج
                    </div>
                    <div className="icon group-hover:text-white transition-all duration-300 size-5">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                </div>
            </div>
        </div>
    );
}
