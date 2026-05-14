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
import { usePathname } from "next/navigation";
import { logout } from "@/utils/logout";
import { decodeJWT } from "@/utils/decodeJWT";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SideBar() {
    const route = usePathname();
    const [allowedRoutes, setAllowedRoutes] = useState([]);

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            const payload = decodeJWT(token);
            if (payload?.user_permissions) {
                // استخراج روت‌های مجاز
                const routes = payload.user_permissions
                    .filter(per => per.startsWith("view_"))
                    .map(per => per.replace("view_", ""));
                setAllowedRoutes(routes);
            }
        }
    }, []);

    // لیست تمام آیتم‌های منو
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

    // فیلتر کردن آیتم‌های منو بر اساس دسترسی
    const visibleMenuItems = menuItems.filter(item => 
        allowedRoutes.includes(item.route)
    );

    return (
        <div className="side-bar hidden lg:flex flex-col fixed top-0 right-0 bg-white h-full w-78 border-l border-gray-300">
            <nav className="mt-30 flex-1">
                <ul className="side-bar-list-item">
                    {visibleMenuItems.map((item) => (
                        <li key={item.route} className="px-5 py-2">
                            <Link
                                href={item.href}
                                className={`item-container ${route === item.href && "bg-emerald-600"} group flex gap-3 justify-between text-gray-800 items-center p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg`}
                            >
                                <div
                                    className={`text group-hover:text-white ${route === item.href && "text-white"} transition-all duration-300`}
                                >
                                    {item.text}
                                </div>
                                <div
                                    className={`icon group-hover:text-white ${route === item.href && "text-white"} transition-all duration-300 size-5`}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="logout-container mb-5">
                <div
                    onClick={logout}
                    className="logout group cursor-pointer flex gap-3 justify-between text-gray-800 items-center mx-5 p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg"
                >
                    <div className="text group-hover:text-white transition-all duration-300">
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
