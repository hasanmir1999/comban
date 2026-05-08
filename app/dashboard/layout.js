import DashboardHeader from "@/components/dashboardHeader/DashboardHeader";
import ResSideBar from "@/components/resSideBar/ResSideBar";
import SideBar from "@/components/sideBar/SideBar";

export default function DashboardLayout({ children }) {
    return (
        <div>
            <DashboardHeader />
            { children }
            <SideBar />
            <ResSideBar />
        </div>
    );
}
