import Image from "next/image";
import React from "react";
import UserInfoBox from "../userInfoBox/UserInfoBox";
import ResMenuIcon from "../resMenuIcon/ResMenuIcon";
import Link from "next/link";

export default function DashboardHeader() {
    return (
        <div className="dashboard-header bg-white border border-gray-300 py-2 fixed w-full top-0 right-0 z-10">
            <div className="row flex items-center justify-between px-8">
                <div className="logo-menu flex gap-5 items-center">
                    <ResMenuIcon />
                    <div className="line hidden sm:block lg:hidden w-0.75 h-8 bg-gray-400 rounded-t-lg rounded-b-lg" />
                    <UserInfoBox />
                </div>
                <div className="user-info">
                    <div className="logo-container">
                        <Link href={"/dashboard"}>
                            <Image
                                width={100}
                                height={100}
                                className="w-15 sm:w-20 object-cover"
                                src={"/images/comban2.png"}
                                alt="logo"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
