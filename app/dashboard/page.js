'use client'
import DashboardHeader from "@/components/dashboardHeader/DashboardHeader";
import ResSideBar from "@/components/resSideBar/ResSideBar";
import SideBar from "@/components/sideBar/SideBar";
import StatisticItem from "@/components/statisticItem/StatisticItem";
import { useStatistics } from "@/hooks/useStatistics";
import { faClipboardCheck, faTractor, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard() {
      const { data: statistics, status: statisticsStatus } = useStatistics();
  
    return (
        <div className="dashboard-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
            <div className="main-content">
                <div className="statistics-container">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            آمار کلی
                        </h5>
                    </div>
                    <div className="statistics-items-container mt-8">
                        <div className="row flex flex-wrap gap-y-5">
                            <div
                                className="col w-full sm:w-1/2 lg:w-4/12 px-2"
                                key="stat-combines"
                            >
                                <StatisticItem
                                    title={"تعداد کل کمباین ها"}
                                    statisticsStatus={statisticsStatus}
                                    count={statistics?.combines}
                                    icon={<FontAwesomeIcon icon={faTractor} />}
                                />
                            </div>
                            <div
                                className="col w-full sm:w-1/2 lg:w-4/12 px-2"
                                key="stat-inspections"
                            >
                                <StatisticItem
                                    title={"تعداد کل بازرسی ها"}
                                    statisticsStatus={statisticsStatus}
                                    count={statistics?.inspections}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faClipboardCheck}
                                        />
                                    }
                                />
                            </div>
                            <div
                                className="col w-full sm:w-1/2 lg:w-4/12 px-2"
                                key="stat-users"
                            >
                                <StatisticItem
                                    title={"تعداد کل کاربران"}
                                    statisticsStatus={statisticsStatus}
                                    count={statistics?.users}
                                    icon={<FontAwesomeIcon icon={faUsers} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
