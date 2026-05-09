"use client";

import FilterOption from "@/components/filterOption/FilterOption";
import InputContainer from "@/components/inputContainer/InputContainer";
import StatisticItem from "@/components/statisticItem/StatisticItem";
import {
    faClipboardCheck,
    faSpinner,
    faTractor,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function StatisticsPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        owner_name: "",
        owner_phone: "",
        combine_model: "",
        serial_number: "",
        manufacture_year: null,
        brand: "",
        engine_number: "",
        chassis_number: "",
    });

    return (
        <div className="statistics-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
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
                            <div className="col w-full sm:w-1/2 lg:w-4/12 px-2">
                                <StatisticItem
                                    title={"تعداد کل کمباین ها"}
                                    count={25}
                                    icon={<FontAwesomeIcon icon={faTractor} />}
                                />
                            </div>
                            <div className="col w-full sm:w-1/2 lg:w-4/12 px-2">
                                <StatisticItem
                                    title={"تعداد کل بازرسی ها"}
                                    count={25}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faClipboardCheck}
                                        />
                                    }
                                />
                            </div>
                            <div className="col w-full sm:w-1/2 lg:w-4/12 px-2">
                                <StatisticItem
                                    title={"تعداد کل کاربران"}
                                    count={25}
                                    icon={<FontAwesomeIcon icon={faUsers} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report-container mt-10">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            گزارش های تحلیلی
                        </h5>
                    </div>
                    <div className="report-filters-and-list-container mt-8">
                        <div className="filter-container">
                            <div className="row flex flex-wrap gap-y-5">
                                <div className="col w-full sm:w-1/2 lg:w-4/12 px-2">
                                    <FilterOption />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
