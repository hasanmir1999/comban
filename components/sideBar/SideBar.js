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

export default function SideBar() {
    const route = usePathname();

    return (
        <div
            className={`side-bar hidden lg:block fixed top-0 right-0 bg-white h-full w-78 border-l border-gray-300`}
        >
            <nav className="mt-30">
                <ul className="side-bar-list-item">
                    <li className="px-5 py-2">
                        <Link
                            href={"/dashboard/newcombine"}
                            className={`item-container ${route === "/dashboard/newcombine" && "bg-emerald-600"} group flex gap-3 justify-between text-gray-800 items-center p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg`}
                        >
                            <div
                                className={`text group-hover:text-white ${route === "/dashboard/newcombine" && "text-white"} transition-all duration-300`}
                            >
                                ثبت کمباین جدید
                            </div>
                            <div
                                className={`icon group-hover:text-white ${route === "/dashboard/newcombine" && "text-white"} transition-all duration-300 size-5`}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </Link>
                    </li>
                    <li className="px-5 py-2">
                        <Link
                            href={"/dashboard/inspection"}
                            className={`item-container ${route === "/dashboard/inspection" && "bg-emerald-600"} group flex gap-3 justify-between text-gray-800 items-center p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg`}
                        >
                            <div
                                className={`text group-hover:text-white ${route === "/dashboard/inspection" && "text-white"} transition-all duration-300`}
                            >
                                بازرسی فنی
                            </div>
                            <div
                                className={`icon group-hover:text-white ${route === "/dashboard/inspection" && "text-white"} transition-all duration-300 size-5`}
                            >
                                <FontAwesomeIcon icon={faWrench} />
                            </div>
                        </Link>
                    </li>
                    <li className="px-5 py-2">
                        <Link
                            href={"/dashboard/statistics"}
                            className={`item-container group ${route === "/dashboard/statistics" && "bg-emerald-600"} flex gap-3 justify-between text-gray-800 items-center p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg`}
                        >
                            <div
                                className={`text ${route === "/dashboard/statistics" && "text-white"} group-hover:text-white transition-all duration-300`}
                            >
                                گزارش گیری و لیست کمباین ها
                            </div>
                            <div
                                className={`icon ${route === "/dashboard/statistics" && "text-white"} group-hover:text-white transition-all duration-300 size-5`}
                            >
                                <FontAwesomeIcon icon={faChartLine} />
                            </div>
                        </Link>
                    </li>
                    <li className="px-5 py-2">
                        <Link
                            href={"/dashboard/newinspector"}
                            className={`item-container ${route === "/dashboard/newinspector" && "bg-emerald-600"} group flex gap-3 justify-between text-gray-800 items-center p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg`}
                        >
                            <div
                                className={`text ${route === "/dashboard/newinspector" && "text-white"} group-hover:text-white transition-all duration-300`}
                            >
                                ثبت ناظر
                            </div>
                            <div
                                className={`icon ${route === "/dashboard/newinspector" && "text-white"} group-hover:text-white transition-all duration-300 size-5`}
                            >
                                <FontAwesomeIcon icon={faUserPlus} />
                            </div>
                        </Link>
                    </li>
                    <li className="px-5 py-2">
                        <Link
                            href={"/dashboard/usersmanagement"}
                            className={`item-container ${route === "/dashboard/usersmanagement" && "bg-emerald-600"} transition-all duration-300 group flex gap-3 justify-between text-gray-800 items-center p-2.5 hover:bg-emerald-600 rounded-lg`}
                        >
                            <div
                                className={`text ${route === "/dashboard/usersmanagement" && "text-white"} group-hover:text-white transition-all duration-300`}
                            >
                                مدیریت کاربران
                            </div>
                            <div
                                className={`icon ${route === "/dashboard/usersmanagement" && "text-white"} group-hover:text-white transition-all duration-300 size-5`}
                            >
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="logout-container mt-70">
                <div onClick={logout} className="logout group cursor-pointer flex gap-3 justify-between text-gray-800 items-center m-5 p-2.5 hover:bg-emerald-600 transition-all duration-300 rounded-lg">
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
